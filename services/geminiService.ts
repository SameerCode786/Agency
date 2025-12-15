
import { GoogleGenAI, Type } from "@google/genai";

interface SeoContent {
    title: string;
    description: string;
}

interface BlogPostData {
    title: string;
    excerpt: string;
    content: string; // HTML
    imagePrompt: string;
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
    // Using the environment variable API Key
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
        console.warn("Gemini API Key missing. Using mock SEO data.");
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
            model: 'gemini-2.5-flash',
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
            return JSON.parse(response.text);
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

/**
 * Generates a fresh, trending topic idea to avoid repetition.
 */
export const generateTrendingTopic = async (category: string): Promise<string> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return `The Future of ${category} in 2025`;

    const ai = new GoogleGenAI({ apiKey });
    
    // Get current date to force freshness
    const today = new Date().toDateString();

    const prompt = `
        Generate ONE unique, trending, and specific blog post title for the industry: "${category}".
        Context: Today is ${today}.
        Requirements:
        - Do NOT use generic titles like "Introduction to ${category}".
        - Focus on a specific niche, a recent controversy, a new technology update, or a contrarian viewpoint.
        - Example topics: "Why React Server Components are changing SEO", "The hidden cost of low-code platforms", "AI Ethics in 2025".
        - Return ONLY the title string.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text?.trim() || `${category} Trends`;
    } catch (e) {
        return `Latest Innovations in ${category}`;
    }
};

/**
 * Generates a full blog post including HTML content and an image prompt.
 */
export const generateBlogPost = async (topic?: string, category: string = "Technology"): Promise<BlogPostData> => {
    // Using the environment variable API Key
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        console.warn("API Key Missing. Returning mock blog post.");
        // Fallback mock data to prevent app crash when key is missing
        return {
            title: topic || "The Future of Digital Innovation",
            excerpt: "Explore how innovative technologies are reshaping the digital landscape. (Mock Data)",
            content: `
                <p class="lead">In an era defined by rapid technological advancement, businesses must adapt to survive. This article explores the key trends shaping our digital future.</p>
                <h2>Embracing Change</h2>
                <p>From Artificial Intelligence to decentralized networks, the tools at our disposal are more powerful than ever. However, with great power comes the need for strategic implementation.</p>
                <h3>Key Strategies</h3>
                <ul>
                    <li><strong>Data-Driven Decisions:</strong> leveraging analytics to guide growth.</li>
                    <li><strong>User-Centric Design:</strong> creating experiences that resonate.</li>
                    <li><strong>Scalable Architecture:</strong> building systems that grow with you.</li>
                </ul>
                <p><em>Note: This content is a placeholder generated because the Gemini API Key is missing. To generate real AI content, please ensure the API_KEY environment variable is set.</em></p>
            `,
            imagePrompt: "Futuristic digital abstract art with neon lights",
            category: category
        };
    }

    const ai = new GoogleGenAI({ apiKey });

    // Use specific topic or fallback
    const userTopic = topic || "The latest trends in Web Development and AI for Business Growth";

    const prompt = `
        You are a senior technical writer for 'Sameer Digital Lab', a premium web agency.
        Write a high-quality, SEO-OPTIMIZED blog post about: "${userTopic}".
        Category: ${category}.

        Requirements:
        1. Title: Create a click-worthy, SEO-rich title based on the topic.
        2. Excerpt: A compelling summary (max 25 words) that hooks the reader.
        3. Content: 
           - Use strictly semantic HTML (<h2>, <h3>, <p>, <ul>, <li>, <strong>). 
           - NO <h1> or <html> tags.
           - Include at least 3 distinct sections (Introduction, Deep Dive, Conclusion).
           - Focus on real-world application, industry stats, or professional advice.
           - Tone: Professional, insightful, and slightly futuristic.
        4. ImagePrompt: Write a prompt for an AI image generator to create a "Photorealistic, Cinematic, 4K" header image. 
           - Avoid "cartoon", "illustration", or "abstract" terms unless the topic requires it.
           - Focus on "office settings", "technology hardware", "people working", or "high-end editorial photography".
           - Example: "Cinematic shot of a developer working on code in a modern glass office, night time, city lights bokeh, 8k resolution, photorealistic."

        Return JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        excerpt: { type: Type.STRING },
                        content: { type: Type.STRING },
                        imagePrompt: { type: Type.STRING },
                        category: { type: Type.STRING }
                    },
                    required: ['title', 'excerpt', 'content', 'imagePrompt', 'category'],
                },
            }
        });

        if (response.text) {
            return JSON.parse(response.text);
        }
        throw new Error("Empty response from Gemini");

    } catch (error) {
        console.error("Blog Gen Error:", error);
        throw error;
    }
};

/**
 * AI WEBSITE ARCHITECT
 * Generates a full structure plan based on a user prompt.
 */
export const generateWebsitePlan = async (userPrompt: string): Promise<WebsitePlan> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key Missing");

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `
        You are a World-Class UI/UX Architect and Web Strategy Consultant.
        The user will give you a rough idea for a website (e.g., "A modern dental clinic with blue colors").
        Your job is to create a comprehensive "Website Blueprint".

        Analyze the request and return a JSON object with:
        1. projectName: A creative, catchy name for the project.
        2. tagline: A short, punchy marketing tagline.
        3. summary: A professional summary of the site's goal and aesthetic.
        4. colorPalette: An array of 5 HEX color codes that match the requested vibe (or smart defaults).
        5. typography: A suggestion for fonts (e.g., "Inter for headings, Roboto for body").
        6. pages: An array of page objects. Each page must have:
           - name: e.g., "Home", "About", "Services".
           - content: A brief description of what goes on this page.
           - features: An array of specific UI elements (e.g., "Booking Form", "Hero Video", "Team Grid").
        7. visualPrompt: A highly detailed, descriptive prompt to generate a UI MOCKUP image of the Homepage. 
           - Include details like "glassmorphism", "clean layout", specific colors, "high quality", "dribbble style", "4k render".
           - NO text inside the image prompt (e.g. don't say "text saying Hello"), focus on layout and visuals.

        User Prompt: "${userPrompt}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
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
            return JSON.parse(response.text);
        }
        throw new Error("No response from AI Architect");

    } catch (error) {
        console.error("Architect Error:", error);
        throw error;
    }
};
