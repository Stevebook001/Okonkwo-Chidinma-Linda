-- OCL Health initial database schema
-- Apply only to a dedicated OCL Supabase project after reviewing this migration.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer','seller','editor','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  description text not null,
  image_url text,
  price_minor bigint check (price_minor is null or price_minor >= 0),
  currency text not null default 'NGN' check (currency = 'NGN'),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  status text not null default 'draft' check (status in ('draft','pending_review','active','paused','recalled')),
  manufacturer text,
  nafdac_registration text,
  is_regulated boolean not null default false,
  prescription_required boolean not null default false,
  kedi_product boolean not null default false,
  seller_authorisation_reference text,
  approval_evidence_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  body_markdown text not null,
  cover_image_url text not null,
  category text not null,
  status text not null default 'draft' check (status in ('draft','pending_review','published','archived')),
  author_id uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  status text not null default 'pending_payment' check (status in ('pending_payment','paid','processing','shipped','delivered','cancelled','refund_requested','refunded')),
  currency text not null default 'NGN' check (currency = 'NGN'),
  subtotal_minor bigint not null check (subtotal_minor >= 0),
  delivery_minor bigint not null default 0 check (delivery_minor >= 0),
  total_minor bigint not null check (total_minor >= 0),
  payment_provider text,
  payment_reference text unique,
  shipping_address jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name_snapshot text not null,
  quantity integer not null check (quantity > 0),
  unit_price_minor bigint not null check (unit_price_minor >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.refund_requests (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete restrict,
  reason text not null,
  details text,
  status text not null default 'submitted' check (status in ('submitted','under_review','approved','rejected','completed')),
  resolution_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'pending' check (status in ('pending','active','unsubscribed')),
  confirmation_token uuid,
  consented_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.posts enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.refund_requests enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.audit_logs enable row level security;

create policy "Profiles are visible to their owner" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "Profiles can be inserted by their owner" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy "Profiles can be updated by their owner" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "Active products are publicly readable" on public.products for select to anon, authenticated using (status = 'active');
create policy "Admins can manage products" on public.products for all to authenticated using ((auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((auth.jwt()->'app_metadata'->>'role') = 'admin');

create policy "Published posts are publicly readable" on public.posts for select to anon, authenticated using (status = 'published');
create policy "Editors and admins can manage posts" on public.posts for all to authenticated using ((auth.jwt()->'app_metadata'->>'role') in ('editor','admin')) with check ((auth.jwt()->'app_metadata'->>'role') in ('editor','admin'));

create policy "Customers can view their own orders" on public.orders for select to authenticated using ((select auth.uid()) = user_id);
create policy "Customers can create orders for themselves" on public.orders for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Admins can manage orders" on public.orders for all to authenticated using ((auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((auth.jwt()->'app_metadata'->>'role') = 'admin');

create policy "Customers can view their own order items" on public.order_items for select to authenticated using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid())));
create policy "Admins can manage order items" on public.order_items for all to authenticated using ((auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((auth.jwt()->'app_metadata'->>'role') = 'admin');

create policy "Customers can view their own refunds" on public.refund_requests for select to authenticated using ((select auth.uid()) = user_id);
create policy "Customers can submit their own refunds" on public.refund_requests for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Admins can manage refunds" on public.refund_requests for all to authenticated using ((auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((auth.jwt()->'app_metadata'->>'role') = 'admin');

-- Newsletter writes must be submitted through a server route with rate limiting and consent capture.
create policy "Admins can view newsletter subscriptions" on public.newsletter_subscribers for select to authenticated using ((auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "Admins can view audit logs" on public.audit_logs for select to authenticated using ((auth.jwt()->'app_metadata'->>'role') = 'admin');


-- Do not let a customer promote their own profile by editing a public profile row.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if coalesce(auth.jwt()->'app_metadata'->>'role', '') <> 'admin' then
    if tg_op = 'INSERT' then
      new.role := 'customer';
    else
      new.role := old.role;
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists protect_profile_role_trigger on public.profiles;
create trigger protect_profile_role_trigger
before insert or update on public.profiles
for each row execute function public.protect_profile_role();
