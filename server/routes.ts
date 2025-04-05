import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema, insertJournalEntrySchema, demoJournalSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { generateReflection, analyzeEmotions, generateJournalingPrompt } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const result = insertNewsletterSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }

      const { name, email, consent } = result.data;
      const subscription = await storage.createNewsletterSubscription({
        name,
        email,
        consent,
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({ 
        message: "Newsletter subscription successful",
        subscription
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("unique")) {
        return res.status(409).json({ message: "This email is already subscribed to our newsletter" });
      }
      console.error("Newsletter subscription error:", error);
      return res.status(500).json({ message: "Something went wrong with your subscription" });
    }
  });

  // Journal entry with AI whisper endpoint (demo version - no login required)
  app.post("/api/journal/demo", async (req, res) => {
    try {
      // Validate the journal entry
      const result = demoJournalSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }

      const { content, mood, emotions, physicalSensations, triggers, date } = result.data;
      
      // Analyze emotions in the journal entry
      const emotionalAnalysis = await analyzeEmotions(content);
      
      // Create a journal entry in storage
      const journalEntry = await storage.createJournalEntry({
        userId: null, // anonymous in demo mode
        content,
        mood: mood || null,
        primaryEmotion: emotionalAnalysis.primaryEmotion,
        emotions: emotions ? JSON.stringify(emotions) : null,
        physicalSensations: physicalSensations || null,
        triggers: triggers || null,
        date: date || null,
        createdAt: new Date().toISOString(),
      });
      
      // Generate AI reflection based on the journal entry
      const reflection = await generateReflection(content);
      
      // Store the AI whisper
      const whisper = await storage.createAIWhisper({
        journalEntryId: journalEntry.id,
        content: reflection,
        emotionalAnalysis: JSON.stringify(emotionalAnalysis),
        createdAt: new Date().toISOString(),
      });
      
      return res.status(201).json({
        message: "Journal entry saved and AI whisper generated",
        journalEntry,
        whisper: {
          ...whisper,
          emotionalAnalysis: emotionalAnalysis,
        }
      });
    } catch (error) {
      console.error("Journal entry error:", error);
      return res.status(500).json({ message: "Something went wrong with your journal entry" });
    }
  });

  // Get AI journaling prompt
  app.get("/api/journal/prompt", async (req, res) => {
    try {
      const recentEntries = await storage.getRecentJournalEntries(3);
      const recentTexts = recentEntries.map(entry => entry.content);
      const mood = req.query.mood as string | undefined;
      
      const prompt = await generateJournalingPrompt(recentTexts, mood);
      
      return res.status(200).json({
        prompt,
      });
    } catch (error) {
      console.error("Journaling prompt error:", error);
      return res.status(500).json({ message: "Could not generate a journaling prompt" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
