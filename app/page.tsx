"use client";

import { useState } from "react";

import Architect from "./components/Architect";
import BusinessOpportunitiesScreen from "./components/BusinessOpportunitiesScreen";
import CompanyBeginning from "./components/CompanyBeginning";
import CompanyCreationLoading from "./components/CompanyCreationLoading";
import Landing from "./components/Landing";
import RefinementDrawer from "./components/RefinementDrawer";
import { generateBusinessOpportunity } from "./lib/businessOpportunitiesService";
import type { Company } from "./types/business";

type Screen =
  | "landing"
  | "beginning"
  | "loading"
  | "opportunity"
  | "architect";

export default function Home() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("landing");

  const [beginningContext, setBeginningContext] =
    useState("");

  const [company, setCompany] =
    useState<Company | null>(null);

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
    } catch (error) {
      console.error(
        "Company generation failed.",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "We could not shape your company. Please try again.",
      );

      setCurrentScreen("beginning");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleTryDifferentDirection() {
    if (!company || !beginningContext || isGenerating) {
      return;
    }

    const previousCompany = company;

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
    } catch (error) {
      console.error(
        "Alternative company generation failed.",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
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
    if (!company || !beginningContext || isGenerating) {
      return;
    }

    const currentCompany = company;

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
    } catch (error) {
      console.error(
        "Company refinement failed.",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "We couldn't refine this proposal.",
      );

      setCurrentScreen("opportunity");
      setIsRefinementOpen(true);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleChooseCompany() {
    if (!company) {
      return;
    }

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

  function handleRestart() {
    setCurrentScreen("landing");
    setBeginningContext("");
    setCompany(null);
    setError(null);
    setIsGenerating(false);
    setIsRefinementOpen(false);
  }

  if (currentScreen === "landing") {
    return <Landing onStart={handleStart} />;
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

        <RefinementDrawer
          isOpen={isRefinementOpen}
          companyName={company.name}
          onClose={() =>
            setIsRefinementOpen(false)
          }
          onSubmit={handleRefineCompany}
        />
      </>
    );
  }

  if (
    currentScreen === "architect" &&
    company
  ) {
    return (
      <Architect
        company={company}
        onBack={handleBackToCompany}
        onRestart={handleRestart}
      />
    );
  }

  return <Landing onStart={handleStart} />;
}