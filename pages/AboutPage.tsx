
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useSeoContent } from '../hooks/useSeoContent';


const skillsData = [
  { name: 'React', level: 95 },
  { name: 'Node.js', level: 90 },
  { name: 'UI/UX', level: 92 },
  { name: 'Mobile', level: 85 },
  { name: 'DevOps', level: 75 },
];

const experienceData = [
    { year: '2018', role: 'Freelance Developer', desc: 'Started the journey, building websites for small businesses and honing my skills in web technologies.' },
    { year: '2020', role: 'Frontend Engineer @ Tech Startup', desc: 'Joined a fast-paced startup, contributing to a large-scale React application and learning agile methodologies.' },
    { year: '2022', role: 'Senior Developer & Team Lead', desc: 'Led a team of developers, mentoring junior members and architecting complex front-end systems.' },
    { year: '2024', role: 'Founded SameerCodes Studios', desc: 'Launched the agency to provide premium digital solutions, combining technical expertise with creative vision.' },
]

const AboutPage: React.FC = () => {
    const { title, description } = useSeoContent('About');
  return (
    <PageWrapper>
      <title>{title}</title>
      <meta name="description" content={description} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36">
        <div className="text-center mb-16">
          <AnimatedHeading text="About SameerCodes Studios" className="text-4xl md:text-6xl font-bold mb-4" />
          <p className="max-w-3xl mx-auto text-gray-400 text-lg">
            A fusion of passion, code, and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <img src="https://picsum.photos/seed/about/600/700" alt="About Sameer" className="rounded-lg shadow-2xl shadow-cyan-500/20"/>
            </motion.div>
            <motion.div 
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                <h2 className="text-3xl font-bold text-white mb-4">The Mind Behind the Magic</h2>
                <p className="text-gray-400 mb-4">
                    Hi, I'm Sameer, the founder of SameerCodes Studios. With over a decade of experience in the digital landscape, I've cultivated a deep passion for building exceptional websites and applications. My journey has taken me from freelance projects to leading teams at innovative startups, always with one goal in mind: to leverage technology to create meaningful and impactful digital experiences.
                </p>
                <p className="text-gray-400">
                    SameerCodes Studios is the culmination of this journey—a place where technical excellence meets creative design. We believe in collaboration, transparency, and pushing the boundaries of what's possible on the web.
                </p>
            </motion.div>
        </div>

        <div className="my-24">
            <AnimatedHeading text="Our Expertise" className="text-4xl font-bold text-center mb-12" />
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillsData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="#9ca3af" tick={{ fill: '#d1d5db' }} />
                        <Tooltip cursor={{fill: 'rgba(34, 211, 238, 0.1)'}} contentStyle={{backgroundColor: '#1f2937', border: '1px solid #374151'}} />
                        <Bar dataKey="level" fill="url(#colorUv)" barSize={30}>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.8}/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>

        <div className="my-24">
            <AnimatedHeading text="Our Journey" className="text-4xl font-bold text-center mb-16" />
            <div className="relative">
                <div className="absolute left-1/2 w-0.5 h-full bg-gray-700 hidden md:block"></div>
                {experienceData.map((item, index) => (
                    <motion.div 
                        key={index}
                        className="mb-8 flex justify-between items-center w-full"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="hidden md:block w-5/12"></div>
                        <div className="z-10 flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50">
                            
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 w-full md:w-5/12">
                            <p className="font-bold text-cyan-400 mb-1">{item.year} - {item.role}</p>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </PageWrapper>
  );
};

export default AboutPage;
