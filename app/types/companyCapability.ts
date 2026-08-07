export const companyCapabilityIds = [
  "company-foundation",
  "first-customers",
  "first-offer",
  "brand-identity",
  "public-presence",
  "promotional-launch",
  "customer-operations",
] as const;

export type CompanyCapabilityId =
  (typeof companyCapabilityIds)[number];

export type CompanyCapabilityStatus =
  | "not_started"
  | "draft"
  | "in_progress"
  | "ready"
  | "published"
  | "active"
  | "needs_review"
  | "updating";

export type CompanyCapabilityDefinition = {
  id: CompanyCapabilityId;
  label: string;
  objective: string;
  requiredActivityCount: number;
};

export const companyCapabilities = [
  {
    id: "company-foundation",
    label: "Company foundation",
    objective:
      "Keep the company direction clear and coherent.",
    requiredActivityCount: 3,
  },
  {
    id: "first-customers",
    label: "First customers",
    objective:
      "Define who should recognize themselves in the company.",
    requiredActivityCount: 3,
  },
  {
    id: "first-offer",
    label: "First offer",
    objective:
      "Make something concrete available to request or buy.",
    requiredActivityCount: 4,
  },
  {
    id: "brand-identity",
    label: "Brand identity",
    objective:
      "Give the company a recognizable visual direction.",
    requiredActivityCount: 4,
  },
  {
    id: "public-presence",
    label: "Public presence",
    objective:
      "Publish a place where people can understand and contact the company.",
    requiredActivityCount: 5,
  },
  {
    id: "promotional-launch",
    label: "Promotional launch",
    objective:
      "Bring the company in front of its first potential customers.",
    requiredActivityCount: 4,
  },
  {
    id: "customer-operations",
    label: "Customer operations",
    objective:
      "Turn customer interest into a manageable real interaction.",
    requiredActivityCount: 4,
  },
] as const satisfies readonly CompanyCapabilityDefinition[];
