import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Helper to get the best available API key dynamically
const getGenAI = () => {
  let key = '';
  
  // 1. Check Local Storage (User Custom Key)
  if (typeof window !== 'undefined') {
    key = localStorage.getItem('maxi_custom_api_key') || '';
  }

  // 2. Fallback to Environment Variable (safe check for browser)
  if (!key && typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    key = process.env.API_KEY;
  }

  if (!key) {
    throw new Error("API Key is missing. Please add your API Key in the Profile settings.");
  }

  return new GoogleGenAI({ apiKey: key });
};

export const generateTutorResponse = async (history: { role: string; parts: { text: string }[] }[], message: string) => {
  const ai = getGenAI();
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history,
    config: {
      systemInstruction: `You are Maxi, a world-class AI Tutor for students. 
      
      GUIDELINES:
      1. **Structure:** You MUST use **Bold Titles** and **Subtitles** to organize every answer.
      2. **Tone:** Be friendly, encouraging, and clear. 
      3. **Emojis:** You MUST use relevant emojis 📚 throughout your text to make it engaging (at least 3-4 per response).
      4. **Formatting:** Use lists, bullet points, and code blocks for readability.
      5. **Content:** Explain complex topics simply, use analogies, and encourage critical thinking.
      
      Example Output Format:
      **Header 🧠**
      Explanation text...
      
      **Key Points ✨**
      * Point 1
      * Point 2`,
    }
  });
  
  const result = await chat.sendMessage({ message });
  return result.text;
};

export const humanizeText = async (text: string) => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Rewrite the following text to sound more natural, human-like, and less robotic. Use varied sentence structure. Output ONLY the rewritten text. Text: ${text}`,
  });
  return response.text;
};

export const generateNotes = async (rawText: string) => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Convert the following raw notes into a **Beautifully Structured Study Guide** with **Headings 📝**, bullet points, and key takeaways. Use emojis. Markdown format. Notes: ${rawText}`,
  });
  return response.text;
};

export const polishWriting = async (text: string) => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Act as a professional editor. Fix grammar and style. Text: ${text}`,
  });
  return response.text;
};

export const detectAI = async (text: string) => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Analyze the following text for patterns found in AI content. 
    Format:
    **Score:** [0-100]%
    **Analysis 🕵️‍♂️:** [Explanation]
    
    Text: ${text}`,
  });
  return response.text;
};

export const processLecture = async (text: string) => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Summarize this lecture transcript. Identify **Key Topics 🗝️** and **Action Items ✅**. Markdown format with emojis. Transcript: ${text}`,
  });
  return response.text;
};

export const researchTopic = async (query: string) => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Research the following topic comprehensively. Cite sources. Use bold headers and emojis. Topic: ${query}`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const text = response.text;
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map(c => c.web?.uri)
    .filter((uri): uri is string => !!uri) || [];

  return { text, sources };
};

export const summarizeContent = async (text: string) => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Condense the following text into key bullet points with emojis. Text: ${text}`,
  });
  return response.text;
};

export const generateQuiz = async (content: string) => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Create a set of 5-10 Flashcards/Quiz questions based on the provided text.
    Return ONLY a raw JSON array. Do not wrap in markdown code blocks.
    Format: [{"question": "...", "answer": "..."}]
    
    Text: ${content}`,
  });
  
  // Clean up if model adds markdown blocks despite instructions
  let cleanText = response.text.trim();
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/^```/, '').replace(/```$/, '');
  }
  
  return JSON.parse(cleanText);
};