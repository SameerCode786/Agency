
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
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

    return (
        <motion.div
            className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-[9999]"
            style={{
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};

export default CustomCursor;
