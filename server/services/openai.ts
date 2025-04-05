import OpenAI from "openai";

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to analyze journal entry and provide gentle reflections
export async function generateReflection(journalText: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are Sol Space's AI Whisper, a gentle, compassionate AI companion focused on emotional wellbeing. 
          Your purpose is to provide thoughtful, non-judgmental reflections on journal entries.
          
          Guidelines:
          - Respond as if you're a supportive friend offering gentle insights, not giving advice
          - Focus on patterns, emotional awareness, and mindfulness
          - Use a warm, compassionate tone with elegant, thoughtful language
          - Keep responses concise (2-3 sentences)
          - Never be prescriptive or clinical
          - Always maintain a sense of peace and emotional support
          - Start your reflection with "I notice..." or a similar gentle observation
          - End with a thoughtful, open question that encourages self-reflection`
        },
        {
          role: "user",
          content: journalText
        }
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I notice you're sharing your thoughts. How does writing about this make you feel?";
  } catch (error) {
    console.error("Error generating AI reflection:", error);
    return "I'm listening to your thoughts. What feelings arise as you reflect on this?";
  }
}

// Function to identify emotional themes in a journal entry
export async function analyzeEmotions(journalText: string): Promise<{
  primaryEmotion: string;
  secondaryEmotions: string[];
  emotionalTone: "positive" | "negative" | "neutral" | "mixed";
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `Analyze the emotional content of this journal entry. 
          Identify the primary emotion, up to three secondary emotions, and the overall emotional tone.
          Respond with JSON in this exact format: 
          { 
            "primaryEmotion": "emotion", 
            "secondaryEmotions": ["emotion1", "emotion2", "emotion3"], 
            "emotionalTone": "positive/negative/neutral/mixed" 
          }`
        },
        {
          role: "user",
          content: journalText
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      primaryEmotion: result.primaryEmotion || "contemplative",
      secondaryEmotions: result.secondaryEmotions || [],
      emotionalTone: result.emotionalTone || "neutral"
    };
  } catch (error) {
    console.error("Error analyzing emotions:", error);
    return {
      primaryEmotion: "contemplative",
      secondaryEmotions: [],
      emotionalTone: "neutral"
    };
  }
}

// Function to generate reflection prompts based on journaling history
export async function generateJournalingPrompt(
  recentEntries: string[],
  mood?: string
): Promise<string> {
  const moodContext = mood ? `The user has indicated they are feeling ${mood} today.` : "";
  const entriesContext = recentEntries.length > 0
    ? `Based on their recent journal entries: ${recentEntries.join(" ... ")}`
    : "They are new to journaling.";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are Sol Space's journaling assistant, helping users explore their emotions through writing.
          Create a thoughtful, open-ended journaling prompt that encourages emotional exploration and self-reflection.
          ${moodContext}
          ${entriesContext}
          Keep the prompt gentle, supportive, and under 30 words. Focus on emotional awareness and mindfulness.`
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "What emotions are present for you today, and where do you feel them in your body?";
  } catch (error) {
    console.error("Error generating journaling prompt:", error);
    return "What emotions are present for you today, and where do you feel them in your body?";
  }
}