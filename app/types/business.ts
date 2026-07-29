export type BusinessDirection = {
  id: string;
  title: string;
  customer: string;
  valueCreated: string;
  credibility: string;
  testability: string;
};
export interface BusinessBlueprint {
  id: string;
  directionId: string;

  title: string;
  tagline: string;
  whyThisBusiness: string;

  idealCustomer: BlueprintHypothesis;
  customerProblem: BlueprintHypothesis;
  valueProposition: BlueprintHypothesis;
  whyYou: string;

  firstOffer: {
    name: string;
    description: string;
    suggestedPrice: string;
  };

  deliveryModel: BlueprintHypothesis;
  acquisitionStartingPoint: BlueprintHypothesis;

  mainAssumptions: string[];

  validationExperiment: {
    title: string;
    description: string;
    successSignal: string;
  };
}

export interface BlueprintHypothesis {
  value: string;
  status: "assumption";
}