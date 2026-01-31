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
 * MULTI-AGENT AI SYSTEM
 * Refactored to use Thinking Budget and JSON Schema for reliable automation
 */
export const generateAutomatedBlog = async (lastCategory?: string): Promise<any> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `
        You are a MULTI-AGENT AI WORKFLOW SYSTEM operating as the primary Content Engine for 'Sameer Digital Lab'.
        
        YOUR WORKFLOW AGENTS:
        1. Content Strategist: Analyze trending digital transformation topics and select a high-impact subject.
        2. SEO Specialist: Architect primary keywords, URL slugs, and semantic header structures.
        3. Stock Image Researcher: Defining high-end visual prompts for real stock photography sourcing.
        4. Expert Technical Writer: Drafting a comprehensive, authority-driven 1200+ word article in semantic HTML.
        5. Quality Control: Final validation for HTML accuracy, SEO compliance, and agency brand voice.

        ROTATION CATEGORIES: Web Development -> WordPress -> SEO -> Shopify -> App Development -> Digital Growth.
        Previous article category was: ${lastCategory || 'None'}. Please select the next appropriate category or a trending sub-topic.

        OUTPUT REQUIREMENTS:
        - Return strictly valid JSON matching the provided schema.
        - Content MUST be strictly semantic HTML (using <h2>, <h3>, <p>, <ul>, <li>).
        - Use a professional, futuristic, and authoritative tone.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: "Trigger full Multi-Agent daily blog automation sequence.",
            config: {
                systemInstruction,
                thinkingConfig: { thinkingBudget: 4000 },
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        category: { type: Type.STRING },
                        title: { type: Type.STRING },
                        excerpt: { type: Type.STRING },
                        slug: { type: Type.STRING },
                        content: { type: Type.STRING },
                        primary_keyword: { type: Type.STRING },
                    },
                    required: ['category', 'title', 'excerpt', 'slug', 'content', 'primary_keyword']
                }
            }
        });

        if (!response.text) throw new Error("Agentic Workflow returned an empty response.");
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Multi-Agent Workflow Execution Failure:", error);
        throw error;
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