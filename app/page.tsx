"use client";

import { useState } from "react";

import Architect from "./components/Architect";
import SaveCompanyScreen from "./components/auth/SaveCompanyScreen";
import BusinessOpportunitiesScreen from "./components/BusinessOpportunitiesScreen";
import CompanyBeginning from "./components/CompanyBeginning";
import CompanyCreationLoading from "./components/CompanyCreationLoading";
import ExecutionPlanScreen from "./components/ExecutionPlanScreen";
import Landing from "./components/Landing";
import RefinementDrawer from "./components/RefinementDrawer";
import { savePendingCompany } from "./api/companies/pendingCompany";
import { generateBusinessOpportunity } from "./lib/businessOpportunitiesService";
import type { CompanyExecutionPlan } from "./lib/executionPlanSchema";
import type { Company } from "./types/business";

type Screen =
  | "landing"
  | "beginning"
  | "loading"
  | "opportunity"
  | "authentication"
  | "execution-plan"
  | "architect";

export default function Home() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("landing");

  const [beginningContext, setBeginningContext] =
    useState("");

  const [company, setCompany] =
    useState<Company | null>(null);

  const [executionPlan, setExecutionPlan] =
    useState<CompanyExecutionPlan | null>(null);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [isRefinementOpen, setIsRefinementOpen] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  function handleStart() {
    setError(null);
    setCurrentScreen("beginning");
  }

  async function handleGenerateCompany(
    context: string,
  ) {
    const normalizedContext = context.trim();

    if (!normalizedContext) {
      setError(
        "Share something meaningful to build your company from.",
      );
      return;
    }

    setBeginningContext(normalizedContext);
    setExecutionPlan(null);
    setIsGenerating(true);
    setError(null);
    setCurrentScreen("loading");

    try {
      const generatedCompany =
        await generateBusinessOpportunity(
          normalizedContext,
        );

      setCompany(generatedCompany);
      setCurrentScreen("opportunity");
    } catch (generationError) {
      console.error(
        "Company generation failed.",
        generationError,
      );

      setError(
        generationError instanceof Error
          ? generationError.message
          : "We could not shape your company. Please try again.",
      );

      setCurrentScreen("beginning");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleTryDifferentDirection() {
    if (
      !company ||
      !beginningContext ||
      isGenerating
    ) {
      return;
    }

    const previousCompany = company;

    setExecutionPlan(null);
    setIsGenerating(true);
    setError(null);
    setCurrentScreen("loading");

    try {
      const generatedCompany =
        await generateBusinessOpportunity(
          beginningContext,
          previousCompany,
        );

      setCompany(generatedCompany);
      setCurrentScreen("opportunity");
    } catch (generationError) {
      console.error(
        "Alternative company generation failed.",
        generationError,
      );

      setError(
        generationError instanceof Error
          ? generationError.message
          : "We couldn't shape another proposal.",
      );

      setCurrentScreen("opportunity");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleRefineCompany(
    refinementRequest: string,
  ) {
    if (
      !company ||
      !beginningContext ||
      isGenerating
    ) {
      return;
    }

    const currentCompany = company;

    setExecutionPlan(null);
    setIsRefinementOpen(false);
    setIsGenerating(true);
    setError(null);
    setCurrentScreen("loading");

    try {
      const refinedCompany =
        await generateBusinessOpportunity(
          beginningContext,
          currentCompany,
          refinementRequest,
        );

      setCompany(refinedCompany);
      setCurrentScreen("opportunity");
    } catch (refinementError) {
      console.error(
        "Company refinement failed.",
        refinementError,
      );

      setError(
        refinementError instanceof Error
          ? refinementError.message
          : "We couldn't refine this proposal.",
      );

      setCurrentScreen("opportunity");
      setIsRefinementOpen(true);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleChooseCompany() {
    if (
      !company ||
      !beginningContext ||
      isGenerating
    ) {
      return;
    }

    savePendingCompany(
      company,
      beginningContext,
    );

    setError(null);
    setIsRefinementOpen(false);
    setCurrentScreen("authentication");
  }

  function handleStartExecutionStep() {
    setError(null);
    setCurrentScreen("architect");
  }

  function handleBackToBeginning() {
    if (isGenerating) {
      return;
    }

    setError(null);
    setIsRefinementOpen(false);
    setCurrentScreen("beginning");
  }

  function handleBackToCompany() {
    setError(null);
    setCurrentScreen("opportunity");
  }

  function handleBackToExecutionPlan() {
    setError(null);

    if (executionPlan) {
      setCurrentScreen("execution-plan");
      return;
    }

    setCurrentScreen("opportunity");
  }

  function handleRestart() {
    setCurrentScreen("landing");
    setBeginningContext("");
    setCompany(null);
    setExecutionPlan(null);
    setError(null);
    setIsGenerating(false);
    setIsRefinementOpen(false);
  }

  if (currentScreen === "landing") {
    return (
      <Landing
        onStart={handleStart}
      />
    );
  }

  if (currentScreen === "beginning") {
    return (
      <CompanyBeginning
        initialValue={beginningContext}
        isSubmitting={isGenerating}
        error={error}
        onBack={() => {
          setError(null);
          setCurrentScreen("landing");
        }}
        onSubmit={handleGenerateCompany}
      />
    );
  }

  if (currentScreen === "loading") {
    return <CompanyCreationLoading />;
  }

  if (
    currentScreen === "opportunity" &&
    company
  ) {
    return (
      <>
        <BusinessOpportunitiesScreen
          company={company}
          isGenerating={isGenerating}
          error={error}
          onBack={handleBackToBeginning}
          onChooseCompany={handleChooseCompany}
          onRefineProposal={() => {
            setError(null);
            setIsRefinementOpen(true);
          }}
          onTryDifferentDirection={
            handleTryDifferentDirection
          }
        />

        {isRefinementOpen ? (
          <RefinementDrawer
            isOpen
            companyName={company.name}
            onClose={() => {
              setIsRefinementOpen(false);
            }}
            onSubmit={handleRefineCompany}
          />
        ) : null}
      </>
    );
  }

  if (
    currentScreen === "authentication" &&
    company
  ) {
    return (
      <SaveCompanyScreen
        companyName={company.name}
        onBack={() => {
          setError(null);
          setCurrentScreen("opportunity");
        }}
      />
    );
  }

  if (
    currentScreen === "execution-plan" &&
    company &&
    executionPlan
  ) {
    return (
      <ExecutionPlanScreen
        company={company}
        plan={executionPlan}
        onBack={handleBackToCompany}
        onStartStep={handleStartExecutionStep}
      />
    );
  }

  if (
    currentScreen === "architect" &&
    company
  ) {
    return (
      <Architect
        company={company}
        onBack={handleBackToExecutionPlan}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <Landing
      onStart={handleStart}
    />
  );
}