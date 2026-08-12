import type { FoundationProposal } from "./contracts";

export function generateFallbackFoundationProposal(
  userContext: string,
): FoundationProposal {
  const context = userContext.trim();
  const italian = /\b(il|lo|la|gli|le|di|che|per|con|sono|una|un|vorrei|aiutare)\b/i.test(
    context,
  );

  if (italian) {
    return {
      purpose:
        "Aiutare le persone a trasformare ciò che già conoscono, amano o hanno vissuto in un progresso utile per gli altri.",
      vision:
        "Un futuro in cui più persone possano costruire una piccola azienda significativa attorno a un lavoro di cui essere orgogliose.",
      mission:
        "Dare forma alle conoscenze, agli interessi e all'esperienza dell'utente in una direzione aziendale semplice, visibile e utile fin da oggi.",
      companyConcept:
        "Un'azienda focalizzata e a basso costo che trasforma le basi personali dell'utente in un aiuto pratico e umano per un bisogno riconoscibile.",
      foundationalValueProposition:
        "Offrire un supporto chiaro, concreto e subito utile che aiuti le persone a fare un passo avanti su una sfida importante per loro.",
      userEvidence: [
        context.length > 240 ? `${context.slice(0, 237).trim()}...` : context,
      ],
      assumptions: [
        "Un pubblico iniziale ristretto apprezzerà un aiuto pratico radicato nella prospettiva dell'utente.",
        "La prima versione può iniziare a basso costo e diventare più chiara attraverso conversazioni reali.",
      ],
    };
  }

  return {
    purpose:
      "Help people turn what they already know, care about, or have experienced into useful progress for others.",
    vision:
      "A future where more people can build a small, meaningful company around work they are proud to do.",
    mission:
      "Shape the user's existing knowledge, interests, and lived experience into a simple company direction that can become visible and useful today.",
    companyConcept:
      "A focused, low-cost company that turns the user's personal foundation into practical, human help around one recognizable need.",
    foundationalValueProposition:
      "Offer clear, grounded, and immediately useful support that helps people move forward on a challenge that matters to them.",
    userEvidence: [
      context.length > 240 ? `${context.slice(0, 237).trim()}...` : context,
    ],
    assumptions: [
      "A small, focused starting audience will value practical help grounded in the user's perspective.",
      "The first version can begin with low cost and become clearer through real conversations.",
    ],
  };
}
