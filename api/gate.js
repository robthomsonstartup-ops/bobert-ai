/**
 * POST /api/gate
 * Verifies FI passcode, sets fi_access cookie, redirects.
 * Used by gate.html form submission.
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  // Parse application/x-www-form-urlencoded body
  const body = await new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', chunk => { raw += chunk })
    req.on('end', () => {
      try { resolve(Object.fromEntries(new URLSearchParams(raw))) }
      catch (e) { resolve({}) }
    })
    req.on('error', reject)
  })

  const { passcode = '', from = '' } = body
  const expected = process.env.FI_PASSCODE || ''

  // Sanitise redirect target — must be a known FI path
  const ALLOWED = ['/capture', '/leads', '/account']
  const redirect = ALLOWED.includes(from) ? from : '/capture'

  if (expected && passcode === expected) {
    res.setHeader('Set-Cookie',
      `fi_access=${encodeURIComponent(expected)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=7776000`
    )
    return res.redirect(302, redirect)
  }

  // Wrong passcode
  return res.redirect(302,
    `/gate?err=1&from=${encodeURIComponent(redirect)}`
  )
}
