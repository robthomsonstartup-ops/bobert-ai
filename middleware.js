/**
 * FI access gate — Vercel Edge Middleware
 *
 * Protects /capture, /leads, /account.
 * Gate is INACTIVE when FI_PASSCODE env var is not set.
 *
 * To activate:
 *   1. Set FI_PASSCODE in Vercel project → Settings → Environment Variables
 *   2. Redeploy (env var change triggers a redeploy automatically)
 *
 * To rotate passcode:
 *   Update FI_PASSCODE in Vercel dashboard → redeploy.
 *
 * URL-token flow (for sharing direct links):
 *   /capture?token=YOUR_PASSCODE  →  sets cookie, redirects to /capture
 */

function parseCookies(header) {
  if (!header) return {}
  return Object.fromEntries(
    header.split(';').map(c => {
      const eq = c.indexOf('=')
      if (eq < 0) return [c.trim(), '']
      return [c.slice(0, eq).trim(), decodeURIComponent(c.slice(eq + 1).trim())]
    })
  )
}

export default function middleware(request) {
  const passcode = process.env.FI_PASSCODE
  if (!passcode) return // gate disabled — env var not set

  const url = new URL(request.url)

  // URL-token shortcut: ?token=PASSCODE sets cookie and redirects clean
  const urlToken = url.searchParams.get('token')
  if (urlToken === passcode) {
    url.searchParams.delete('token')
    const res = Response.redirect(url.toString(), 302)
    res.headers.set(
      'Set-Cookie',
      `fi_access=${encodeURIComponent(passcode)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=7776000`
    )
    return res
  }

  // Cookie check
  const cookies = parseCookies(request.headers.get('cookie'))
  if (cookies['fi_access'] === passcode) return // access granted

  // Redirect to gate
  const gate = new URL('/gate', request.url)
  gate.searchParams.set('from', url.pathname)
  return Response.redirect(gate.toString(), 302)
}

export const config = {
  matcher: ['/capture', '/leads', '/account']
}
