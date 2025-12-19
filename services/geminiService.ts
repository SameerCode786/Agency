
import { GoogleGenAI, Type } from "@google/genai";

interface SeoContent {
    title: string;
    description: string;
}

interface BlogPostData {
    title: string;
    excerpt: string;
    content: string; // HTML
    imageKeywords: string; // Changed from imagePrompt to strictly keywords for real stock photos
    category: string;
}

// New Interface for Website Architect
export interface WebsitePlan {
    projectName: string;
    tagline: string;
    summary: string;
    colorPalette: string[];
    typography: string;
    pages: {
        name: string;
        content: string;
        features: string[];
    }[];
    visualPrompt: string; // Prompt for the image generator
}

export const generateSeoContent = async (pageName: string): Promise<SeoContent> => {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ 
                    title: `Sameer Digital Lab | ${pageName}`, 
                    description: `Premium digital services for ${pageName}. Web development, mobile apps, and SEO.` 
                });
            }, 500);
        });
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
        const prompt = `Generate a premium, SEO-friendly meta title (max 60 chars) and meta description (max 160 chars) for the '${pageName}' page of a futuristic, high-end digital agency called 'Sameer Digital Lab'. The tone should be professional, innovative, and authoritative.`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                    },
                    required: ['title', 'description'],
                },
            }
        });

        if (response.text) {
            const cleanText = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
            const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
            const finalJson = jsonMatch ? jsonMatch[0] : cleanText;
            return JSON.parse(finalJson);
        }
        throw new Error("No response from AI");

    } catch (error) {
        console.error("SEO Gen Error:", error);
        return { 
            title: `Sameer Digital Lab | ${pageName}`, 
            description: `Leading digital agency for ${pageName}.` 
        };
    }
};

export const generateTrendingTopic = async (category: string): Promise<string> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return `The Future of ${category} in 2025`;

    const ai = new GoogleGenAI({ apiKey });
    const today = new Date().toDateString();

    const prompt = `
        Generate ONE unique, trending, and specific blog post title for the industry: "${category}".
        Context: Today is ${today}.
        Requirements:
        - Do NOT use generic titles.
        - Focus on a specific niche, a recent tech update, or professional advice.
        - Return ONLY the title string.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text?.trim() || `${category} Trends`;
    } catch (e) {
        return `Latest Innovations in ${category}`;
    }
};

export const generateBlogPost = async (topic?: string, category: string = "Technology"): Promise<BlogPostData> => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return {
            title: topic || "Digital Strategy Essentials",
            excerpt: "Key insights for growing your digital presence effectively.",
            content: `<p>Please set your API_KEY to generate real content.</p>`,
            imageKeywords: "modern office technology",
            category: category
        };
    }

    const ai = new GoogleGenAI({ apiKey });
    const userTopic = topic || "Current trends in digital transformation";

    const systemInstruction = `
        You are a senior technical writer for 'Sameer Digital Lab'.
        You are ONLY a CONTENT & SEO ENGINE.
        
        CRITICAL IMAGE RULES:
        1. You are NOT allowed to generate, create, describe, or mention AI-generated images.
        2. You do NOT have permission to generate image prompts for AI tools.
        3. ONLY suggest 3-5 specific REAL stock photography search keywords.
        4. Focus on high-end editorial, professional, or architectural photography.
        5. Keywords should be compatible with Unsplash, Pexels, or Pixabay.
        
        CONTENT RULES:
        1. Title: Click-worthy, SEO-rich.
        2. Excerpt: Compelling summary (max 25 words).
        3. Content: Strictly semantic HTML (<h2>, <h3>, <p>, <ul>, <li>, <strong>). NO <h1>.
        4. Focus on real-world business growth and technical authority.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `Write a high-quality blog post about: "${userTopic}". Category: ${category}.`,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        excerpt: { type: Type.STRING },
                        content: { type: Type.STRING },
                        imageKeywords: { type: Type.STRING, description: "3-5 search keywords for real stock photography only. No AI descriptions." },
                        category: { type: Type.STRING }
                    },
                    required: ['title', 'excerpt', 'content', 'imageKeywords', 'category'],
                },
            }
        });

        if (response.text) {
            const cleanText = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
            const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
            const finalJson = jsonMatch ? jsonMatch[0] : cleanText;
            return JSON.parse(finalJson);
        }
        throw new Error("Empty response from Gemini");
    } catch (error) {
        console.error("Blog Gen Error:", error);
        throw error;
    }
};

export const generateWebsitePlan = async (userPrompt: string): Promise<WebsitePlan> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key Missing");
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `
        You are a World-Class UI/UX Architect.
        Analyze the request and return a JSON blueprint for a website.
        User Prompt: "${userPrompt}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: systemPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        projectName: { type: Type.STRING },
                        tagline: { type: Type.STRING },
                        summary: { type: Type.STRING },
                        colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
                        typography: { type: Type.STRING },
                        pages: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    content: { type: Type.STRING },
                                    features: { type: Type.ARRAY, items: { type: Type.STRING } }
                                },
                                required: ['name', 'content', 'features']
                            }
                        },
                        visualPrompt: { type: Type.STRING }
                    },
                    required: ['projectName', 'pages', 'colorPalette', 'visualPrompt', 'summary', 'tagline', 'typography']
                },
            }
        });

        if (response.text) {
            const cleanText = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
            const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
            const finalJson = jsonMatch ? jsonMatch[0] : cleanText;
            return JSON.parse(finalJson);
        }
        throw new Error("No response from AI Architect");
    } catch (error) {
        console.error("Architect Error:", error);
        throw error;
    }
};
