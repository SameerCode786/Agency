
import { GoogleGenAI, Type } from "@google/genai";

// IMPORTANT: This service is designed to use the Gemini API.
// For this app to be fully functional, an API_KEY environment variable must be provided.
// The code below includes a mock implementation for demonstration purposes.

// To use the actual API, you would initialize the client like this:
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface SeoContent {
    title: string;
    description: string;
}

// Mock data to simulate Gemini API responses
const mockSeoData: Record<string, SeoContent> = {
    Home: {
        title: "Sameer Digital Lab | Premium Digital Agency",
        description: "Sameer Digital Lab is a world-class creative digital agency specializing in web development, mobile apps, and UI/UX design. We build futuristic, high-performance digital experiences.",
    },
    Services: {
        title: "Our Services | Sameer Digital Lab",
        description: "Explore our services: Web & Mobile App Development, UI/UX Design, Speed Optimization, Maintenance, and Digital Strategy. We provide end-to-end solutions for your digital needs.",
    },
    Portfolio: {
        title: "Portfolio | Sameer Digital Lab",
        description: "Browse our portfolio of innovative projects. See how we've helped businesses achieve their goals with our expertise in web, mobile, and design.",
    },
    About: {
        title: "About Us | Sameer Digital Lab",
        description: "Learn about Sameer Digital Lab's journey, expertise, and the creative minds behind our success. We are passionate about code, creativity, and client success.",
    },
    Blog: {
        title: "Blog | Sameer Digital Lab",
        description: "Read our blog for insights on the latest trends in web development, design, and digital strategy. Stay informed with expert analysis from Sameer Digital Lab.",
    },
    Contact: {
        title: "Contact Us | Sameer Digital Lab",
        description: "Get in touch with Sameer Digital Lab. Let's discuss your project and how we can help you build something amazing. Contact us for a free quote.",
    },
};


export const generateSeoContent = async (pageName: string): Promise<SeoContent> => {
    // This is a mock implementation.
    // In a real application, you would make an API call to Gemini here.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockSeoData[pageName] || { title: "Sameer Digital Lab", description: "Premium Digital Agency." });
        }, 200); // Simulate network delay
    });

    /*
    // REAL IMPLEMENTATION EXAMPLE:
    try {
        if (!process.env.API_KEY) {
            console.warn("API_KEY not found. Using mock data.");
            return mockSeoData[pageName];
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Generate an SEO-friendly title and meta description for the '${pageName}' page of a futuristic digital agency called 'Sameer Digital Lab'. Return the result as a JSON object with keys "title" and "description". The tone should be professional, modern, and premium.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                // Fix: Add responseSchema for robust JSON output, following best practices.
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    title: {
                      type: Type.STRING,
                      description: 'SEO-friendly title for the page.',
                    },
                    description: {
                      type: Type.STRING,
                      description: 'SEO-friendly meta description for the page.',
                    },
                  },
                  required: ['title', 'description'],
                },
            }
        });

        const text = response.text.trim();
        const jsonResponse = JSON.parse(text);
        
        return {
            title: jsonResponse.title,
            description: jsonResponse.description
        };

    } catch (error) {
        console.error(`Error fetching SEO content for ${pageName}:`, error);
        // Fallback to mock data on error
        return mockSeoData[pageName];
    }
    */
};
