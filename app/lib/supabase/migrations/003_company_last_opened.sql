begin;

alter table public.companies
add column if not exists last_opened_at timestamptz;

update public.companies
set last_opened_at = coalesce(
  updated_at,
  created_at,
  now()
)
where last_opened_at is null;

alter table public.companies
alter column last_opened_at
set default now();

alter table public.companies
alter column last_opened_at
set not null;

create index if not exists
companies_owner_last_opened_index
on public.companies (
  owner_id,
  last_opened_at desc
);

comment on column public.companies.last_opened_at is
  'The last time the authenticated owner opened this company workspace.';

commit;