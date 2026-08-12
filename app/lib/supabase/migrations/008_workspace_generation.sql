begin;

create table public.workspace_generations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique references public.companies(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'running', 'completed', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_generation_stages (
  id uuid primary key default gen_random_uuid(),
  generation_id uuid not null references public.workspace_generations(id) on delete cascade,
  stage text not null check (stage in ('foundation', 'first-offer', 'launch-planning', 'workspace-assembly')),
  status text not null default 'pending'
    check (status in ('pending', 'running', 'completed', 'failed')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  source text check (source in ('ai', 'fallback')),
  result jsonb,
  safe_error text,
  started_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (generation_id, stage),
  check (result is null or jsonb_typeof(result) = 'object')
);

create trigger workspace_generations_set_updated_at
before update on public.workspace_generations
for each row execute function public.set_updated_at();

create trigger workspace_generation_stages_set_updated_at
before update on public.workspace_generation_stages
for each row execute function public.set_updated_at();

alter table public.workspace_generations enable row level security;
alter table public.workspace_generation_stages enable row level security;

create policy "Users manage workspace generations for their companies"
on public.workspace_generations for all to authenticated
using (exists (
  select 1 from public.companies
  where companies.id = workspace_generations.company_id
    and companies.owner_id = (select auth.uid())
))
with check (exists (
  select 1 from public.companies
  where companies.id = workspace_generations.company_id
    and companies.owner_id = (select auth.uid())
));

create policy "Users manage workspace generation stages for their companies"
on public.workspace_generation_stages for all to authenticated
using (exists (
  select 1 from public.workspace_generations
  join public.companies on companies.id = workspace_generations.company_id
  where workspace_generations.id = workspace_generation_stages.generation_id
    and companies.owner_id = (select auth.uid())
))
with check (exists (
  select 1 from public.workspace_generations
  join public.companies on companies.id = workspace_generations.company_id
  where workspace_generations.id = workspace_generation_stages.generation_id
    and companies.owner_id = (select auth.uid())
));

create index workspace_generation_stages_generation_index
on public.workspace_generation_stages(generation_id, stage);

comment on table public.workspace_generations is
  'Recoverable orchestration lifecycle for initial workspace generation.';

comment on table public.workspace_generation_stages is
  'Persisted stage progress and validated draft outputs for workspace generation.';

commit;
