import { 
  users, type User, type InsertUser, 
  type Newsletter, type InsertNewsletter,
  type JournalEntry, type InsertJournalEntry,
  type AIWhisper, type InsertAIWhisper
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Newsletter methods
  createNewsletterSubscription(data: InsertNewsletter & { createdAt: string }): Promise<Newsletter>;
  getNewsletterSubscriptions(): Promise<Newsletter[]>;
  
  // Journal methods
  createJournalEntry(data: InsertJournalEntry & { createdAt: string }): Promise<JournalEntry>;
  getJournalEntry(id: number): Promise<JournalEntry | undefined>;
  getJournalEntriesByUser(userId: number): Promise<JournalEntry[]>;
  getRecentJournalEntries(limit?: number): Promise<JournalEntry[]>;
  
  // AI Whispers methods
  createAIWhisper(data: InsertAIWhisper & { createdAt: string }): Promise<AIWhisper>;
  getAIWhisperByJournalEntryId(journalEntryId: number): Promise<AIWhisper | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private newsletterSubscriptions: Map<number, Newsletter>;
  private journalEntries: Map<number, JournalEntry>;
  private aiWhispers: Map<number, AIWhisper>;
  
  currentUserId: number;
  currentNewsletterId: number;
  currentJournalEntryId: number;
  currentAIWhisperId: number;

  constructor() {
    this.users = new Map();
    this.newsletterSubscriptions = new Map();
    this.journalEntries = new Map();
    this.aiWhispers = new Map();
    
    this.currentUserId = 1;
    this.currentNewsletterId = 1;
    this.currentJournalEntryId = 1;
    this.currentAIWhisperId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Newsletter methods
  async createNewsletterSubscription(data: InsertNewsletter & { createdAt: string }): Promise<Newsletter> {
    // Check if email already exists
    const existingSubscription = Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === data.email,
    );

    if (existingSubscription) {
      throw new Error("Email already exists in the newsletter subscriptions - unique constraint");
    }

    const id = this.currentNewsletterId++;
    // Handle possible undefined consent
    const consent = data.consent === undefined ? false : data.consent;
    const subscription: Newsletter = { ...data, consent, id };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }
  
  // Journal methods
  async createJournalEntry(data: InsertJournalEntry & { createdAt: string }): Promise<JournalEntry> {
    const id = this.currentJournalEntryId++;
    
    const entry: JournalEntry = { 
      id,
      content: data.content,
      userId: data.userId === undefined ? null : data.userId,
      mood: data.mood === undefined ? null : data.mood,
      primaryEmotion: data.primaryEmotion === undefined ? null : data.primaryEmotion,
      emotions: data.emotions === undefined || data.emotions === null ? [] : 
                  typeof data.emotions === 'string' ? JSON.parse(data.emotions) : [],
      physicalSensations: data.physicalSensations === undefined ? null : data.physicalSensations,
      triggers: data.triggers === undefined ? null : data.triggers,
      date: data.date === undefined ? null : data.date,
      createdAt: data.createdAt
    };
    
    this.journalEntries.set(id, entry);
    return entry;
  }
  
  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
  }
  
  async getJournalEntriesByUser(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  async getRecentJournalEntries(limit: number = 10): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
  
  // AI Whispers methods
  async createAIWhisper(data: InsertAIWhisper & { createdAt: string }): Promise<AIWhisper> {
    const id = this.currentAIWhisperId++;
    
    const whisper: AIWhisper = { 
      id,
      journalEntryId: data.journalEntryId,
      content: data.content,
      emotionalAnalysis: data.emotionalAnalysis === undefined ? null : data.emotionalAnalysis,
      createdAt: data.createdAt
    };
    
    this.aiWhispers.set(id, whisper);
    return whisper;
  }
  
  async getAIWhisperByJournalEntryId(journalEntryId: number): Promise<AIWhisper | undefined> {
    return Array.from(this.aiWhispers.values())
      .find(whisper => whisper.journalEntryId === journalEntryId);
  }
}

export const storage = new MemStorage();
