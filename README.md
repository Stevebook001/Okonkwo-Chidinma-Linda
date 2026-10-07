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
