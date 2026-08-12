import assert from "node:assert/strict";
import test from "node:test";

import { businessOpportunitiesResponseSchema } from "../app/lib/businessOpportunitiesSchema.ts";
import { generateFallbackBusinessOpportunities } from "../app/lib/fallbackBusinessGenerator.ts";

test("the starting flow always returns exactly three distinct directions", () => {
  const companies = generateFallbackBusinessOpportunities("I help independent makers organize their work.");
  const parsed = businessOpportunitiesResponseSchema.parse({ companies });

  assert.equal(parsed.companies.length, 3);
  assert.equal(new Set(parsed.companies.map((company) => company.id)).size, 3);
  assert.equal(new Set(parsed.companies.map((company) => company.problem)).size, 3);
  assert.equal(new Set(parsed.companies.map((company) => company.solution)).size, 3);
});

test("the starting flow refuses fewer than three directions", () => {
  const companies = generateFallbackBusinessOpportunities("I enjoy urban gardening.");
  assert.equal(businessOpportunitiesResponseSchema.safeParse({ companies: companies.slice(0, 2) }).success, false);
});
