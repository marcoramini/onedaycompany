"use client";

import { useState } from "react";

import Architect from "./components/Architect";
import BusinessDirectionScreen from "./components/BusinessDirectionScreen";
import Landing from "./components/Landing";
import SkillsForm from "./components/SkillsForm";
import { buildBusinessDirection } from "./lib/businessGenerator";
import type { BusinessDirection } from "./types/business";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [skills, setSkills] = useState("");
  const [direction, setDirection] =
    useState<BusinessDirection | null>(null);
  const [businessPlan, setBusinessPlan] = useState(false);

  function handleStart() {
    setStarted(true);
  }

  function handleReturnToLanding() {
    setStarted(false);
    setDirection(null);
    setBusinessPlan(false);
  }

  function handleGenerateDirection() {
    const normalizedSkills = skills.trim();

    if (!normalizedSkills) {
      return;
    }

    const result = buildBusinessDirection(normalizedSkills);

    setDirection(result);
    setBusinessPlan(false);
  }

  function handleEditSkills() {
    setDirection(null);
    setBusinessPlan(false);
  }

  function handleBuildBusinessPlan() {
    if (!direction) {
      return;
    }

    setBusinessPlan(true);
  }

  function handleReturnToDirection() {
    setBusinessPlan(false);
  }

  if (businessPlan && direction) {
    return <Architect onBack={handleReturnToDirection} />;
  }

  if (direction) {
    return (
      <BusinessDirectionScreen
        direction={direction}
        onBack={handleEditSkills}
        onEditSkills={handleEditSkills}
        onBuildBusinessPlan={handleBuildBusinessPlan}
      />
    );
  }

  if (!started) {
    return <Landing onStart={handleStart} />;
  }

  return (
    <SkillsForm
      skills={skills}
      onSkillsChange={setSkills}
      onBack={handleReturnToLanding}
      onSubmit={handleGenerateDirection}
    />
  );
}