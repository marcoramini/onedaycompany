begin;

create or replace function public.user_owns_company_storage_object(object_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.companies
    where companies.id::text = split_part(object_name, '/', 1)
      and companies.owner_id = (select auth.uid())
  );
$$;

revoke all on function public.user_owns_company_storage_object(text) from public;
grant execute on function public.user_owns_company_storage_object(text) to authenticated;

drop policy if exists "Owners upload visual asset files" on storage.objects;
drop policy if exists "Owners update visual asset files" on storage.objects;

create policy "Owners upload visual asset files"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'company-visual-assets'
  and public.user_owns_company_storage_object(name)
);

create policy "Owners update visual asset files"
on storage.objects for update to authenticated
using (
  bucket_id = 'company-visual-assets'
  and public.user_owns_company_storage_object(name)
)
with check (
  bucket_id = 'company-visual-assets'
  and public.user_owns_company_storage_object(name)
);

commit;
