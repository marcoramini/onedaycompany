begin;

-- =========================================================
-- Profiles
-- =========================================================

create table public.profiles (
  id uuid primary key
    references auth.users(id)
    on delete cascade,

  display_name text,
  avatar_url text,

  created_at timestamptz
    not null
    default now(),

  updated_at timestamptz
    not null
    default now()
);

comment on table public.profiles is
  'Application profile associated with a Supabase Auth user.';


-- =========================================================
-- Companies
-- =========================================================

create table public.companies (
  id uuid primary key
    default gen_random_uuid(),

  owner_id uuid
    not null
    references public.profiles(id)
    on delete cascade,

  name text not null,
  slug text not null,
  tagline text not null,
  mission text not null,
  problem text not null,
  solution text not null,

  ideal_customers jsonb
    not null
    default '[]'::jsonb,

  why_now text not null,
  future_expansion text not null,

  startup_cost text not null,

  source_context text not null,

  status text
    not null
    default 'foundation',

  active_stage text
    not null
    default 'company-foundation',

  created_at timestamptz
    not null
    default now(),

  updated_at timestamptz
    not null
    default now(),

  constraint companies_owner_slug_unique
    unique (owner_id, slug),

  constraint companies_ideal_customers_array
    check (
      jsonb_typeof(ideal_customers) = 'array'
    ),

  constraint companies_startup_cost_check
    check (
      startup_cost in (
        'very-low',
        'low',
        'moderate'
      )
    ),

  constraint companies_status_check
    check (
      status in (
        'foundation',
        'launching',
        'active',
        'paused'
      )
    )
);

comment on table public.companies is
  'Persistent OneDayCompany business workspaces owned by users.';


-- =========================================================
-- Offers
-- =========================================================

create table public.offers (
  id uuid primary key
    default gen_random_uuid(),

  company_id uuid
    not null
    references public.companies(id)
    on delete cascade,

  name text not null,
  description text not null,
  outcome text not null,

  status text
    not null
    default 'draft',

  created_at timestamptz
    not null
    default now(),

  updated_at timestamptz
    not null
    default now(),

  constraint offers_status_check
    check (
      status in (
        'draft',
        'ready',
        'published',
        'archived'
      )
    )
);

comment on table public.offers is
  'Customer-facing offers belonging to a company.';


-- =========================================================
-- Updated-at helper
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger companies_set_updated_at
before update on public.companies
for each row
execute function public.set_updated_at();

create trigger offers_set_updated_at
before update on public.offers
for each row
execute function public.set_updated_at();


-- =========================================================
-- Automatically create an application profile
-- =========================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    display_name,
    avatar_url
  )
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture'
    )
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();


-- =========================================================
-- Row Level Security
-- =========================================================

alter table public.profiles
enable row level security;

alter table public.companies
enable row level security;

alter table public.offers
enable row level security;


-- Profiles

create policy "Users can view their profile"
on public.profiles
for select
to authenticated
using (
  (select auth.uid()) = id
);

create policy "Users can update their profile"
on public.profiles
for update
to authenticated
using (
  (select auth.uid()) = id
)
with check (
  (select auth.uid()) = id
);


-- Companies

create policy "Users can view their companies"
on public.companies
for select
to authenticated
using (
  (select auth.uid()) = owner_id
);

create policy "Users can create their companies"
on public.companies
for insert
to authenticated
with check (
  (select auth.uid()) = owner_id
);

create policy "Users can update their companies"
on public.companies
for update
to authenticated
using (
  (select auth.uid()) = owner_id
)
with check (
  (select auth.uid()) = owner_id
);

create policy "Users can delete their companies"
on public.companies
for delete
to authenticated
using (
  (select auth.uid()) = owner_id
);


-- Offers

create policy "Users can view offers for their companies"
on public.offers
for select
to authenticated
using (
  exists (
    select 1
    from public.companies
    where companies.id = offers.company_id
      and companies.owner_id =
        (select auth.uid())
  )
);

create policy "Users can create offers for their companies"
on public.offers
for insert
to authenticated
with check (
  exists (
    select 1
    from public.companies
    where companies.id = offers.company_id
      and companies.owner_id =
        (select auth.uid())
  )
);

create policy "Users can update offers for their companies"
on public.offers
for update
to authenticated
using (
  exists (
    select 1
    from public.companies
    where companies.id = offers.company_id
      and companies.owner_id =
        (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.companies
    where companies.id = offers.company_id
      and companies.owner_id =
        (select auth.uid())
  )
);

create policy "Users can delete offers for their companies"
on public.offers
for delete
to authenticated
using (
  exists (
    select 1
    from public.companies
    where companies.id = offers.company_id
      and companies.owner_id =
        (select auth.uid())
  )
);


-- =========================================================
-- Supporting indexes
-- =========================================================

create index companies_owner_id_index
on public.companies(owner_id);

create index companies_status_index
on public.companies(status);

create index offers_company_id_index
on public.offers(company_id);

commit;