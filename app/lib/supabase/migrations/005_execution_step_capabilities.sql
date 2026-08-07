begin;

alter table public.execution_steps
add column if not exists capability_id text;

update public.execution_steps
set capability_id = case
  when workflow_type in ('offer-builder', 'pricing-builder')
    then 'first-offer'
  when workflow_type in (
    'landing-page-builder',
    'booking-builder',
    'contact-builder',
    'portfolio-builder'
  ) then 'public-presence'
  when workflow_type in (
    'social-launch-builder',
    'outreach-builder'
  ) then 'promotional-launch'
  else 'customer-operations'
end
where capability_id is null;

alter table public.execution_steps
alter column capability_id set not null;

alter table public.execution_steps
add constraint execution_steps_capability_check
check (capability_id in (
  'company-foundation',
  'first-customers',
  'first-offer',
  'brand-identity',
  'public-presence',
  'promotional-launch',
  'customer-operations'
));

create index if not exists execution_steps_capability_index
on public.execution_steps(execution_plan_id, capability_id);

comment on column public.execution_steps.capability_id is
  'Application-defined universal company capability implemented by this step.';

commit;
