//file: app/components/NewCompanyFlow.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { savePendingCompany } from "../api/companies/pendingCompany";
import { generateBusinessOpportunities } from "../lib/businessOpportunitiesService";
import type { CompanyExecutionPlan } from "../lib/executionPlanSchema";
import { createClient } from "../lib/supabase/client";
import type { Company } from "../types/business";

import Architect from "./Architect";
import SaveCompanyScreen from "./auth/SaveCompanyScreen";
import BusinessOpportunitiesScreen from "./BusinessOpportunitiesScreen";
import CompanyBeginning from "./CompanyBeginning";
import CompanyCreationLoading from "./CompanyCreationLoading";
import ExecutionPlanScreen from "./ExecutionPlanScreen";

type FlowScreen =
  | "beginning"
  | "loading"
  | "opportunity"
  | "authentication"
  | "execution-plan"
  | "architect";

type NewCompanyFlowProps = {
  onExit: () => void;
};

export default function NewCompanyFlow({
  onExit,
}: NewCompanyFlowProps) {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] =
    useState<FlowScreen>("beginning");

  const [beginningContext, setBeginningContext] =
    useState("");

  const [company, setCompany] =
    useState<Company | null>(null);

  const [companies, setCompanies] =
    useState<Company[]>([]);

  const [executionPlan, setExecutionPlan] =
    useState<CompanyExecutionPlan | null>(null);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

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
      const generatedCompanies =
        await generateBusinessOpportunities(
          normalizedContext,
        );

      setCompanies(generatedCompanies);
      setCompany(null);
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
      !beginningContext ||
      isGenerating
    ) {
      return;
    }

    const previousCompanies = companies;

    setExecutionPlan(null);
    setIsGenerating(true);
    setError(null);
    setCurrentScreen("loading");

    try {
      const generatedCompanies =
        await generateBusinessOpportunities(
          beginningContext,
          previousCompanies,
        );

      setCompanies(generatedCompanies);
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

  async function handleChooseCompany(selectedCompany: Company) {
    if (
      !beginningContext ||
      isGenerating
    ) {
      return;
    }

    setCompany(selectedCompany);
    savePendingCompany(
      selectedCompany,
      beginningContext,
    );

    setError(null);
    setIsGenerating(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setCurrentScreen("authentication");
        return;
      }

      router.push("/company/complete");
    } catch (authenticationError) {
      console.error(
        "Existing authentication check failed.",
        authenticationError,
      );

      setCurrentScreen("authentication");
    } finally {
      setIsGenerating(false);
    }
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
    setCurrentScreen("beginning");
    setBeginningContext("");
    setCompany(null);
    setCompanies([]);
    setExecutionPlan(null);
    setError(null);
    setIsGenerating(false);
  }

  if (currentScreen === "beginning") {
    return (
      <CompanyBeginning
        initialValue={beginningContext}
        isSubmitting={isGenerating}
        error={error}
        onBack={onExit}
        onSubmit={handleGenerateCompany}
      />
    );
  }

  if (currentScreen === "loading") {
    return <CompanyCreationLoading />;
  }

  if (
    currentScreen === "opportunity" &&
    companies.length === 3
  ) {
    return (
        <BusinessOpportunitiesScreen
          companies={companies}
          isGenerating={isGenerating}
          error={error}
          onBack={handleBackToBeginning}
          onChooseCompany={handleChooseCompany}
          onGenerateMore={
            handleTryDifferentDirection
          }
        />
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
    <CompanyBeginning
      initialValue={beginningContext}
      isSubmitting={isGenerating}
      error={error}
      onBack={onExit}
      onSubmit={handleGenerateCompany}
    />
  );
}
