import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  consent: boolean("consent").notNull().default(false),
  createdAt: text("created_at").notNull(),
});

export const insertNewsletterSchema = createInsertSchema(newsletter).pick({
  name: true,
  email: true,
  consent: true,
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletter.$inferSelect;

// Journal entries
export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"), // Optional for anonymous entries - can be null
  content: text("content").notNull(),
  mood: text("mood"), // Can be null
  primaryEmotion: text("primary_emotion"), // Can be null
  emotions: text("emotions"), // JSON array of emotions
  physicalSensations: text("physical_sensations"), // Physical body sensations
  triggers: text("triggers"), // What triggered these emotions
  date: text("date"), // Date of the entry (if different from created date)
  createdAt: text("created_at").notNull(),
});

// Custom Zod schema with explicit nullable types for journal entries
export const journalEntrySchema = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  content: z.string(),
  mood: z.string().nullable(),
  primaryEmotion: z.string().nullable(),
  emotions: z.string().nullable().transform(val => 
    val ? JSON.parse(val) as string[] : []
  ),
  physicalSensations: z.string().nullable(),
  triggers: z.string().nullable(),
  date: z.string().nullable(),
  createdAt: z.string(),
});

// Schema for inserting new journal entries
export const insertJournalEntrySchema = z.object({
  userId: z.number().nullable().optional(),
  content: z.string(),
  mood: z.string().nullable().optional(),
  primaryEmotion: z.string().nullable().optional(),
  emotions: z.union([z.string(), z.array(z.string()).transform(val => 
    JSON.stringify(val)
  )]).nullable().optional(),
  physicalSensations: z.string().nullable().optional(),
  triggers: z.string().nullable().optional(),
  date: z.string().nullable().optional(),
});

export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type JournalEntry = z.infer<typeof journalEntrySchema>;

// AI whispers (reflections on journal entries)
export const aiWhispers = pgTable("ai_whispers", {
  id: serial("id").primaryKey(),
  journalEntryId: integer("journal_entry_id").notNull(),
  content: text("content").notNull(),
  emotionalAnalysis: text("emotional_analysis"), // JSON string with emotional analysis - can be null
  createdAt: text("created_at").notNull(),
});

// Custom Zod schema with explicit nullable types for AI whispers
export const aiWhisperSchema = z.object({
  id: z.number(),
  journalEntryId: z.number(),
  content: z.string(),
  emotionalAnalysis: z.string().nullable(),
  createdAt: z.string(),
});

// Schema for inserting new AI whispers
export const insertAIWhisperSchema = z.object({
  journalEntryId: z.number(),
  content: z.string(),
  emotionalAnalysis: z.string().nullable().optional(),
});

export type InsertAIWhisper = z.infer<typeof insertAIWhisperSchema>;
export type AIWhisper = z.infer<typeof aiWhisperSchema>;

// Simplified schema for demo version without requiring login
export const demoJournalSchema = z.object({
  content: z.string().min(3, "Journal entry must be at least 3 characters"),
  mood: z.string().optional(),
  emotions: z.array(z.string()).optional(),
  physicalSensations: z.string().optional(),
  triggers: z.string().optional(),
  date: z.string().optional(),
});

export type DemoJournal = z.infer<typeof demoJournalSchema>;
