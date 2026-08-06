//file: app/lib/companies/companySwitcher.ts

export type CompanySwitcherItem = {
  id: string;
  name: string;
  tagline: string;
  status: string;
  lastOpenedAt: string;
};

type CompanySwitcherDatabaseRow = {
  id: string;
  name: string;
  tagline: string;
  status: string;
  last_opened_at: string;
};

export function mapCompanySwitcherItem(
  company: CompanySwitcherDatabaseRow,
): CompanySwitcherItem {
  return {
    id: company.id,
    name: company.name,
    tagline: company.tagline,
    status: company.status,
    lastOpenedAt: company.last_opened_at,
  };
}