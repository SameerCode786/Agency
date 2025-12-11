
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

    const userTopic = topic || "The latest trends in Web Development and AI for Business Growth";

    const prompt = `
        You are a senior content writer for 'Sameer Digital Lab', a premium web and mobile app development agency.
        Write a high-quality, SEO-optimized blog post about: "${userTopic}".
        Category context: ${category}.

        Requirements:
        1. Title: Catchy, professional, and SEO-optimized.
        2. Excerpt: A compelling summary (2 sentences).
        3. Content: detailed, educational, and professional. Use HTML formatting (<h2>, <p>, <ul>, <li>, <strong>). Do NOT use <h1> or <html> tags. Include 3 key takeaways.
        4. ImagePrompt: A detailed, artistic text description to generate a futuristic, cinematic, high-definition 4k wallpaper-style image representing this blog topic. (e.g. "Cyberpunk city with neon code, 4k, cinematic lighting").

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
