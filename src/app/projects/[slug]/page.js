"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectDetails({ params }) {
  const [project, setProject] = useState(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getParams = async () => {
      const resolvedParams = await params;
      const slug = resolvedParams.slug;
      const foundProject = projects.find(p => p.slug === slug);
      if (!foundProject) {
        notFound();
      } else {
        setProject(foundProject);
      }
    };
    getParams();
  }, [params]);

  if (!project) return null;

  const nextImage = () => setCurrentImageIdx((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setCurrentImageIdx((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <div className="min-h-screen bg-[#050B14] text-white selection:bg-[var(--color-secondary)] selection:text-[#050B14]">
      {/* Dynamic Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/#portfolio" className="inline-flex items-center gap-3 text-white hover:text-[var(--color-secondary)] transition-colors font-bold text-sm tracking-widest uppercase">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Work
        </Link>
      </nav>

      {/* Hero Section: Modern Split / Massive Typography */}
      <div className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center min-h-[60vh] md:min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 relative"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 md:mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">{project.category}</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-tight md:leading-[0.9] mb-6 md:mb-8 font-display-xl break-words">
            {project.title.split(' ').map((word, i) => (
              <span key={i} className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">{word}</span>
            ))}
          </h1>
          
          <p className="text-lg md:text-3xl text-white/60 font-light max-w-3xl leading-relaxed">
            {project.summary}
          </p>
        </motion.div>

        {/* Abstract Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-secondary)]/10 blur-[150px] rounded-full pointer-events-none"></div>
      </div>

      {/* Massive 4K Image Carousel with Modern Minimal Controls */}
      <div className="relative w-full h-[70vh] md:h-[90vh] bg-[#0B1526] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIdx}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={project.images[currentImageIdx]}
              alt={`${project.title} showcase`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>

        {/* Modern Minimal Controls */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-4 z-20">
          <button onClick={prevImage} className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] hover:text-black transition-all group/btn">
            <span className="material-symbols-outlined text-white group-hover/btn:text-black transition-transform group-hover/btn:-translate-x-1">west</span>
          </button>
          <button onClick={nextImage} className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] hover:text-black transition-all group/btn">
            <span className="material-symbols-outlined text-white group-hover/btn:text-black transition-transform group-hover/btn:translate-x-1">east</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
        
        {/* Metadata Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-20">
          {[
            { label: "Client", value: project.client },
            { label: "Role", value: project.role },
            { label: "Timeline", value: project.timeline },
            { label: "Live Project", value: <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-secondary)] hover:underline inline-flex items-center gap-1">Visit Site <span className="material-symbols-outlined text-sm">arrow_outward</span></a> }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-white/10 transition-colors">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 md:mb-3">{item.label}</p>
              <p className="text-base md:text-lg font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Core Case Study Bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Challenge */}
          <div className="md:col-span-7 bg-[#0f172a] rounded-[32px] md:rounded-[40px] p-8 md:p-14 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="material-symbols-outlined text-red-400 text-3xl md:text-4xl">warning</span>
              The Challenge
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light">
              {project.challenge}
            </p>
          </div>

          {/* Key Features */}
          <div className="md:col-span-5 bg-[var(--color-secondary)] text-[#050B14] rounded-[32px] md:rounded-[40px] p-8 md:p-14 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none"></div>
             <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
               <span className="material-symbols-outlined text-4xl">star</span>
               Key Features
             </h2>
             <ul className="space-y-4">
               {project.features.map((feature, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-lg font-medium">
                   <span className="material-symbols-outlined mt-1 text-xl">check_circle</span>
                   {feature}
                 </li>
               ))}
             </ul>
          </div>

          {/* Solution */}
          <div className="md:col-span-12 bg-white/5 rounded-[32px] md:rounded-[40px] p-8 md:p-16 border border-white/5 relative overflow-hidden mt-2">
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
            <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="material-symbols-outlined text-blue-400 text-4xl md:text-5xl">lightbulb</span>
              The Solution
            </h2>
            <p className="text-white/80 text-lg md:text-2xl leading-relaxed font-light max-w-4xl">
              {project.solution}
            </p>
          </div>

          {/* Impact */}
          {project.impact && (
            <div className="md:col-span-8 bg-gradient-to-br from-[#0a1121] to-[#12223a] rounded-[32px] md:rounded-[40px] p-8 md:p-14 border border-[var(--color-secondary)]/20 relative overflow-hidden mt-2 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/20 via-transparent to-transparent opacity-80 z-0"></div>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 flex items-center gap-3 md:gap-4 relative z-10">
                <span className="material-symbols-outlined text-[var(--color-secondary)] text-3xl md:text-4xl">trending_up</span>
                The Impact
              </h2>
              <p className="text-white text-lg md:text-xl leading-relaxed font-medium relative z-10">
                {project.impact}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <div className="md:col-span-4 bg-[#0a1121] rounded-[32px] md:rounded-[40px] p-8 md:p-14 border border-white/10 mt-2">
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2 md:gap-3 text-white/60">
              <span className="material-symbols-outlined">code_blocks</span>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {project.technologies.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-xs md:text-sm font-bold text-white tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Call to Action */}
      <div className="w-full py-32 bg-[var(--color-secondary)] text-[#050B14] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">Ready to build something similar?</h2>
        <a href="mailto:hello@itnesto.com" className="inline-flex items-center gap-3 px-10 py-5 bg-[#050B14] text-white font-bold rounded-full hover:bg-black transition-all text-xl hover:scale-105 group">
          Let's Talk
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </a>
      </div>
    </div>
  );
}
