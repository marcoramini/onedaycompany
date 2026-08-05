begin;

alter table public.companies
add column source_proposal_id text;

update public.companies
set source_proposal_id = id::text
where source_proposal_id is null;

alter table public.companies
alter column source_proposal_id set not null;

alter table public.companies
add constraint companies_owner_source_proposal_unique
unique (owner_id, source_proposal_id);

alter table public.offers
add constraint offers_company_unique
unique (company_id);

comment on column public.companies.source_proposal_id is
  'Original application-generated proposal identifier, used to make Company creation idempotent.';

commit;