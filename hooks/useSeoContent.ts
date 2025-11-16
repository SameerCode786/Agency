
import { useState, useEffect } from 'react';
import { generateSeoContent } from '../services/geminiService';

interface SeoContent {
    title: string;
    description: string;
}

export const useSeoContent = (pageName: string) => {
    const [content, setContent] = useState<SeoContent>({
        title: `Sameer Digital Lab | ${pageName}`,
        description: 'Loading content...',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            const seoData = await generateSeoContent(pageName);
            setContent(seoData);
            setLoading(false);
        };

        fetchContent();
    }, [pageName]);

    return { ...content, loading };
};