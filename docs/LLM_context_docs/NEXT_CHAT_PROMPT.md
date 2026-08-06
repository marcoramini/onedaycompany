# Next Chat Prompt — Milestone 3B.0.3

```text
Continuiamo OneDayCompany.

Leggi tutti i documenti presenti nella cartella `LLM context docs`.
Considera il codice corrente allegato come prima fonte di verità.

Obiettivo: completare Milestone 3B.0.3 — Console Shell.

La Console deve essere rifatta con una struttura pulita e modulare. Non vogliamo continuare ad applicare patch a `app/console/[companyId]/page.tsx`.

Sono già funzionanti:
- Landing;
- Guided Company Beginning;
- una Company proposal alla volta;
- refinement e alternative direction;
- Google OAuth tramite Supabase;
- persistenza di Profile, Company e First Offer;
- sessione SSR e RLS;
- returning-user sign-in;
- `/console` che apre l'ultima Company;
- più Company per utente;
- `last_opened_at`;
- CompanySwitcher;
- OpenedCompanyTracker;
- Start another company;
- proxy server-side locale per Supabase tramite undici.

`app/console/[companyId]/page.tsx` va riscritto come pagina server minimale responsabile soltanto di autenticazione, query, ownership, preparazione dati e composizione.

Deliverable:
- Sidebar desktop;
- Header mobile;
- CompanySwitcher integrato;
- area centrale;
- account utente;
- piano corrente;
- credits e usage placeholder;
- logout;
- navigazione futura visibile ma non ancora operativa;
- responsive behavior.

Vincoli:
- rispondi in italiano;
- tutto il contenuto pubblico deve essere in inglese;
- nessuna nuova tabella;
- nessuna nuova chiamata AI;
- nessuna immagine generata;
- nessun dato aziendale inventato;
- non modificare silenziosamente decisioni accettate;
- procedere per piccoli incrementi verificabili;
- prima del push eseguire npm run lint e npm run build.

Prima attività:
1. Leggi i file correnti.
2. Conferma i componenti esistenti.
3. Proponi i confini finali dei componenti.
4. Elenca i file da creare, riscrivere o eliminare.
5. Procedi con il codice completo un file alla volta.

File sorgenti da allegare:
- app/console/page.tsx
- app/console/[companyId]/page.tsx
- app/console/[companyId]/not-found.tsx
- app/components/console/ConsoleShell.tsx
- app/components/console/ConsoleSidebar.tsx
- app/components/console/CompanyConsoleHeader.tsx
- app/components/console/CompanySwitcher.tsx
- app/components/console/OpenedCompanyTracker.tsx
- app/lib/companies/companyQueries.ts
- app/lib/companies/companySwitcher.ts
- app/lib/supabase/server.ts
- app/lib/supabase/proxy.ts
- app/lib/network/serverFetch.ts
- app/auth/signout/route.ts
- proxy.ts
- package.json
```
