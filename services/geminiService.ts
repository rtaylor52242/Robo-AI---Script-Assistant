import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedScript, ScriptFormData } from "../types";

const scriptSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A catchy, click-worthy title for the YouTube video.",
    },
    thumbnailIdea: {
      type: Type.STRING,
      description: "A detailed description of a high-CTR thumbnail image.",
    },
    sections: {
      type: Type.ARRAY,
      description: "The structured sections of the video script.",
      items: {
        type: Type.OBJECT,
        properties: {
          heading: {
            type: Type.STRING,
            description: "The section header (e.g., Hook, Intro, Point 1, Outro).",
          },
          content: {
            type: Type.STRING,
            description: "The spoken word script for the host. Write in full paragraphs.",
          },
          visualCue: {
            type: Type.STRING,
            description: "Instructions for the editor or B-Roll suggestions (e.g., [B-ROLL: Show robot dancing]).",
          },
          durationEst: {
            type: Type.STRING,
            description: "Estimated duration for this section (e.g., '30s').",
          },
        },
        required: ["heading", "content", "visualCue"],
      },
    },
  },
  required: ["title", "thumbnailIdea", "sections"],
};

export const generateScriptWithGemini = async (
  formData: ScriptFormData
): Promise<Omit<GeneratedScript, 'id' | 'createdAt'>> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a world-class YouTube Scriptwriter expert known for high retention and engagement.
    Create a video script based on the following parameters:
    
    Topic: ${formData.topic}
    Target Audience: ${formData.audience}
    Tone: ${formData.tone}
    Desired Length: ${formData.length}
    Additional Context/Key Points: ${formData.additionalContext}

    The script must follow a proven high-retention structure:
    1. Hook (First 30 seconds is critical)
    2. Intro (Brief context)
    3. Meat/Content (Broken down into 3-5 logical steps or points)
    4. CTA (Placed naturally)
    5. Outro (Loop back to start or suggest next video)

    Include specific visual cues for B-roll, text overlays, or graphics.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: scriptSchema,
        systemInstruction: "You are an expert YouTube strategist and scriptwriter.",
      },
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini.");
    }

    const data = JSON.parse(response.text);
    return data as Omit<GeneratedScript, 'id' | 'createdAt'>;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
