# OCL Health

OCL Health is a health, pharmacy, chemistry and wellness platform being built for **Okonkwo Chidinma Linda** and her team.

> **Trusted health information. Practical pharmacy services. A platform that can grow into a developer ecosystem.**

## Production

- Main website: https://www.ocl.it.com
- Primary project domain: https://ocl.it.com
- Health blog: https://blogs.ocl.it.com
- Developers: https://developers.ocl.it.com
- Documentation: https://docs.ocl.it.com
- Admin: https://admin.ocl.it.com
- Customer account: https://account.ocl.it.com
- Shop: https://shop.ocl.it.com
- API: https://api.ocl.it.com
- Status: https://status.ocl.it.com
- Support: https://support.ocl.it.com

## Vision

OCL is designed as more than a brochure website. The platform roadmap includes:

- pharmacy and health product catalogue
- current product prices and availability
- product images, descriptions and safety information
- customer accounts
- cart and checkout
- order history and transaction records
- secure team/admin dashboard
- health blog and publishing workflow
- newsletter subscriptions
- SEO and social sharing metadata
- Google AdSense readiness
- developer portal, API documentation, API keys and webhooks
- OCL AI assistant
- health tools and supported device integrations
- support and customer communication
- privacy, terms, refunds, advertising and health disclaimers

## Architecture

The first production implementation uses **Next.js + React + TypeScript** and is deployed through **Vercel**, with **Cloudflare DNS** controlling the domain zone.

The long-term data layer is intended to use **Supabase** for PostgreSQL, authentication, storage and row-level security. Payments and email will be integrated only through approved server-side credentials.

## Subdomains

All initial OCL subdomains are connected to the Vercel project so the platform can grow without moving the domain repeatedly.

Subdomain responsibilities are intentionally separated:

| Host | Responsibility |
|---|---|
| www.ocl.it.com | Public OCL Health website |
| blogs.ocl.it.com | Health publishing platform |
| developers.ocl.it.com | Developer portal |
| docs.ocl.it.com | API and integration documentation |
| admin.ocl.it.com | Protected team administration |
| account.ocl.it.com | Customer account area |
| shop.ocl.it.com | Marketplace |
| api.ocl.it.com | Public API gateway |
| status.ocl.it.com | Service health/status |
| support.ocl.it.com | Customer support |

## Policies and publishing

- Refund, cancellation and returns policy: /legal/refund
- Drug and regulated products policy: /legal/drug-policy
- Kedi Healthcare seller compliance policy: /legal/kedi-seller-policy
- Each published educational article must include a custom cover image, unique metadata, its own Open Graph image, and at least 1,500 words.
- Kedi listings remain unpublished until the seller's current membership/channel permissions, product documentation and approved marketing claims have been checked. Star 2 status is not treated as blanket authorisation for every product or online sales channel.

## Backend setup

1. Create a dedicated Supabase project for OCL Health; do not reuse the unrelated inactive project.
2. Apply `supabase/schema.sql` to that dedicated project's SQL editor after reviewing the schema.
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and the server-only `SUPABASE_SECRET_KEY` to Vercel.
4. Configure Supabase Auth site URL and allowed redirects for `https://account.ocl.it.com/auth/callback` and any approved preview URL.
5. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `OCL_SUPPORT_EMAIL` in Vercel. Keep secrets server-side; never use a `NEXT_PUBLIC_` prefix for secrets.
6. Set unique `OCL_ADMIN_USER` and `OCL_ADMIN_PASSWORD` values. The admin host fails closed until these are set.
7. Enable live checkout only after payment webhooks, inventory, refund workflows, product approvals and seller eligibility have been tested.

The account forms and newsletter route require the Supabase project and schema to be configured before they can create real accounts or store subscriptions. The contact form uses Resend after the sender credentials are configured.

## Security principles

- Never expose service-role, payment or AI provider secrets in browser code.
- Authentication and authorization will be server/database enforced.
- Health and customer data will require strict access controls.
- Product information must not be presented as a diagnosis.
- A fingerprint sensor must **not** be represented as a blood-pressure measurement device.
- Health measurements should come from validated devices, supported integrations or user-entered readings.
- Prescription/regulated product workflows require appropriate professional and regulatory review before transactions are enabled.

## Development

```bash
npm install
npm run dev
npm run build
npm start
```

## Deployment

The GitHub `main` branch is connected to Vercel. Git pushes create new deployments automatically.

## Status

This repository is the active foundation for the OCL platform. The public foundation is being shipped first; database-backed accounts, products, orders, payments, publishing and developer APIs are subsequent implementation phases.

Built with care for OCL Health.
