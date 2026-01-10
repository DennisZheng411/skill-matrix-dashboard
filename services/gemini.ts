
import { GoogleGenAI } from "@google/genai";
import { SkillMatrixData } from "../types";

export const getAIInsights = async (data: SkillMatrixData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    As a Senior Support Manager, analyze the following skill matrix data from our engineer incident tracking.
    
    Total Cases: ${data.totalCases}
    Active Engineers: ${data.activeEngineers}
    Most frequent Skill (Top Skill): ${data.topSkill}
    
    Engineers: ${data.engineers.join(', ')}
    Skills involved: ${data.skills.join(', ')}
    
    Raw Matrix Distribution (Engineer: { Skill: Count }):
    ${JSON.stringify(data.matrix, null, 2)}
    
    Please provide:
    1. A brief summary of the workload balance.
    2. Identification of any potential "single points of failure" (engineers who are the only ones handling a specific skill).
    3. Recommendations for skill-sharing or training based on the volume.
    Keep the tone professional, concise, and actionable. Use Markdown for formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "Could not generate insights at this time.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Failed to fetch AI insights. Please check your API configuration.";
  }
};
