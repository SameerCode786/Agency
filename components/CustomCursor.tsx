
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from './Icons';

// Define the context shape
interface CursorContextType {
    setCursorVariant: (variant: 'default' | 'view-more') => void;
    setCursorText: (text: string) => void;
}

// Create Context
const CursorContext = createContext<CursorContextType>({
    setCursorVariant: () => {},
    setCursorText: () => {},
});

// Hook to use the context
export const useCursor = () => useContext(CursorContext);

// Provider Component
export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cursorVariant, setCursorVariant] = useState<'default' | 'view-more'>('default');
    const [cursorText, setCursorText] = useState<string>('');

    return (
        <CursorContext.Provider value={{ setCursorVariant, setCursorText }}>
            {children}
            <CustomCursor variant={cursorVariant} text={cursorText} />
        </CursorContext.Provider>
    );
};

interface CustomCursorProps {
    variant: 'default' | 'view-more';
    text: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ variant, text }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);
    
    // Hide cursor on small screens
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    const variants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: "transparent",
            border: "2px solid #22d3ee", // cyan-400
            mixBlendMode: "normal" as any,
        },
        "view-more": {
            height: 100,
            width: 100,
            backgroundColor: "#22d3ee",
            border: "0px solid transparent",
            mixBlendMode: "difference" as any, // Cool effect over images
        }
    };

    return (
        <motion.div
            className="hidden md:flex fixed top-0 left-0 rounded-full pointer-events-none z-[9999] items-center justify-center overflow-hidden"
            style={{
                translateX: '-50%',
                translateY: '-50%',
                x: position.x,
                y: position.y,
            }}
            variants={variants}
            animate={variant}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
            <AnimatePresence>
                {variant === 'view-more' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex flex-col items-center justify-center text-black font-bold text-xs uppercase tracking-widest text-center"
                    >
                        <span>{text || "View"}</span>
                        <ArrowRightIcon className="w-4 h-4 mt-1 rotate-[-45deg]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CustomCursor;
