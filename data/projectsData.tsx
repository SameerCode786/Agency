
import React from 'react';
import { 
    WordPressIcon, 
    ReactIcon,
    JsIcon,
    SupabaseIcon,
    CodeIcon,
    CssIcon,
    ElementorIcon,
    ShoppingCartIcon,
    DatabaseIcon,
    ApiIcon,
    HtmlIcon,
    SearchIcon,
    FigmaIcon,
    TailwindIcon,
    ExpoIcon
} from '../components/Icons';

export interface ProjectData {
    id: number;
    title: string;
    category: string;
    description: string;
    image1: string; // Main Thumbnail
    image2: string; // Hover Thumbnail
    tools: string[]; // Keys for icons
    role: string;
    timeline: string;
    fullImage: string; // For the popup scrolling view
    goals?: string[]; 
    link?: string; 
}

// Helper to map string tool names to actual Icon components
export const getToolIcon = (tool: string, className: string = "w-5 h-5") => {
    switch (tool.toLowerCase()) {
        case 'wordpress': return <WordPressIcon className={`${className} text-blue-400`} />;
        case 'elementor': return <ElementorIcon className={`${className} text-pink-500`} />;
        case 'seo': return <SearchIcon className={`${className} text-cyan-400`} />;
        case 'css': return <CssIcon className={`${className} text-blue-300`} />;
        case 'react': return <ReactIcon className={`${className} text-cyan-400`} />;
        case 'javascript':
        case 'js': return <JsIcon className={`${className} text-yellow-400`} />;
        case 'supabase': return <SupabaseIcon className={`${className} text-green-400`} />;
        case 'html': return <HtmlIcon className={`${className} text-orange-500`} />;
        case 'figma': return <FigmaIcon className={`${className} text-purple-400`} />;
        case 'tailwind': return <TailwindIcon className={`${className} text-cyan-300`} />;
        case 'shopping-cart':
        case 'woocommerce': return <ShoppingCartIcon className={`${className} text-purple-400`} />;
        case 'database':
        case 'mongodb': return <DatabaseIcon className={`${className} text-green-500`} />;
        case 'api': return <ApiIcon className={`${className} text-white`} />;
        case 'node': return <CodeIcon className={`${className} text-green-600`} />;
        case 'expo': return <ExpoIcon className={`${className} text-white`} />;
        default: return <CodeIcon className={className} />;
    }
};

