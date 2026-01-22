import { GoogleGenAI } from "@google/genai";
import { SkillMatrixData } from "../types.ts";

export const getAIInsights = async (data: SkillMatrixData): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Analyze incidents: ${data.totalCases}, Skills: ${JSON.stringify(data.skillTotals)}. Concise bullets only.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No insights.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw new Error(error.message || "Insight generation failed.");
  }
};
