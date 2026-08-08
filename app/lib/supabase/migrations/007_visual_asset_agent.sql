begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('company-visual-assets', 'company-visual-assets', true, 10485760, array['image/svg+xml', 'image/png', 'image/webp', 'image/jpeg'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create table public.visual_directions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  status text not null check (status in ('draft', 'approved', 'superseded')),
  palette jsonb not null,
  typography jsonb not null,
  style_description text not null,
  created_at timestamptz not null default now()
);

create table public.asset_briefs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  requesting_tool text not null,
  purpose text not null,
  placement text not null,
  operation text not null,
  request_payload jsonb not null,
  status text not null check (status in ('pending', 'processing', 'completed', 'failed')),
  created_at timestamptz not null default now()
);

create table public.visual_assets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  brief_id uuid not null references public.asset_briefs(id) on delete restrict,
  visual_direction_id uuid not null references public.visual_directions(id) on delete restrict,
  purpose text not null,
  status text not null check (status in ('draft', 'review-required', 'approved', 'rejected', 'archived')),
  review_required boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.visual_asset_variants (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.visual_assets(id) on delete cascade,
  storage_path text not null unique,
  public_url text not null,
  format text not null check (format in ('svg', 'png', 'webp', 'jpeg')),
  mime_type text not null,
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  alt_text text not null,
  is_selected boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.asset_generations (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.visual_assets(id) on delete cascade,
  variant_id uuid not null references public.visual_asset_variants(id) on delete cascade,
  source text not null check (source in ('composition', 'generated', 'uploaded', 'fallback')),
  provider text,
  provider_generation_id text,
  latency_ms integer not null check (latency_ms >= 0),
  cost_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.visual_directions enable row level security;
alter table public.asset_briefs enable row level security;
alter table public.visual_assets enable row level security;
alter table public.visual_asset_variants enable row level security;
alter table public.asset_generations enable row level security;

create policy "Owners manage visual directions" on public.visual_directions for all to authenticated
using (exists (select 1 from public.companies where companies.id = visual_directions.company_id and companies.owner_id = (select auth.uid())))
with check (exists (select 1 from public.companies where companies.id = visual_directions.company_id and companies.owner_id = (select auth.uid())));

create policy "Owners manage asset briefs" on public.asset_briefs for all to authenticated
using (exists (select 1 from public.companies where companies.id = asset_briefs.company_id and companies.owner_id = (select auth.uid())))
with check (exists (select 1 from public.companies where companies.id = asset_briefs.company_id and companies.owner_id = (select auth.uid())));

create policy "Owners manage visual assets" on public.visual_assets for all to authenticated
using (exists (select 1 from public.companies where companies.id = visual_assets.company_id and companies.owner_id = (select auth.uid())))
with check (exists (select 1 from public.companies where companies.id = visual_assets.company_id and companies.owner_id = (select auth.uid())));

create policy "Owners manage visual asset variants" on public.visual_asset_variants for all to authenticated
using (exists (select 1 from public.visual_assets join public.companies on companies.id = visual_assets.company_id where visual_assets.id = visual_asset_variants.asset_id and companies.owner_id = (select auth.uid())))
with check (exists (select 1 from public.visual_assets join public.companies on companies.id = visual_assets.company_id where visual_assets.id = visual_asset_variants.asset_id and companies.owner_id = (select auth.uid())));

create policy "Owners manage asset generations" on public.asset_generations for all to authenticated
using (exists (select 1 from public.visual_assets join public.companies on companies.id = visual_assets.company_id where visual_assets.id = asset_generations.asset_id and companies.owner_id = (select auth.uid())))
with check (exists (select 1 from public.visual_assets join public.companies on companies.id = visual_assets.company_id where visual_assets.id = asset_generations.asset_id and companies.owner_id = (select auth.uid())));

create policy "Owners upload visual asset files" on storage.objects for insert to authenticated
with check (bucket_id = 'company-visual-assets' and exists (select 1 from public.companies where companies.id::text = (storage.foldername(name))[1] and companies.owner_id = (select auth.uid())));

create policy "Owners update visual asset files" on storage.objects for update to authenticated
using (bucket_id = 'company-visual-assets' and exists (select 1 from public.companies where companies.id::text = (storage.foldername(name))[1] and companies.owner_id = (select auth.uid())));

create index visual_assets_company_purpose_index on public.visual_assets(company_id, purpose);
create index visual_asset_variants_asset_index on public.visual_asset_variants(asset_id);
create index asset_briefs_company_index on public.asset_briefs(company_id);

commit;
