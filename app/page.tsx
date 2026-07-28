"use client";

import { useState } from "react";

import Architect from "./components/Architect";
import BusinessOpportunitiesScreen from "./components/BusinessOpportunitiesScreen";
import Landing from "./components/Landing";
import SkillsForm from "./components/SkillsForm";
import { generateBusinessDirections } from "./lib/businessOpportunityService";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(
    null,
  );

  function handleStart() {
    setStep("skills");
  }

  function handleReturnToLanding() {
    setStep("landing");
    setDirections([]);
    setSelectedDirection(null);
    setGenerationError(null);
    setIsGenerating(false);
  }

  function handleSkillsChange(value: string) {
    setSkills(value);

    if (generationError) {
      setGenerationError(null);
    }
  }

  async function handleGenerateDirections() {
    const normalizedSkills = skills.trim();

    if (!normalizedSkills || isGenerating) {
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const generatedDirections =
        await generateBusinessDirections(normalizedSkills);

      setDirections(generatedDirections);
      setSelectedDirection(null);
      setStep("opportunities");
    } catch (error) {
      console.error(
        "Failed to generate business directions:",
        error,
      );

      setGenerationError(
        "We couldn't generate your business opportunities. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  function handleEditSkills() {
    setDirections([]);
    setSelectedDirection(null);
    setGenerationError(null);
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
        isGenerating={isGenerating}
        error={generationError}
        onSkillsChange={handleSkillsChange}
        onBack={handleReturnToLanding}
        onSubmit={handleGenerateDirections}
      />
    );
  }

  return <Landing onStart={handleStart} />;
}