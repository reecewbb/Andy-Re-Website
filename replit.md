# Andy Reid Elite Soccer Academy Website

## Overview
A full-stack premium marketing website for Andy Reid Elite Soccer Academy promoting a Full-Time Transition Year football + education programme in Ireland.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Wouter (routing)
- **Backend**: Express.js + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend (optional, via RESEND_API_KEY env var)
- **Google Sheets**: googleapis (optional, via GOOGLE_SERVICE_ACCOUNT_JSON)
- **State**: TanStack React Query

## Design System
- **Primary Red**: #9A0A0A
- **Charcoal**: #111316
- **White/Light Gray**: #E2E2E1
- **Mid Gray**: #B9B2A5
- **Warm Gray**: #655955
- **Heading Font**: Bebas Neue (Google Fonts)
- **Body Font**: Inter

## Pages & Routes
- `/` — Home (hero, pillars, stats, testimonials, FAQ preview, CTA)
- `/programme` — Programme overview, mission, why choose us
- `/curriculum` — Three pillars (Player, Athletic, Education) + Litton Lane education partner
- `/coaches` — Andy Reid (UEFA Pro, 29 caps, Nott'm Forest) + Denis Hyland (UEFA Pro, programme founder, national team coach)
- `/locations` — TU Blanchardstown + Corduff Sports Centre
- `/testimonials` — Player & parent testimonials
- `/faq` — Comprehensive FAQ with accordions
- `/apply` — 2-step application form (Step 1: Player Details + Football Profile, Step 2: Parent + Consent)
- `/thank-you` — Application submitted confirmation with Assessment Day process
- `/privacy`, `/terms`, `/cookies` — Legal pages
- `*` — 404 Not Found

## Key Components
- `client/src/components/Nav.tsx` — Fixed responsive navigation with mobile menu
- `client/src/components/Footer.tsx` — Footer with links and email contact (no phone/socials)
- `client/src/pages/Apply.tsx` — 2-step multi-step application form with Zod validation

## API Endpoints
- `POST /api/apply` — Handles application submission
  - Rate limiting (5 requests per 15 min per IP)
  - Honeypot anti-spam
  - Optional email sending via Resend (admin notification + applicant confirmation)
  - Optional Google Sheets logging
  - Logs all submissions to console

## Environment Variables
| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Optional | Enables email sending via Resend |
| `APPLICATION_EMAIL_TO` | Optional | Admin email to receive applications |
| `APPLICATION_EMAIL_FROM` | Optional | From address for outgoing emails |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Optional | Google service account credentials JSON for Sheets logging |
| `GOOGLE_SHEETS_ID` | Optional | Google Spreadsheet ID for logging applications |
| `GOOGLE_SHEETS_TAB` | Optional | Sheet tab name (default: Sheet1) |

## Security
- All user-supplied data is HTML-escaped before being inserted into email templates (via `escapeHtml()`)
- URL fields are validated to only allow `http://` and `https://` links (via `safeUrl()`)
- Email addresses are stripped of CR/LF characters to prevent header injection
- Rate limiting (5 requests / 15 min per IP) is applied to the `/api/apply` endpoint
- Honeypot anti-spam field silently discards bot submissions

## Contact Email
- `admissions@andyreidelitesocceracademy.ie` (used in Footer, FAQ, Apply, ThankYou, legal pages, server defaults)

## Running
```
npm run dev
```
Starts Express server on port 5000 with Vite frontend bundled together.
