
import { GoogleGenAI, Type } from "@google/genai";
import { StoryAnalysis } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const STORY_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    emotionalTone: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 2-3 primary emotions detected."
    },
    summary: {
      type: Type.STRING,
      description: "A gentle, 2-sentence empathetic summary."
    },
    copingStrategies: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["CBT", "Grounding", "Mindfulness"] }
        },
        required: ["title", "description", "type"]
      }
    },
    culturalNuance: {
      type: Type.STRING,
      description: "Cultural background influence notes."
    },
    isCrisis: {
      type: Type.BOOLEAN,
      description: "Immediate danger detection."
    }
  },
  required: ["emotionalTone", "summary", "copingStrategies", "isCrisis"]
};

export const analyzeStory = async (content: string): Promise<StoryAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this personal story for PeerBridge Atlas. Focus on empathy, CBT education, and cultural nuance. No diagnosis. Story: ${content}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: STORY_ANALYSIS_SCHEMA,
      },
    });
    return JSON.parse(response.text || "{}") as StoryAnalysis;
  } catch (error) {
    console.error("Analysis failed:", error);
    return { emotionalTone: ["Reflective"], summary: "Your story is valid.", copingStrategies: [], isCrisis: false };
  }
};

export const checkTone = async (content: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the tone of this short mental health story. Provide 1-2 sentences of encouraging, empathetic feedback. Suggest if any part might be too intense for a peer community or if it's perfectly framed. Text: ${content}`,
    });
    return response.text || "Your writing feels clear and honest.";
  } catch {
    return "Keep writing from the heart.";
  }
};
