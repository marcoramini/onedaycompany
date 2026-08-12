import type { FoundationProposal } from "../company-foundation/contracts";

import type { FirstOfferProposal } from "./contracts";

function isItalian(foundation: FoundationProposal): boolean {
  return /\b(il|lo|la|gli|le|di|che|per|con|sono|una|un|vorrei|aiutare)\b/i.test(
    foundation.userEvidence.join(" "),
  );
}

export function generateFallbackFirstOfferProposal(
  foundation: FoundationProposal,
): FirstOfferProposal {
  if (isItalian(foundation)) {
    return {
      name: "Sessione Primo Passo",
      audience: "Persone che affrontano una sfida concreta e cercano un aiuto pratico e umano.",
      desiredOutcome: "Uscire con maggiore chiarezza e un primo passo realistico da compiere.",
      promise: "Una sessione focalizzata per trasformare una situazione confusa in un prossimo passo utile.",
      scope: ["Una breve preparazione sul contesto della persona.", "Una sessione individuale focalizzata su una sfida.", "Un riepilogo con un prossimo passo pratico."],
      delivery: "Una sessione individuale online o di persona, preparata e condotta direttamente dal fondatore.",
      boundaries: ["Non sostituisce consulenza medica, legale o finanziaria professionale.", "Affronta una sola sfida concordata per sessione."],
      priceHypothesis: null,
      assumptions: ["Un piccolo pubblico iniziale apprezzerà un aiuto pratico coerente con la prospettiva del fondatore.", "Le prime conversazioni aiuteranno a definire formato e prezzo adeguati."],
      foundationImpactWarnings: [],
    };
  }

  return {
    name: "First Step Session",
    audience: "People facing one concrete challenge who want practical, human support.",
    desiredOutcome: "Leave with greater clarity and one realistic next step to take.",
    promise: "A focused session that turns a confusing situation into one useful next step.",
    scope: ["Brief preparation around the person's context.", "One focused one-to-one session on a single challenge.", "A short recap with one practical next step."],
    delivery: "A one-to-one online or in-person session prepared and delivered directly by the founder.",
    boundaries: ["It does not replace professional medical, legal, or financial advice.", "It addresses one agreed challenge per session."],
    priceHypothesis: null,
    assumptions: ["A small initial audience will value practical help consistent with the founder's perspective.", "Early conversations will clarify the right format and price."],
    foundationImpactWarnings: [],
  };
}
