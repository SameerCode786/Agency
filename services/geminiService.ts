import { GoogleGenAI, Type } from "@google/genai";

interface SeoContent {
    title: string;
    description: string;
}

interface BlogPostData {
    title: string;
    excerpt: string;
    content: string; // HTML
    imageKeywords: string; 
    category: string;
}

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
    visualPrompt: string; 
}

export const generateSeoContent = async (pageName: string): Promise<SeoContent> => {
    // Initialize inside the function to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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

        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("SEO Gen Error:", error);
        return { 
            title: `Sameer Digital Lab | ${pageName}`, 
            description: `Leading digital agency for ${pageName}.` 
        };
    }
};

export const generateBlogPost = async (topic?: string, category: string = "Technology"): Promise<BlogPostData> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const userTopic = topic || "Current trends in digital transformation";

    const systemInstruction = `
        You are a senior technical writer for 'Sameer Digital Lab'.
        You are ONLY a CONTENT & SEO ENGINE.
        
        CRITICAL IMAGE RULES:
        1. Suggest 3-5 specific REAL stock photography search keywords.
        2. Focus on high-end editorial, professional, or architectural photography.
        3. Keywords should be compatible with Unsplash or Pexels.
        
        CONTENT RULES:
        1. Title: Click-worthy, SEO-rich.
        2. Excerpt: Compelling summary (max 25 words).
        3. Content: Strictly semantic HTML (<h2>, <h3>, <p>, <ul>, <li>, <strong>). NO <h1>.
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
                        imageKeywords: { type: Type.STRING },
                        category: { type: Type.STRING }
                    },
                    required: ['title', 'excerpt', 'content', 'imageKeywords', 'category'],
                },
            }
        });

        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("Blog Gen Error:", error);
        throw error;
    }
};

/**
 * MULTI-AGENT AI SYSTEM - SEQUENTIAL WORKFLOW
 * Orchestrates 5 distinct agent personas to generate production-ready SEO content.
 */
export const generateAutomatedBlog = async (lastCategory?: string): Promise<any> => {
    // Critical: Initialize here to use the latest API key from the environment
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `
        You are the 'Sameer Digital Lab' Multi-Agent Automation Orchestrator. 
        You must execute a sequential workflow involving 5 specific agents.

        SEQUENTIAL AGENT PROTOCOL:
        1. [Strategist Agent]: Analyze trending tech/business topics. Select a topic that bridges innovation and business growth.
        2. [SEO Specialist Agent]: Define the primary keyword, target slug, and ensure the structure follows Google's E-E-A-T guidelines.
        3. [Researcher Agent]: Source 3-5 high-end stock photography keywords for Unsplash (professional, architectural, futuristic).
        4. [Expert Writer Agent]: Draft a 1200+ word authority-building article using ONLY semantic HTML (h2, h3, p, ul, strong).
        5. [Quality Control Agent]: Verify HTML syntax, check tone consistency (Futuristic/Premium), and validate SEO density.

        ROTATION: Web Development -> WordPress -> SEO -> Shopify -> App Development -> Digital Growth.
        The last published category was: ${lastCategory || 'None'}.

        OUTPUT REQUIREMENTS:
        - Return strictly valid JSON.
        - Tone: professional, authoritative, innovative.
        - Language: English.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: "Execute full agentic workflow sequence for today's automated article.",
            config: {
                systemInstruction,
                thinkingConfig: { thinkingBudget: 4000 },
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        category: { type: Type.STRING, description: "The finalized niche category" },
                        title: { type: Type.STRING, description: "SEO title under 60 chars" },
                        excerpt: { type: Type.STRING, description: "Compelling summary for cards" },
                        slug: { type: Type.STRING, description: "URL friendly slug" },
                        content: { type: Type.STRING, description: "The full HTML content of the post" },
                        primary_keyword: { type: Type.STRING, description: "The main keyword used for SEO" },
                        stock_keywords: { type: Type.STRING, description: "Researcher keywords for images" }
                    },
                    required: ['category', 'title', 'excerpt', 'slug', 'content', 'primary_keyword', 'stock_keywords']
                }
            }
        });

        if (!response.text) throw new Error("Agentic Workflow returned no data.");
        return JSON.parse(response.text);
    } catch (error: any) {
        console.error("Multi-Agent Critical Failure:", error);
        throw new Error(error.message || "The Multi-Agent workflow failed to initialize.");
    }
};

export const generateWebsitePlan = async (userPrompt: string): Promise<WebsitePlan> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemPrompt = `Analyze the request and return a JSON blueprint for a website. User Prompt: "${userPrompt}"`;

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

        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("Architect Error:", error);
        throw error;
    }
};