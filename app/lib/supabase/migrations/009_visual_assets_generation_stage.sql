begin;

alter table public.workspace_generation_stages
drop constraint workspace_generation_stages_stage_check;

alter table public.workspace_generation_stages
add constraint workspace_generation_stages_stage_check
check (stage in ('foundation', 'first-offer', 'launch-planning', 'workspace-assembly', 'visual-assets'));

insert into public.workspace_generation_stages (generation_id, stage)
select id, 'visual-assets'
from public.workspace_generations
on conflict (generation_id, stage) do nothing;

update public.workspace_generations
set status = 'running'
where status = 'completed'
  and not exists (
    select 1
    from public.workspace_generation_stages
    where workspace_generation_stages.generation_id = workspace_generations.id
      and workspace_generation_stages.stage = 'visual-assets'
      and workspace_generation_stages.status = 'completed'
  );

comment on column public.workspace_generation_stages.stage is
  'Specialized generation stage, including the non-blocking Visual Asset Agent stage.';

commit;
