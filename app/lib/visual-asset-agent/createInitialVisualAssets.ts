import type { SupabaseClient } from "@supabase/supabase-js";
import type { CompanyPersistenceInput } from "../../api/companies/companyPersistenceSchema";
import { runVisualAssetAgent } from "./visualAssetAgent";

export async function ensureInitialVisualAssets(
  supabase: SupabaseClient,
  companyId: string,
  company: CompanyPersistenceInput["company"],
) {
  const { data: existing, error } = await supabase.from("visual_assets").select("id").eq("company_id", companyId).limit(1);
  if (error) throw new Error(`Visual asset lookup failed: ${error.message}`);
  if (existing?.length) return;

  const companyContext = {
    name: company.name, tagline: company.tagline, mission: company.mission,
    problem: company.problem, solution: company.solution, idealCustomers: company.idealCustomers,
  };

  await runVisualAssetAgent(supabase, {
    requestingTool: "company-creation", companyId, purpose: "company-logo",
    placement: "Company workspace header and future public website identity",
    operation: "compose", target: { formats: ["svg"], width: 1200, height: 320 },
    companyContext, constraints: ["Deterministic typographic wordmark", "Must remain legible at small sizes"], preserveAssetIds: [],
  });

  await runVisualAssetAgent(supabase, {
    requestingTool: "company-creation", companyId, purpose: "workspace-background",
    placement: "Wide workspace header background, reusable as a website background",
    operation: "generate", target: { formats: ["webp", "svg"], width: 1536, height: 1024 },
    companyContext, constraints: ["Calm negative space on the left", "Subtle enough behind interface content", "No written content"], preserveAssetIds: [],
  });
}
