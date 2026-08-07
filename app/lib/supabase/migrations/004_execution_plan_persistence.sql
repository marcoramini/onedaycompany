begin;

create table public.execution_plans (
  id uuid primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  introduction text not null,
  version integer not null default 1 check (version > 0),
  source text not null check (source in ('ai', 'fallback')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, version)
);

create table public.execution_steps (
  id uuid primary key,
  execution_plan_id uuid not null references public.execution_plans(id) on delete cascade,
  capability_id text not null check (capability_id in (
    'company-foundation',
    'first-customers',
    'first-offer',
    'brand-identity',
    'public-presence',
    'promotional-launch',
    'customer-operations'
  )),
  position integer not null check (position > 0),
  title text not null,
  reason text not null,
  expected_outcome text not null,
  workflow_type text not null,
  completion_criteria jsonb not null default '[]'::jsonb,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed', 'skipped')),
  output_ids jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (execution_plan_id, position),
  check (jsonb_typeof(completion_criteria) = 'array'),
  check (jsonb_typeof(output_ids) = 'array')
);

create table public.execution_activities (
  id uuid primary key,
  execution_step_id uuid not null references public.execution_steps(id) on delete cascade,
  position integer not null check (position > 0),
  title text not null,
  description text not null,
  completion_criterion text not null,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed', 'skipped')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (execution_step_id, position)
);

create trigger execution_plans_set_updated_at
before update on public.execution_plans
for each row execute function public.set_updated_at();

create trigger execution_steps_set_updated_at
before update on public.execution_steps
for each row execute function public.set_updated_at();

create trigger execution_activities_set_updated_at
before update on public.execution_activities
for each row execute function public.set_updated_at();

alter table public.execution_plans enable row level security;
alter table public.execution_steps enable row level security;
alter table public.execution_activities enable row level security;

create policy "Users can manage plans for their companies"
on public.execution_plans for all to authenticated
using (exists (
  select 1 from public.companies
  where companies.id = execution_plans.company_id
    and companies.owner_id = (select auth.uid())
))
with check (exists (
  select 1 from public.companies
  where companies.id = execution_plans.company_id
    and companies.owner_id = (select auth.uid())
));

create policy "Users can manage steps for their companies"
on public.execution_steps for all to authenticated
using (exists (
  select 1 from public.execution_plans
  join public.companies on companies.id = execution_plans.company_id
  where execution_plans.id = execution_steps.execution_plan_id
    and companies.owner_id = (select auth.uid())
))
with check (exists (
  select 1 from public.execution_plans
  join public.companies on companies.id = execution_plans.company_id
  where execution_plans.id = execution_steps.execution_plan_id
    and companies.owner_id = (select auth.uid())
));

create policy "Users can manage activities for their companies"
on public.execution_activities for all to authenticated
using (exists (
  select 1 from public.execution_steps
  join public.execution_plans on execution_plans.id = execution_steps.execution_plan_id
  join public.companies on companies.id = execution_plans.company_id
  where execution_steps.id = execution_activities.execution_step_id
    and companies.owner_id = (select auth.uid())
))
with check (exists (
  select 1 from public.execution_steps
  join public.execution_plans on execution_plans.id = execution_steps.execution_plan_id
  join public.companies on companies.id = execution_plans.company_id
  where execution_steps.id = execution_activities.execution_step_id
    and companies.owner_id = (select auth.uid())
));

create index execution_plans_company_index on public.execution_plans(company_id);
create index execution_steps_plan_index on public.execution_steps(execution_plan_id, position);
create index execution_activities_step_index on public.execution_activities(execution_step_id, position);

commit;
