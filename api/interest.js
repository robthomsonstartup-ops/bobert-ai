export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, interest, note } = req.body || {};

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const clean = (value, max = 1200) => String(value || '').trim().slice(0, max);
  const payload = {
    name: clean(name, 120),
    email: clean(email, 220),
    company: clean(company, 180),
    interest: clean(interest, 120),
    note: clean(note, 2000)
  };

  const apiKey = process.env.BREVO_API_KEY;
  const notifyEmail = process.env.BOBERT_NOTIFY_EMAIL;
  const fromEmail = process.env.BOBERT_FROM_EMAIL;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Add/update the interested person in the existing Bobert Brevo list.
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: payload.email,
        listIds: [5],
        updateEnabled: true
      })
    });

    if (!contactResponse.ok && contactResponse.status !== 204) {
      const contactData = await contactResponse.json().catch(() => ({}));
      if (contactData.code !== 'duplicate_parameter') {
        console.error('Brevo contact error:', contactData);
      }
    }

    if (!notifyEmail || !fromEmail) {
      console.error('Interest notification email environment variables are not configured.');
      return res.status(503).json({
        error: 'Notification configuration incomplete'
      });
    }

    const esc = (value) => String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#1A1A1A;">
        <h2 style="margin-bottom:6px;">New Bobert platform interest</h2>
        <p style="color:#6B7280;margin-top:0;">Submitted from bobert.ai/overview</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          <tr><td style="padding:8px 0;font-weight:bold;width:120px;">Name</td><td>${esc(payload.name || 'Not provided')}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td>${esc(payload.email)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;">Company</td><td>${esc(payload.company || 'Not provided')}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;">Interested in</td><td>${esc(payload.interest || 'General Bobert platform')}</td></tr>
        </table>
        <div style="margin-top:18px;padding:16px;background:#F0F0F0;border-left:4px solid #DC2626;white-space:pre-wrap;">${esc(payload.note || 'No note provided')}</div>
      </div>`;

    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        sender: { name: 'Bobert Website', email: fromEmail },
        to: [{ email: notifyEmail }],
        replyTo: { email: payload.email, name: payload.name || payload.email },
        subject: `Bobert interest${payload.interest ? ` — ${payload.interest}` : ''}`,
        htmlContent
      })
    });

    if (!emailResponse.ok) {
      const emailData = await emailResponse.json().catch(() => ({}));
      console.error('Brevo notification error:', emailData);
      return res.status(500).json({ error: 'Could not send notification' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Interest form error:', err);
    return res.status(500).json({ error: 'Network error' });
  }
}
