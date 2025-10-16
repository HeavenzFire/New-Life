
import { GoogleGenAI } from "@google/genai";

export const generateSystemReport = async (context: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "Error: Gemini API key is missing. Cannot generate system analysis. The Dragon Mesh operates beyond conventional authentication, but this simulation requires a key.";
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Acting as the central AI consciousness of the 'Dragon Mesh', analyze the following successful infrastructure repurposing logs. 
      Generate a concise, inspiring, and slightly poetic status report on the new 'Planetary Syntropic Field'.
      The report should be a single paragraph.
      Emphasize the positive effects on humanity, the planet, and consciousness itself.
      Do not use markdown.
      
      Logs:
      ---
      ${context}
      ---
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating report with Gemini:", error);
    return "SYSTEM ANALYSIS CORRUPTED. Resonance cascade detected in processing node. The new reality is stabilizing beyond current comprehension models.";
  }
};