export const ALL_PROJECTS: ProjectData[] = [
    {
        id: 1,
        title: "Eagle Eyes Tech",
        category: "Tech Solutions & Security",
        description: "A high-performance business website for Eagle Eyes Tech, designed to showcase advanced technology solutions with a professional, authoritative digital presence. This project highlights Sameer Digital Lab's ability to deliver a complex, fully optimized site in record-breaking time.",
        image1: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1766381934/sameer_dev_mu6abq.jpg",
        image2: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1766381934/sameer_dev_mu6abq.jpg",
        tools: ['wordpress', 'elementor', 'seo', 'css'],
        role: "Lead Developer",
        timeline: "1 Day Development",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1766382005/screencapture-eagleeyestech-online-2025-12-22-10_39_12_qnbslw.png",
        link: "https://eagleeyestech.online/",
        goals: [
            "Establish a robust and trustworthy online identity for a specialized technology firm.",
            "Complete a full-scale, responsive build within a 24-hour rapid development sprint.",
            "Optimize for search engines (SEO) to ensure immediate digital visibility.",
            "Implement high-end CSS styling to reflect a modern, secure technical aesthetic."
        ]
    },
    {
        id: 5,
        title: "Rootex",
        category: "Logistics & Global Solutions",
        description: "A premium digital platform for Rootex, designed to modernize global logistics communications. This project utilizes custom CSS and advanced WordPress architecture to provide a seamless, high-speed interface for international service management.",
        image1: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1768558246/screencapture-rootex-online-2026-01-16-15_07_58_qqgnof.png",
        image2: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1768558246/screencapture-rootex-online-2026-01-16-15_07_58_qqgnof.png",
        tools: ['wordpress', 'elementor', 'css'],
        role: "Full Stack Developer",
        timeline: "3 Days Rapid Build",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1768558246/screencapture-rootex-online-2026-01-16-15_07_58_qqgnof.png",
        link: "https://rootex.online/",
        goals: [
            "Modernize the digital face of global logistics services.",
            "Implement a high-performance WordPress architecture with custom CSS elements.",
            "Ensure pixel-perfect responsiveness across all devices using Elementor.",
            "Optimize site architecture for lightning-fast user engagement and tracking."
        ]
    },
    {
        id: 6,
        title: "Online Istikhara",
        category: "Consultation Services",
        description: "A comprehensive digital platform engineered to provide seamless spiritual consultation services. Built with a focus on user trust and accessibility, this project features a clean, professional layout optimized for rapid response and client engagement.",
        image1: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1768558875/screencapture-onlineistikharasite-2026-01-16-15_20_24_y4hmsm.png",
        image2: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1768558875/screencapture-onlineistikharasite-2026-01-16-15_20_24_y4hmsm.png",
        tools: ['wordpress', 'elementor', 'css'],
        role: "Full Stack Developer",
        timeline: "4 Days Rapid Build",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1768558875/screencapture-onlineistikharasite-2026-01-16-15_20_24_y4hmsm.png",
        link: "https://onlineistikharasite.com/",
        goals: [
            "Create a respectful and trustworthy digital environment for consultation services.",
            "Deliver a fully functional, mobile-responsive site within a strict 4-day deadline.",
            "Implement custom CSS for a unique, professional aesthetic.",
            "Streamline user interactions to ensure ease of navigation and service accessibility."
        ]
    },
    {
        id: 2,
        title: "Weversity.org",
        category: "Free Education / EdTech",
        description: "Weversity is a transformative free learning platform built to democratize education. Developed within a rigorous 4-week challenge, this project leverages the power of WordPress and Elementor to deliver a seamless, accessible, and high-quality learning experience for everyone.",
        image1: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1765470774/weversity_portfolio_gmnt44.jpg",
        image2: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1765470774/weversity_portfolio_gmnt44.jpg",
        tools: ['wordpress', 'elementor', 'css', 'shopping-cart'],
        role: "WordPress Developer",
        timeline: "4 Weeks Challenge",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1765470870/screencapture-weversity-org-2025-11-30-22_34_09_xfle0e.png",
        link: "https://weversity.org/",
        goals: [
            "Provide 100% free, high-quality education to underprivileged students worldwide.",
            "Create a lightweight, accessible interface that works seamlessly on low-bandwidth devices.",
            "Empower the youth with practical digital skills to achieve financial independence.",
            "Bridge the gap between traditional academic learning and modern industry demands."
        ]
    },
    {
        id: 3,
        title: "AP Nusamas",
        category: "Recruitment Agency",
        description: "A premier recruitment agency website based in Malaysia (Agensi Pekerjaan Nusamas), architected to bridge the gap between global talent and industry opportunities. This project showcases an elite agency-standard digital interface, engineered for trust, performance, and high-speed recruitment workflows.",
        image1: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1767597406/appnsumans_tqd3md.jpg",
        image2: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1767597406/appnsumans_tqd3md.jpg",
        tools: ['wordpress', 'elementor', 'css'],
        role: "Full Stack Developer",
        timeline: "5 Days Rapid Build",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1767597732/app_nsuman_complete_image_pn13wx.png",
        link: "https://apnusamas.com/",
        goals: [
            "Establish the leading digital identity for a licensed Malaysian recruitment firm.",
            "Execute a high-end agency build within a tight 5-day development window.",
            "Ensure a flawless, corporate aesthetic that balances professionalism with modern UI.",
            "Optimize site architecture for seamless candidate submissions and employer inquiries."
        ]
    },
    {
        id: 4,
        title: "Legal Light Law",
        category: "Legal Services",
        description: "A professional and authoritative website for Legal Light Law, designed to instill trust and accessibility for clients seeking legal counsel. The site features a clean layout, easy navigation for practice areas, and clear calls to action for consultation bookings.",
        image1: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1766381484/NEw_work_sameer_mygmkj.jpg",
        image2: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1766381484/NEw_work_sameer_mygmkj.jpg",
        tools: ['wordpress', 'elementor', 'css'],
        role: "Web Developer",
        timeline: "4 Weeks",
        fullImage: "https://res.cloudinary.com/dow2sbjsp/image/upload/v1765819763/screencapture-legallightlaw-2025-11-30-22_36_04_tuntfm.png",
        link: "https://legallightlaw.com/",
        goals: [
            "Create a trustworthy online presence for legal services.",
            "Simplify the process for clients to find practice areas and contact attorneys.",
            "Ensure a responsive and accessible design for all users.",
            "Implement a professional aesthetic that reflects the firm's values."
        ]
    }
];
