# Deployment Guide

## Environment Variables

The following environment variables must be set in your hosting environment (e.g. Render, Railway, Fly.io).

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes (for email) | Your Resend API key from resend.com |
| `SESSION_SECRET` | Yes | Random string used to sign sessions |
| `APPLICATION_EMAIL_TO` | No | Admin recipient for new applications. Default: `admissions@andyreidelitesocceracademy.ie` |
| `APPLICATION_EMAIL_FROM` | No | Sender address. Must use a verified Resend domain. Default: `Andy Reid Elite Soccer Academy <no-reply@andyreidelitesocceracademy.ie>` |

## Email Setup (Resend)

1. Log in to [resend.com](https://resend.com) and verify your domain `andyreidelitesocceracademy.ie`.
2. The **From** address must use an address on a domain you have verified in Resend. The default `no-reply@andyreidelitesocceracademy.ie` requires the **root domain** to be verified (not just a subdomain like `send.`).
3. If you see DNS records for `send.andyreidelitesocceracademy.ie` in Resend, those are for tracking/bounce feedback only. The From address must still match a verified sending domain.
4. To override the From address, set `APPLICATION_EMAIL_FROM` to a full RFC 5322 address, e.g.:
   ```
   Andy Reid Elite Soccer Academy <no-reply@andyreidelitesocceracademy.ie>
   ```

## Verifying Email Configuration

After deploying, visit:

```
GET /api/email-health
```

This returns a JSON object showing which env vars are present and what the resolved From/To addresses are. It never exposes secret values.

Example response:
```json
{
  "resend_api_key_present": true,
  "application_email_to_present": false,
  "application_email_from_present": false,
  "resolved_from": "Andy Reid Elite Soccer Academy <no-reply@andyreidelitesocceracademy.ie>",
  "resolved_to": "admissions@andyreidelitesocceracademy.ie"
}
```

## Favicon / Asset Caching

After first deploy, browsers may aggressively cache the favicon. If the favicon appears stale:
- Do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Or append a query string to the favicon URL in `index.html`, e.g. `favicon.ico?v=2`

## Build & Start

```bash
npm install
npm run build
npm start
```

The server runs on `PORT` (default 5000). Make sure your hosting platform routes traffic to that port.
