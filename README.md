# Wild West Hardscapes LLC — Website

Website for **Wild West Hardscapes LLC**, a hardscaping and outdoor living contractor in Reno / Northern Nevada (NV Lic. #0096054). Built by Nexora Digital.

Full-stack **Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript**. The estimate form posts to a Next.js API route that emails the request through **Gmail SMTP** (Nodemailer).

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the Gmail values
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` runs the production build.

## Gmail SMTP setup (contact form)

1. On the Gmail account that will send the emails, turn on **2-Step Verification**.
2. Create an **App Password** at <https://myaccount.google.com/apppasswords> (Gmail will not accept the normal account password over SMTP).
3. Put the values in `.env.local` (locally) and in **Vercel → Project → Settings → Environment Variables** (production):

| Variable | Required | What it does |
| --- | --- | --- |
| `GMAIL_USER` | yes | Gmail address that sends the emails |
| `GMAIL_APP_PASSWORD` | yes | The 16-character App Password (spaces are fine) |
| `CONTACT_TO` | no | Where estimate requests are delivered (comma-separated). Defaults to `GMAIL_USER` |
| `SEND_CONFIRMATION` | no | `true` (default) emails the customer a "we got your request" note when they give an email |
| `NEXT_PUBLIC_SITE_URL` | no | Public URL, used for social share image links |

What happens on submit:
- The owner gets a branded email with every field; **Reply** goes straight to the customer's email.
- The customer gets a short confirmation (if they entered an email and `SEND_CONFIRMATION` isn't `false`).
- The server re-validates everything, ignores bots that fill the hidden honeypot field, and rate-limits each IP to 5 requests per 10 minutes.
- If the Gmail variables aren't set yet, the form falls back to the old behavior: a pre-filled text message to 775-229-2991.

## Project layout

```
app/
  layout.tsx            fonts (Rye, Oswald, Barlow via next/font), SEO metadata, JSON-LD
  page.tsx              page composition
  globals.css           Tailwind theme: brand colors, fonts, animations, breakpoints
  api/contact/route.ts  POST /api/contact → Gmail SMTP
components/             one file per section + modals, shared state in site-provider.tsx
lib/site-data.ts        services, gallery photos, videos, filters (edit content here)
lib/mailer.ts           Nodemailer transport for smtp.gmail.com:465
public/assets/          images and videos
```

Breakpoints use custom `upto-N:` variants (e.g. `upto-900:`) defined in `globals.css`. They match `@media (max-width: Npx)` exactly, so the layout is identical to the original static site at every width.

## Sections
- Hero with a reel in a phone frame and the fire pit patio photo
- Scrolling services ticker and three promises (Quality / Reliable / Built to Last)
- **Our Story** with the owners' photos
- **Services**: 10 services you can click through. "Get an estimate" ticks that service in the form; 8 have a "Watch the video" button.
- **Winter Specials**: the $13k+ Free Upgrade and the Free Fire Pit Giveaway posters, plus the flyer (opens larger). The buttons pre-fill the form.
- **Recent Work**: 19 photos with filters and a lightbox
- **Reels**: two vertical reels that play in view and unmute on tap, plus social links
- **Project Video Library**: 12 videos with filters, hover preview and a player with sound
- Process steps, service area, license card and FAQ
- **Free Estimate form** → Gmail
- Call / Text / Estimate bar fixed to the bottom of the screen on mobile

## Deploy
Import the repo in Vercel (framework preset **Next.js** is detected automatically), add the environment variables above, and deploy.
