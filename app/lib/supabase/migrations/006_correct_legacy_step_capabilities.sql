begin;

with seven_step_plans as (
  select execution_plan_id
  from public.execution_steps
  group by execution_plan_id
  having count(*) = 7
), canonical_mapping(position, capability_id) as (
  values
    (1, 'company-foundation'),
    (2, 'first-customers'),
    (3, 'first-offer'),
    (4, 'brand-identity'),
    (5, 'public-presence'),
    (6, 'promotional-launch'),
    (7, 'customer-operations')
)
update public.execution_steps as step
set capability_id = mapping.capability_id
from seven_step_plans as plan
join canonical_mapping as mapping on true
where step.execution_plan_id = plan.execution_plan_id
  and step.position = mapping.position
  and step.capability_id is distinct from mapping.capability_id;

commit;
