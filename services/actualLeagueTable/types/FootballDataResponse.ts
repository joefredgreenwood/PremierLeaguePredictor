import { z } from "zod";

// Team schema
const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortName: z.string(),
  tla: z.string(),
  crest: z.string().url(),
});

// Table entry
const tableEntrySchema = z.object({
  position: z.number(),
  team: teamSchema,
  playedGames: z.number(),
  // form: z.string().optional(),
  won: z.number(),
  draw: z.number(),
  lost: z.number(),
  points: z.number(),
  goalsFor: z.number(),
  goalsAgainst: z.number(),
  goalDifference: z.number(),
});

// Standings schema
const standingsSchema = z.object({
  stage: z.string(),
  type: z.string(),
  group: z.string().nullable(),
  table: z.array(tableEntrySchema),
});

// Season
const seasonSchema = z.object({
  id: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  currentMatchday: z.number(),
  winner: z.null(),
});

// Competition
const competitionSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  type: z.string(),
  emblem: z.string().url(),
});

// Area
const areaSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  flag: z.string().url(),
});

// Filters
const filtersSchema = z.object({
  season: z.string().optional(),
  matchday: z.string().optional(),
});
// Final schema
export const standingsResponseSchema = z.object({
  filters: filtersSchema.optional(),
  area: areaSchema.optional(),
  competition: competitionSchema.optional(),
  season: seasonSchema.optional(),
  standings: z.array(standingsSchema),
});

// Infer TypeScript type
export type FootballDataResponse = z.infer<typeof standingsResponseSchema>;
