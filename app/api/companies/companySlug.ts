export function createCompanySlug(
  companyName: string,
) {
  const baseSlug = companyName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  const safeBaseSlug =
    baseSlug || "my-company";

  const suffix = crypto
    .randomUUID()
    .slice(0, 8);

  return `${safeBaseSlug}-${suffix}`;
}