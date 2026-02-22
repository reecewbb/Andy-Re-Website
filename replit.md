# Andy Reid Elite Soccer Academy Website

## Overview
A full-stack premium marketing website for Andy Reid Elite Soccer Academy promoting a Full-Time Transition Year football + education programme in Ireland.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Wouter (routing)
- **Backend**: Express.js + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend (optional, via RESEND_API_KEY env var)
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
- `/` — Home (hero, pillars, stats, testimonials, FAQ preview, contact)
- `/programme` — Programme overview, mission, why choose us
- `/curriculum` — Three pillars detailed (Player, Athletic, Education)
- `/experience` — Premier League & international visits
- `/outcomes` — Stats (boys + combined), pathways, notable alumni
- `/coaches` — Andy Reid (UEFA Pro) + Denis Hyland (UEFA A) + support staff
- `/locations` — TU Blanchardstown + Corduff Sports Centre
- `/testimonials` — Player & parent testimonials
- `/faq` — Comprehensive FAQ with accordions
- `/apply` — Multi-step application form (3 steps)
- `/thank-you` — Application submitted confirmation
- `/privacy`, `/terms`, `/safeguarding`, `/medical`, `/cookies` — Legal pages

## Key Components
- `client/src/components/Nav.tsx` — Fixed responsive navigation with mobile menu
- `client/src/components/Footer.tsx` — Full footer with links and contact info
- `client/src/pages/Apply.tsx` — 3-step multi-step application form with validation

## API Endpoints
- `POST /api/apply` — Handles application submission
  - Rate limiting (5 requests per 15 min per IP)
  - Honeypot anti-spam
  - Optional email sending via Resend
  - Logs all submissions to console

## Environment Variables
| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Optional | Enables email sending via Resend |
| `APPLICATION_EMAIL_TO` | Optional | Admin email to receive applications |
| `APPLICATION_EMAIL_FROM` | Optional | From address for outgoing emails |

## Running
```
npm run dev
```
Starts Express server on port 5000 with Vite frontend bundled together.
