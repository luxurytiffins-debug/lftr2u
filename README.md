# Luxury Tiffins — Vercel Ready

Production-oriented Next.js food ordering application for Luxury Tiffins.

## One-time Vercel setup

1. Push this folder to GitHub.
2. In Vercel, **Add New → Project → Import** the GitHub repository.
3. Framework: **Next.js** (detected automatically).
4. Add these Environment Variables for **Production, Preview and Development**:

```env
DATABASE_URL=your_postgresql_connection_string
AUTH_SECRET=your_long_random_secret
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_strong_admin_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

5. Deploy.

### Automatic database initialization

The Vercel build runs:

```text
prisma generate
prisma db push --accept-data-loss
npm run db:seed
next build
```

This creates/synchronizes the Prisma schema and seeds the initial business data, including:

- Service area **110096 — New Ashok Nagar, Delhi**
- Breakfast/Lunch/Brunch/Dinner/Non-Veg/Extras/Desserts categories
- Initial menu
- Admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- Luxury Tiffins settings

**Important:** `prisma db push --accept-data-loss` is intended here to make first-time Vercel deployment easy. For a mature production operation, switch to versioned Prisma migrations and remove `--accept-data-loss`.

## Business rules

- Free delivery at subtotal **₹109+**
- Delivery **₹15** below ₹109
- Initial serviceable pincode: **110096**
- Lunch: **13:00–15:00 Asia/Kolkata**
- Dinner: **19:00–22:00 Asia/Kolkata**
- Currency: INR

## Razorpay

Never expose `RAZORPAY_KEY_SECRET` to client-side code. Keep it only in Vercel Environment Variables.

Use Razorpay test keys first. After successful testing, replace them with live keys and redeploy.

## Local development

```bash
npm install
cp .env.example .env
# Fill DATABASE_URL and other variables
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Admin

Open `/admin` after logging in with the admin account configured through `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## Important deployment note

A PostgreSQL database is required. Vercel itself is not the PostgreSQL database. Use a hosted PostgreSQL provider such as Neon, Supabase, or another PostgreSQL-compatible provider and put its connection string in `DATABASE_URL`.
