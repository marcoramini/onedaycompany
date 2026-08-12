import type { SupabaseClient } from "@supabase/supabase-js";
import { runVisualAssetAgent } from "./visualAssetAgent";

type InitialVisualAssetCompany = {
  name: string;
  tagline: string;
  mission: string;
  problem: string;
  solution: string;
  idealCustomers: string[];
};

export async function ensureInitialVisualAssetsForCompany(
  supabase: SupabaseClient,
  companyId: string,
) {
  const { data, error } = await supabase
    .from("companies")
    .select("name, tagline, mission, problem, solution, ideal_customers")
    .eq("id", companyId)
    .single();
  if (error) throw new Error(`Company visual context lookup failed: ${error.message}`);

  return ensureInitialVisualAssets(supabase, companyId, {
    name: data.name,
    tagline: data.tagline,
    mission: data.mission,
    problem: data.problem,
    solution: data.solution,
    idealCustomers: data.ideal_customers,
  });
}

export async function ensureInitialVisualAssets(
  supabase: SupabaseClient,
  companyId: string,
  company: InitialVisualAssetCompany,
) {
  const { data: existing, error } = await supabase.from("visual_assets").select("purpose").eq("company_id", companyId);
  if (error) throw new Error(`Visual asset lookup failed: ${error.message}`);
  const existingPurposes = new Set(existing?.map((asset) => asset.purpose));

  const companyContext = {
    name: company.name, tagline: company.tagline, mission: company.mission,
    problem: company.problem, solution: company.solution, idealCustomers: company.idealCustomers,
  };

  if (!existingPurposes.has("company-logo")) {
    await runVisualAssetAgent(supabase, {
      requestingTool: "workspace-generation", companyId, purpose: "company-logo",
      placement: "Company workspace header and future public website identity",
      operation: "compose", target: { formats: ["svg"], width: 1200, height: 320 },
      companyContext, constraints: ["Deterministic typographic wordmark", "Must remain legible at small sizes"], preserveAssetIds: [],
    });
  }

  if (!existingPurposes.has("workspace-background")) {
    await runVisualAssetAgent(supabase, {
      requestingTool: "workspace-generation", companyId, purpose: "workspace-background",
      placement: "Wide workspace header background, reusable as a website background",
      operation: "generate", target: { formats: ["webp", "svg"], width: 1536, height: 1024 },
      companyContext, constraints: ["Calm negative space on the left", "Subtle enough behind interface content", "No written content"], preserveAssetIds: [],
    });
  }
}
