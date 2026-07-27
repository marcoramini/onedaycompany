"use client";

import { useState } from "react";

import Architect from "./components/Architect";
import BusinessOpportunitiesScreen from "./components/BusinessOpportunitiesScreen";
import Landing from "./components/Landing";
import SkillsForm from "./components/SkillsForm";
import { buildBusinessDirections } from "./lib/businessGenerator";
import type { BusinessDirection } from "./types/business";

type WorkflowStep =
  | "landing"
  | "skills"
  | "opportunities"
  | "architect";

export default function Home() {
  const [step, setStep] = useState<WorkflowStep>("landing");
  const [skills, setSkills] = useState("");
  const [directions, setDirections] = useState<BusinessDirection[]>([]);
  const [selectedDirection, setSelectedDirection] =
    useState<BusinessDirection | null>(null);

  function handleStart() {
    setStep("skills");
  }

  function handleReturnToLanding() {
    setStep("landing");
    setDirections([]);
    setSelectedDirection(null);
  }

  function handleGenerateDirections() {
    const normalizedSkills = skills.trim();

    if (!normalizedSkills) {
      return;
    }

    setDirections(buildBusinessDirections(normalizedSkills));
    setSelectedDirection(null);
    setStep("opportunities");
  }

  function handleEditSkills() {
    setDirections([]);
    setSelectedDirection(null);
    setStep("skills");
  }

  function handleChooseDirection(direction: BusinessDirection) {
    setSelectedDirection(direction);
    setStep("architect");
  }

  function handleReturnToOpportunities() {
    setSelectedDirection(null);
    setStep("opportunities");
  }

  if (step === "architect" && selectedDirection) {
    return <Architect onBack={handleReturnToOpportunities} />;
  }

  if (step === "opportunities") {
    return (
      <BusinessOpportunitiesScreen
        directions={directions}
        onBack={handleEditSkills}
        onChooseDirection={handleChooseDirection}
      />
    );
  }

  if (step === "skills") {
    return (
      <SkillsForm
        skills={skills}
        onSkillsChange={setSkills}
        onBack={handleReturnToLanding}
        onSubmit={handleGenerateDirections}
      />
    );
  }

  return <Landing onStart={handleStart} />;
}
