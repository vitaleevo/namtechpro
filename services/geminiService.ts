
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || "";

export const getTechnicalAdvice = async (prompt: string) => {
  if (!apiKey) return "API Key not configured.";
  
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        systemInstruction: `Você é um assistente técnico especializado da Namtech Pro, uma empresa líder em tecnologia marítima e industrial em Namibe, Angola.
        Seu objetivo é ajudar os clientes a entender especificações técnicas de radares, sistemas de comunicação por satélite, energia limpa e automação industrial.
        Seja profissional, preciso e amigável. Use termos técnicos corretamente em português de Portugal/Angola.`
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, ocorreu um erro ao processar sua consulta técnica.";
  }
};
