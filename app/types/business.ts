export type StartupCost = "very-low" | "low" | "moderate";

export type Company = {
  id: string;
  name: string;
  tagline: string;
  mission: string;
  problem: string;
  solution: string;
  firstOffer: {
    name: string;
    description: string;
    outcome: string;
  };
  idealCustomers: string[];
  whyNow: string;
  futureExpansion: string;
  startupCost: StartupCost;
};