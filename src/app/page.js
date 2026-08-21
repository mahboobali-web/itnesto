"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects } from "../data/projects";

// Custom 3D Tilt Card Component for Impact Metrics
function ImpactCard({ metric, idx }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 * idx, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="relative z-10 w-full h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative p-6 md:p-8 rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(100,251,151,0.2)] bg-gradient-to-br from-[#0a1121] to-[#12223a] min-h-[200px] md:min-h-[240px] flex flex-col justify-end w-full h-full cursor-pointer group"
      >
        {/* Dynamic Inner Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
        
        {/* Animated Contextual Background Shapes */}
        <motion.div 
          style={{ translateZ: 20 }}
          className="absolute -top-10 -right-10 w-48 h-48 bg-[var(--color-secondary)]/10 rounded-full blur-[40px] group-hover:bg-[var(--color-secondary)]/30 group-hover:scale-150 transition-all duration-700 pointer-events-none"
        />
        <motion.div 
          style={{ translateZ: 40 }}
          className="absolute -bottom-10 -left-10 w-48 h-48 bg-[var(--color-secondary-container)]/10 rounded-full blur-[40px] group-hover:bg-[var(--color-secondary-container)]/30 group-hover:scale-150 transition-all duration-700 pointer-events-none"
        />

        {/* Glass Shimmer Overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] z-0 pointer-events-none"></div>
        
        {/* Foreground Content with Parallax (translateZ) */}
        <div className="relative z-10 flex flex-col h-full transform-gpu" style={{ transformStyle: "preserve-3d" }}>
          <motion.div 
            style={{ translateZ: 60 }}
            className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/20 group-hover:bg-[var(--color-secondary)]/20 group-hover:border-[var(--color-secondary)]/40 transition-all duration-500 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_0_25px_rgba(100,251,151,0.2)]"
          >
            <span className="material-symbols-outlined text-white/90 text-2xl group-hover:text-[var(--color-secondary)] group-hover:scale-110 transition-all duration-500">{metric.icon}</span>
          </motion.div>
          
          <motion.div style={{ translateZ: 40 }}>
            <div className="text-3xl sm:text-4xl md:text-5xl font-display-xl font-extrabold text-white mb-2 md:mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
              {metric.value}<span className="text-[var(--color-secondary)] drop-shadow-[0_0_12px_rgba(100,251,151,0.4)] group-hover:text-[var(--color-secondary-container)] transition-colors duration-300">{metric.suffix}</span>
            </div>
            <div className="text-[10px] sm:text-[12px] font-bold text-white/70 uppercase tracking-[0.1em] sm:tracking-[0.2em] group-hover:text-white transition-colors duration-300">{metric.label}</div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const shaderRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize Three.js Ecosystem Animation
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ecosystemGroup = new THREE.Group();
    scene.add(ecosystemGroup);

    const hubGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const hubMat = new THREE.MeshPhongMaterial({ 
        color: 0x00BF63, 
        emissive: 0x00BF63, 
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8
    });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    scene.add(hub);

    const elements = [];
    const elementCount = 8;
    const radius = 2.5;
    const colors = [0x002366, 0x00BF63, 0x026873, 0xFFFFFF];

    for (let i = 0; i < elementCount; i++) {
        const geo = i % 2 === 0 ? new THREE.BoxGeometry(0.3, 0.3, 0.3) : new THREE.SphereGeometry(0.2, 16, 16);
        const mat = new THREE.MeshPhongMaterial({ color: colors[i % colors.length] });
        const mesh = new THREE.Mesh(geo, mat);
        
        const angle = (i / elementCount) * Math.PI * 2;
        mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 1);
        
        ecosystemGroup.add(mesh);
        elements.push({
            mesh: mesh,
            angle: angle,
            speed: 0.005 + Math.random() * 0.01,
            yOffset: Math.random() * Math.PI * 2
        });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;
    
    let animationFrameId;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        ecosystemGroup.rotation.y += 0.002;
        ecosystemGroup.rotation.z += 0.001;
        
        elements.forEach(el => {
            el.angle += el.speed;
            el.mesh.position.x = Math.cos(el.angle) * radius;
            el.mesh.position.y = Math.sin(el.angle) * radius + Math.sin(Date.now() * 0.001 + el.yOffset) * 0.2;
            el.mesh.rotation.x += 0.01;
            el.mesh.rotation.y += 0.01;
        });
        
        hub.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.05);
        renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Initialize fade-up animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach((el) => {
        observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Global Background Animation */}
      <div className="absolute top-0 right-0 w-1/2 h-full z-0 pointer-events-none opacity-20 hidden lg:block">
        <div className="absolute inset-0 w-full h-full transform scale-150 translate-x-1/4">
          <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-surface/90 border-b border-outline-variant/20 shadow-sm h-20 transition-all">
        <nav className="flex justify-between items-center px-6 md:px-12 h-full w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-2 relative z-50">
            <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">grid_view</span>
            <span className="text-primary text-2xl md:text-3xl font-extrabold tracking-tighter">IT NESTO</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="font-label-md text-label-md text-secondary font-bold hover:opacity-80 transition-opacity" href="#">Home</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:opacity-80 transition-opacity" href="#services">Services</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:opacity-80 transition-opacity" href="#portfolio">Portfolio</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:opacity-80 transition-opacity" href="#about">About</a>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-button text-button hover:opacity-80 transition-all active:scale-95 duration-200">
              Start Your Project
            </button>
          </div>
          <button 
            className="md:hidden text-primary relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-primary transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-primary transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-primary transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-surface z-40 transition-transform duration-500 ease-in-out flex flex-col justify-center items-center gap-8 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <a className="text-3xl font-display-xl font-bold text-primary hover:text-secondary transition-colors" href="#" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a className="text-3xl font-display-xl font-bold text-on-surface-variant hover:text-secondary transition-colors" href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a className="text-3xl font-display-xl font-bold text-on-surface-variant hover:text-secondary transition-colors" href="#portfolio" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</a>
            <a className="text-3xl font-display-xl font-bold text-on-surface-variant hover:text-secondary transition-colors" href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <button className="mt-8 bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all active:scale-95 w-[80%] max-w-[300px]">
              Start Your Project
            </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-24 lg:pb-[var(--spacing-section-gap)] overflow-hidden min-h-[90vh] md:min-h-screen flex items-center">
          <div className="max-w-container-max mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-stack-lg items-center relative z-10">
            <div className="fade-up visible order-2 lg:order-1">
              <h1 className="font-display-2xl font-bold text-[38px] leading-[1.25] sm:text-[44px] sm:leading-[1.2] md:text-[50px] lg:text-[72px] lg:leading-[1.1] text-primary mb-6 md:mb-8 tracking-tight">
                Building Powerful <span className="inline-block text-secondary-container bg-primary px-2 py-0.5 md:px-4 md:pb-2 md:pt-1 mx-1 rounded-lg md:rounded-2xl shadow-xl transform -rotate-2">Digital</span> Experiences That Grow Your Business.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed text-lg">
                We merge architectural precision with high-growth engineering to build scalable products for enterprise leaders and visionary startups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-0">
                <button className="magnetic-btn bg-primary text-on-primary px-8 py-4 rounded-full font-button text-button flex justify-center items-center gap-2 hover:shadow-lg transition-all active:scale-95 w-full sm:w-auto">
                  Start Your Project
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="magnetic-btn border-2 border-outline-variant text-primary px-8 py-4 rounded-full font-button text-button flex justify-center items-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all w-full sm:w-auto">
                  View Our Work
                </button>
              </div>
            </div>
            <div className="relative h-[420px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center fade-up visible mt-4 lg:mt-0 order-1 lg:order-2" style={{ transitionDelay: '200ms' }}>
              <div className="relative w-full h-full max-w-lg mx-auto transform scale-[0.6] sm:scale-75 md:scale-100 origin-center">
                {/* Floating Card 1 - Web Dev */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }} 
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-[10%] left-0 sm:left-[5%] md:top-[5%] md:-left-[10%] lg:left-0 w-64 glass-card rounded-2xl p-5 shadow-2xl z-20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">code</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-primary">React Component</div>
                      <div className="text-xs text-on-surface-variant">App.jsx</div>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                    <div className="font-mono text-[11px] text-on-surface-variant leading-relaxed">
                      <span className="text-[#c678dd] font-semibold">export default</span> <span className="text-[#56b6c2]">function</span> <span className="text-primary font-bold">App</span>() {'{'}<br/>
                      &nbsp;&nbsp;<span className="text-[#c678dd] font-semibold">return</span> (<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-secondary font-bold">NextEcosystem</span> /&gt;<br/>
                      &nbsp;&nbsp;);<br/>
                      {'}'}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 2 - SEO/Analytics */}
                <motion.div 
                  animate={{ y: [0, 25, 0] }} 
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-[35%] right-0 sm:right-[5%] md:top-[35%] md:-right-[5%] w-72 glass-card rounded-2xl p-6 shadow-2xl z-30"
                >
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="text-xs text-on-surface-variant font-bold mb-1">TRAFFIC GROWTH</div>
                      <div className="text-2xl font-display-xl text-primary font-bold">+245%</div>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-3xl">trending_up</span>
                  </div>
                  <div className="flex items-end gap-2 h-16 mt-4">
                    <div className="w-1/6 bg-primary/20 h-[30%] rounded-t"></div>
                    <div className="w-1/6 bg-primary/40 h-[50%] rounded-t"></div>
                    <div className="w-1/6 bg-primary/60 h-[70%] rounded-t"></div>
                    <div className="w-1/6 bg-primary/80 h-[85%] rounded-t"></div>
                    <div className="w-1/6 bg-secondary h-[100%] rounded-t"></div>
                  </div>
                </motion.div>

                {/* Floating Card 3 - Mobile App */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-[10%] left-[10%] sm:left-[20%] md:bottom-[10%] md:left-[10%] w-56 glass-card rounded-3xl p-4 shadow-xl z-10 border-4 border-surface"
                >
                  <div className="w-full h-32 bg-primary rounded-xl mb-4 relative overflow-hidden flex flex-col p-3 border border-primary-container">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-secondary-fixed"></div>
                        <span className="text-[10px] text-white font-medium">Live Server</span>
                      </div>
                      <span className="material-symbols-outlined text-white/50 text-[16px]">more_horiz</span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg p-2.5 backdrop-blur-sm mt-1 border border-white/10 relative z-10">
                      <p className="text-[9px] text-white/70 font-semibold mb-0.5 tracking-wider">ACTIVE USERS</p>
                      <p className="text-lg text-white font-bold font-display-xl">12,450</p>
                      <div className="mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] text-secondary-fixed">arrow_upward</span>
                        <span className="text-[10px] font-bold text-secondary-fixed">14.2%</span>
                      </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-secondary-fixed/40 rounded-full blur-xl z-0"></div>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                      </div>
                      <span className="text-[9px] font-bold text-on-surface-variant">SHOP</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </div>
                      <span className="text-[9px] font-bold text-primary">NEW</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">person</span>
                      </div>
                      <span className="text-[9px] font-bold text-on-surface-variant">PROFILE</span>
                    </div>
                  </div>
                </motion.div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 blur-[100px] rounded-full z-0"></div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary-fixed/20 blur-[80px] rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-8 bg-primary overflow-hidden border-y border-white/5">
          <div className="marquee-container">
            <div className="marquee-content py-4">
              <span className="text-on-primary font-display-xl text-headline-md flex items-center gap-12 whitespace-nowrap">
                <span>10+ Years Experience</span>
                <span className="w-2 h-2 bg-secondary-fixed rounded-full"></span>
                <span>250+ Projects Completed</span>
                <span className="w-2 h-2 bg-secondary-fixed rounded-full"></span>
                <span>150+ Happy Clients</span>
                <span className="w-2 h-2 bg-secondary-fixed rounded-full"></span>
                <span>20+ Countries Served</span>
                <span className="w-2 h-2 bg-secondary-fixed rounded-full"></span>
              </span>
            </div>
            <div className="marquee-content py-4">
              <span className="text-on-primary font-display-xl text-headline-md flex items-center gap-12 whitespace-nowrap">
                <span>10+ Years Experience</span>
                <span className="w-2 h-2 bg-secondary-fixed rounded-full"></span>
                <span>250+ Projects Completed</span>
                <span className="w-2 h-2 bg-secondary-fixed rounded-full"></span>
                <span>150+ Happy Clients</span>
                <span className="w-2 h-2 bg-secondary-fixed rounded-full"></span>
                <span>20+ Countries Served</span>
                <span className="w-2 h-2 bg-secondary-fixed rounded-full"></span>
              </span>
            </div>
          </div>
        </section>

        {/* About Section - Modern Cinematic Layout */}
        <section className="pt-16 md:pt-24 lg:pt-[var(--spacing-section-gap)] pb-12 md:pb-20 relative" id="about">
          <div className="max-w-container-max mx-auto px-6 md:px-12 flex flex-col lg:block">
            {/* Cinematic Image Card */}
            <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-elevation-2 min-h-[400px] h-[60vh] md:h-[600px] lg:h-[700px] flex flex-col justify-end fade-up bg-primary group">
              
              {/* Ken Burns Animated Background Image */}
              <motion.img 
                src="/modern_tech_office.jpg" 
                alt="Team at IT Nesto" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.85] origin-center"
                animate={{ 
                  scale: [1, 1.15, 1],
                  x: ["0%", "-3%", "0%"],
                  y: ["0%", "3%", "0%"]
                }}
                transition={{ 
                  duration: 40, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              {/* Subtle overlay to ensure floating elements are readable while keeping image clean */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
              <div className="absolute inset-0 bg-black/10"></div>
              
              {/* Scanline / Live Feed Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000000 2px, #000000 4px)' }}></div>

              {/* Floating Live Telemetry Node 1 - Project Status */}
              <motion.div 
                animate={{ y: [0, -20, 0], opacity: [0.95, 1, 0.95] }} 
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 right-12 hidden lg:flex items-center gap-4 bg-[#060B14] border border-white/15 p-5 rounded-3xl shadow-[0_15px_40px_rgba(16,185,129,0.15)] z-20"
              >
                <div className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75 duration-1000"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.6)] border-2 border-[#060B14]"></span>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white/80 tracking-widest uppercase mb-0.5">Active Sprints</div>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    12 Projects
                    <span className="text-[10px] text-[#34D399] font-mono bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/30">On Track</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Live Telemetry Node 2 - Activity Graph */}
              <motion.div 
                animate={{ y: [0, 15, 0] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/3 right-32 hidden lg:block w-72 bg-[#060B14] border border-white/15 p-6 rounded-3xl shadow-[0_15px_40px_rgba(16,185,129,0.15)] z-20"
              >
                <div className="text-[10px] font-bold text-white/80 tracking-widest uppercase mb-4 flex justify-between items-center">
                  <span>Weekly Deployments</span>
                  <span className="text-[#34D399] font-mono bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30">48+</span>
                </div>
                <div className="flex items-end gap-2 h-20">
                  {[40, 70, 45, 90, 65, 85, 30, 60, 50, 75, 85, 40].map((h, i) => (
                    <motion.div 
                      key={i}
                      className="w-full bg-gradient-to-t from-[#10B981]/50 to-[#10B981] rounded-t-sm shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      animate={{ height: [`${h}%`, `${Math.max(10, h - 30 + Math.random()*60)}%`, `${h}%`] }}
                      transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                      style={{ height: `${h}%` }}
                    ></motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Live Telemetry Node 3 - Global Reach */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 right-16 hidden lg:flex items-center gap-5 bg-[#060B14] border border-white/15 p-5 rounded-3xl shadow-[0_15px_40px_rgba(16,185,129,0.15)] z-20"
              >
                <div className="relative w-12 h-12 border border-[#10B981]/40 rounded-full flex items-center justify-center">
                  <motion.div 
                    className="absolute w-full h-full border-t border-[#10B981] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  <div className="w-2 h-2 bg-[#10B981] rounded-full shadow-[0_0_12px_rgba(16,185,129,1)]"></div>
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
                  <div className="absolute bottom-2.5 left-2.5 w-1 h-1 bg-white/70 rounded-full"></div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white/80 tracking-widest uppercase mb-1">Global Client Reach</div>
                  <div className="text-2xl font-bold text-white font-mono tracking-tight">
                    <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>+</motion.span>24 <span className="text-sm font-sans text-white/80">Countries</span>
                  </div>
                </div>
              </motion.div>

              {/* High-Contrast Floating Content Box */}
              <div className="relative lg:absolute bottom-0 left-0 right-0 lg:bottom-12 lg:left-12 lg:w-[580px] bg-surface/95 backdrop-blur-xl p-6 md:p-8 lg:p-12 rounded-t-3xl lg:rounded-t-none rounded-b-[32px] md:rounded-[32px] shadow-2xl border border-white/50 fade-up z-20 mt-auto" style={{ transitionDelay: '200ms' }}>
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary font-bold text-xs rounded-full uppercase tracking-[0.15em] border border-primary/10">Our Mission</span>
                  <div className="h-px bg-primary/10 flex-1"></div>
                </div>
                
                <h2 className="text-[32px] md:text-[40px] lg:text-[52px] leading-[1.1] text-primary mb-4 md:mb-6 font-extrabold tracking-tight">Redefining Digital Excellence.</h2>
                
                <p className="text-on-surface-variant mb-6 md:mb-8 leading-relaxed text-base md:text-lg">
                  We believe technology should be as elegant as it is powerful. We bridge the gap between complex business logic and intuitive user experiences.
                </p>
                
                {/* Scannable Bullet Points */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary text-sm font-bold">check</span>
                    </div>
                    <span className="text-primary font-bold text-base">Enterprise-grade architecture</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary text-sm font-bold">check</span>
                    </div>
                    <span className="text-primary font-bold text-base">Human-centered UI/UX design</span>
                  </div>
                </div>

                <button className="magnetic-btn bg-primary text-on-primary px-6 py-3 md:px-8 md:py-4 rounded-full font-button text-sm md:text-base inline-flex items-center gap-3 hover:bg-secondary hover:text-on-secondary transition-colors duration-300 shadow-lg">
                  Discover Our Approach
                  <span className="material-symbols-outlined text-lg md:text-xl">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 lg:mt-12">
              {[
                { icon: "handshake", value: "99", suffix: "%", label: "Client Retention", id: "retention" },
                { icon: "rocket_launch", value: "250", suffix: "+", label: "Products Launched", id: "launched" },
                { icon: "trophy", value: "35", suffix: "+", label: "Industry Awards", id: "awards" },
                { icon: "language", value: "24", suffix: "/7", label: "Global Support", id: "support" }
              ].map((metric, idx) => (
                <ImpactCard key={idx} metric={metric} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-section-gap bg-[#fdfdfd] border-y border-outline-variant/10" id="services">
          <div className="max-w-container-max mx-auto px-6 md:px-12">
            <div className="text-center mb-20 fade-up">
              <span className="inline-block px-4 py-1 mb-4 text-[var(--color-secondary)] font-bold text-[11px] md:text-xs uppercase tracking-[0.15em]">
                A Structured System, Not Just A Visual Identity
              </span>
              <h2 className="font-display-xl text-headline-lg-mobile md:text-[56px] text-primary mb-4 font-extrabold tracking-tight">
                Strategic <span className="text-[var(--color-secondary)]">Digital Services</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto text-lg">Engineered solutions for every stage of your digital journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: "terminal", title: "Website Development", desc: "Custom Next.js & React ecosystems optimized for speed and conversion.", delay: "0ms" },
                { icon: "smartphone", title: "Mobile Apps", desc: "Cross-platform Flutter and React Native experiences that feel native.", delay: "100ms" },
                { icon: "trending_up", title: "SEO Solutions", desc: "Technical SEO and content strategies that dominate search rankings.", delay: "200ms" },
                { icon: "hub", title: "Digital Marketing", desc: "Full-funnel marketing to ensure your tech reaches its target audience.", delay: "300ms" },
                { icon: "edit_document", title: "Content Writing", desc: "Compelling, SEO-optimized copy that engages users and drives conversions.", delay: "400ms" },
                { icon: "palette", title: "Graphic Design", desc: "Stunning visual identities, branding, and assets that captivate your audience.", delay: "500ms" },
                { icon: "smart_toy", title: "AI Workflows", desc: "Intelligent automation and AI integrations to supercharge your operations.", delay: "600ms" },
                { icon: "developer_board", title: "Custom Software", desc: "Bespoke enterprise applications tailored specifically to your business logic.", delay: "700ms" }
              ].map((service, idx) => (
                <div key={idx} className="relative p-8 md:p-10 rounded-[24px] bg-gradient-to-br from-[#0a1121] to-[#12223a] overflow-hidden shadow-[0_20px_50px_rgba(10,21,16,0.15)] hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(100,251,151,0.15)] transition-all duration-500 group fade-up flex flex-col" style={{ transitionDelay: service.delay }}>
                  {/* Subtle Texture/Grain overlay */}
                  <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
                  
                  {/* Internal Texture/Glow Effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent opacity-80 z-0"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-[52px] h-[52px] rounded-2xl bg-[var(--color-secondary)]/5 flex items-center justify-center mb-8 border border-[var(--color-secondary)]/20 shadow-[inset_0_0_15px_rgba(100,251,151,0.05)] group-hover:bg-[var(--color-secondary)]/15 transition-colors duration-500">
                      <span className="material-symbols-outlined text-[var(--color-secondary)] text-[26px]">{service.icon}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-[22px] leading-[1.3] text-white font-bold tracking-tight mb-5">
                      {service.title}
                    </h3>
                    
                    {/* Separator Line */}
                    <div className="w-10 h-[2px] bg-[var(--color-secondary)] mb-6 rounded-full opacity-70 group-hover:w-16 transition-all duration-500"></div>
                    
                    {/* Description */}
                    <p className="text-white/70 leading-[1.6] text-[15px] flex-grow">
                      {service.desc}
                    </p>
                    
                    {/* Bottom Arrow Button */}
                    <div className="mt-10 w-11 h-11 rounded-full border border-[var(--color-secondary)]/20 flex items-center justify-center group-hover:border-[var(--color-secondary)]/60 group-hover:bg-[var(--color-secondary)]/10 transition-all duration-300 self-start cursor-pointer">
                      <span className="material-symbols-outlined text-white/50 group-hover:text-[var(--color-secondary)] transition-colors duration-300 text-xl">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-section-gap bg-[#fdfdfd]" id="portfolio">
          <div className="max-w-container-max mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 fade-up">
              <div className="max-w-2xl">
                <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary font-bold text-[11px] md:text-xs rounded-full uppercase tracking-[0.15em] border border-primary/10 mb-6">Our Work</span>
                <h2 className="font-display-xl text-headline-lg-mobile md:text-[56px] text-primary mb-6 font-extrabold tracking-tight leading-tight">Featured Projects</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant text-lg leading-relaxed">A showcase of our recent engineering and design transformations. Click any project to view the case study.</p>
              </div>
              <button className="mt-8 md:mt-0 flex items-center gap-2 text-primary font-bold hover:text-[var(--color-secondary-container)] transition-colors group">
                View All Projects
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, idx) => (
                <Link href={`/projects/${project.slug}`} key={idx} className="group relative rounded-[32px] overflow-hidden aspect-[4/3] md:aspect-[16/11] fade-up shadow-lg cursor-pointer bg-slate-100 border border-outline-variant/10 block">
                  <Image 
                    src={project.coverImage} 
                    alt={project.title} 
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1526]/90 via-[#0B1526]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white font-bold text-[11px] rounded-full uppercase tracking-[0.1em] border border-white/20 mb-4">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">{project.title}</h3>
                    <div className="flex items-center gap-2 text-[var(--color-secondary)] opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      <span className="font-bold text-sm uppercase tracking-wider">View Case Study</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-section-gap relative">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10"></div>
          
          <div className="max-w-container-max mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 fade-up">
              <div className="max-w-2xl">
                <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary font-bold text-xs rounded-full uppercase tracking-[0.15em] border border-primary/10 mb-6">Workflow</span>
                <h2 className="font-display-xl text-headline-lg-mobile md:text-[56px] text-primary mb-6 font-extrabold tracking-tight leading-tight">Our Methodical Process</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant text-lg leading-relaxed">How we turn complex ideas into seamless digital realities through engineering excellence.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { num: "01", title: "Discovery", icon: "search", desc: "We dive deep into your business goals, user needs, and market landscape to define a winning strategy." },
                { num: "02", title: "Planning", icon: "lightbulb", desc: "Crafting a meticulous architectural blueprint and roadmap to ensure scalable and seamless execution." },
                { num: "03", title: "Design", icon: "architecture", desc: "Creating stunning, human-centered interfaces that captivate users and elevate your brand identity." },
                { num: "04", title: "Development", icon: "data_object", desc: "Writing clean, scalable code using the latest tech stacks for robust, enterprise-grade performance." },
                { num: "05", title: "Testing", icon: "verified", desc: "Rigorous quality assurance to ensure flawless functionality and security across all devices." },
                { num: "06", title: "Launch", icon: "rocket_launch", desc: "Deploying your solution to the world with precision, followed by ongoing support and optimization." }
              ].map((step, idx) => (
                <div key={idx} className="group relative p-8 md:p-10 rounded-[32px] bg-white border border-transparent hover:bg-primary transition-all duration-500 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] hover:-translate-y-2 fade-up" style={{ transitionDelay: `${idx * 100}ms` }}>
                  {/* Massive Watermark Number */}
                  <div className="absolute -bottom-8 -right-4 font-display-2xl text-[120px] font-black text-black/[0.03] group-hover:text-secondary/10 transition-colors duration-500 pointer-events-none select-none">
                    {step.num}
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 group-hover:bg-white/10 flex items-center justify-center transition-colors duration-500 backdrop-blur-sm border border-slate-200 group-hover:border-transparent">
                        <span className="material-symbols-outlined text-primary group-hover:text-secondary text-3xl transition-colors duration-500">{step.icon}</span>
                      </div>
                      <span className="text-slate-300 group-hover:text-secondary/50 font-bold text-xl tracking-widest transition-colors duration-500">{step.num}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-primary group-hover:text-white mb-4 transition-colors duration-500">{step.title}</h3>
                    <p className="text-slate-600 group-hover:text-white/70 leading-relaxed text-[15px] transition-colors duration-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="pt-section-gap pb-12 bg-primary relative overflow-hidden" id="tech-stack">
          {/* Glowing background meshes */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-fixed/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-container-max mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-4 py-1.5 bg-white/5 text-white font-bold text-xs rounded-full uppercase tracking-[0.15em] border border-white/10 mb-6">Our Stack</span>
              <h2 className="text-4xl md:text-5xl text-white font-extrabold tracking-tight mb-4">World-Class Technologies</h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">We build on top of robust, scalable, and modern ecosystems.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-up" style={{ transitionDelay: '200ms' }}>
              {/* Frontend Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] hover:bg-white/10 hover:border-white/20 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/40 to-transparent flex items-center justify-center border border-secondary/20">
                    <span className="material-symbols-outlined text-secondary text-2xl">web</span>
                  </div>
                  <h3 className="text-2xl text-white font-bold">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'].map(tech => (
                    <span key={tech} className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm border border-white/5 group-hover:border-white/20 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>
              
              {/* Mobile & Backend Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] hover:bg-white/10 hover:border-white/20 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-fixed/40 to-transparent flex items-center justify-center border border-primary-fixed/20">
                    <span className="material-symbols-outlined text-primary-fixed text-2xl">smartphone</span>
                  </div>
                  <h3 className="text-2xl text-white font-bold">Mobile & Core</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Flutter', 'React Native', 'Node.js', 'Python', 'Go', 'PostgreSQL'].map(tech => (
                    <span key={tech} className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm border border-white/5 group-hover:border-white/20 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Cloud Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] hover:bg-white/10 hover:border-white/20 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tertiary-fixed/40 to-transparent flex items-center justify-center border border-tertiary-fixed/20">
                    <span className="material-symbols-outlined text-tertiary-fixed text-2xl">cloud</span>
                  </div>
                  <h3 className="text-2xl text-white font-bold">Cloud & AI</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'OpenAI', 'TensorFlow'].map(tech => (
                    <span key={tech} className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm border border-white/5 group-hover:border-white/20 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="bg-primary pb-section-gap relative z-20" id="statistics">
          <div className="max-w-container-max mx-auto px-6 md:px-12">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Stat 1 */}
              <div className="text-center flex flex-col items-center justify-center p-8 md:p-12 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 group fade-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:border-transparent transition-colors duration-500">
                    <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors duration-500">public</span>
                  </div>
                  <p className="font-label-md text-sm text-white/60 uppercase tracking-[0.2em] font-bold group-hover:text-white/90 transition-colors">Global Projects</p>
                </div>
                <div className="font-display-2xl text-[80px] leading-none font-black text-white tracking-tight">
                  250<span className="text-secondary drop-shadow-[0_0_15px_rgba(46,204,113,0.5)]">+</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="text-center flex flex-col items-center justify-center p-8 md:p-12 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 group fade-up" style={{ transitionDelay: '100ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:border-transparent transition-colors duration-500">
                    <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors duration-500">favorite</span>
                  </div>
                  <p className="font-label-md text-sm text-white/60 uppercase tracking-[0.2em] font-bold group-hover:text-white/90 transition-colors">Client Retention</p>
                </div>
                <div className="font-display-2xl text-[80px] leading-none font-black text-white tracking-tight">
                  99<span className="text-secondary drop-shadow-[0_0_15px_rgba(46,204,113,0.5)]">%</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="text-center flex flex-col items-center justify-center p-8 md:p-12 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 group fade-up" style={{ transitionDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:border-transparent transition-colors duration-500">
                    <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors duration-500">code_blocks</span>
                  </div>
                  <p className="font-label-md text-sm text-white/60 uppercase tracking-[0.2em] font-bold group-hover:text-white/90 transition-colors">Core Tech Stack</p>
                </div>
                <div className="font-display-2xl text-[80px] leading-none font-black text-white tracking-tight">
                  15<span className="text-secondary drop-shadow-[0_0_15px_rgba(46,204,113,0.5)]">+</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-section-gap relative overflow-hidden" id="testimonials">
          {/* Subtle background gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-primary/5 -z-10"></div>

          <div className="max-w-container-max mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-4 fade-up">
                <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary font-bold text-xs rounded-full uppercase tracking-[0.15em] border border-primary/10 mb-6">Client Success</span>
                <h2 className="font-display-xl text-[48px] leading-[1.1] text-primary mb-6 font-extrabold tracking-tight">Trusted by Industry Leaders.</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-10">We don&apos;t just build software; we build lasting digital footprints that drive tangible business growth.</p>
              </div>

              <div className="lg:col-span-8 overflow-hidden relative">
                {/* Gradient masks for smooth vertical scrolling edges */}
                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#f5f5f7] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#f5f5f7] to-transparent z-10 pointer-events-none"></div>

                <div className="marquee-vertical-container py-8">
                  <div className="marquee-vertical-content" style={{ animationDuration: '40s' }}>
                    {[
                      {
                        text: "The team at IT Nesto didn't just build a site; they built a tool that actively drives our growth. Their real-time dashboard is unmatched.",
                        initials: "SJ",
                        name: "Sarah Jenkins",
                        role: "CTO, Global Finance Corp",
                        color: "primary"
                      },
                      {
                        text: "Remarkable speed to market. We went from MVP to full deployment in record time. The AR mobile app increased our conversions by 45%.",
                        initials: "MT",
                        name: "Marcus Thorne",
                        role: "Founder, Luxe Retail",
                        color: "secondary"
                      },
                      {
                        text: "IT Nesto delivered a highly secure, HIPAA-compliant platform. The accessibility features and telehealth integrations transformed our patient care.",
                        initials: "EC",
                        name: "Dr. Emily Chen",
                        role: "Medical Director, National Health Network",
                        color: "primary"
                      },
                      {
                        text: "Their cloud-based logistics hub with AI route optimization has saved us thousands of hours. Operational costs plummeted by 18% in the first year alone.",
                        initials: "JW",
                        name: "James Wilson",
                        role: "Operations Lead, FastTrack Logistics",
                        color: "secondary"
                      }
                    ].map((review, idx) => (
                      <div key={idx} className="w-full bg-white p-8 md:p-10 rounded-[32px] shadow-lg hover:shadow-2xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-500 relative group overflow-hidden">
                        {/* Massive Quote Watermark */}
                        <div className="absolute -top-6 -right-6 text-[180px] font-serif font-black text-primary/5 group-hover:text-primary/10 transition-colors duration-500 select-none pointer-events-none leading-none">
                          &quot;
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex text-secondary mb-6 gap-1">
                            {[1,2,3,4,5].map(i => (
                              <span key={i} className="material-symbols-outlined text-xl drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                          </div>
                          <p className="font-body-lg text-lg text-primary leading-relaxed mb-8 italic">&quot;{review.text}&quot;</p>
                          
                          <div className="flex items-center gap-5 border-t border-outline-variant/10 pt-6">
                            <div className={`w-14 h-14 rounded-full bg-${review.color}/10 flex items-center justify-center text-${review.color} font-bold text-xl`}>{review.initials}</div>
                            <div>
                              <h5 className="font-bold text-primary text-lg">{review.name}</h5>
                              <p className="text-sm text-on-surface-variant font-medium">{review.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Duplicate for infinite effect */}
                  <div className="marquee-vertical-content" style={{ animationDuration: '40s' }}>
                    {[
                      {
                        text: "The team at IT Nesto didn't just build a site; they built a tool that actively drives our growth. Their real-time dashboard is unmatched.",
                        initials: "SJ",
                        name: "Sarah Jenkins",
                        role: "CTO, Global Finance Corp",
                        color: "primary"
                      },
                      {
                        text: "Remarkable speed to market. We went from MVP to full deployment in record time. The AR mobile app increased our conversions by 45%.",
                        initials: "MT",
                        name: "Marcus Thorne",
                        role: "Founder, Luxe Retail",
                        color: "secondary"
                      },
                      {
                        text: "IT Nesto delivered a highly secure, HIPAA-compliant platform. The accessibility features and telehealth integrations transformed our patient care.",
                        initials: "EC",
                        name: "Dr. Emily Chen",
                        role: "Medical Director, National Health Network",
                        color: "primary"
                      },
                      {
                        text: "Their cloud-based logistics hub with AI route optimization has saved us thousands of hours. Operational costs plummeted by 18% in the first year alone.",
                        initials: "JW",
                        name: "James Wilson",
                        role: "Operations Lead, FastTrack Logistics",
                        color: "secondary"
                      }
                    ].map((review, idx) => (
                      <div key={idx + 4} className="w-full bg-white p-8 md:p-10 rounded-[32px] shadow-lg hover:shadow-2xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-500 relative group overflow-hidden">
                        {/* Massive Quote Watermark */}
                        <div className="absolute -top-6 -right-6 text-[180px] font-serif font-black text-primary/5 group-hover:text-primary/10 transition-colors duration-500 select-none pointer-events-none leading-none">
                          &quot;
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex text-secondary mb-6 gap-1">
                            {[1,2,3,4,5].map(i => (
                              <span key={i} className="material-symbols-outlined text-xl drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                          </div>
                          <p className="font-body-lg text-lg text-primary leading-relaxed mb-8 italic">&quot;{review.text}&quot;</p>
                          
                          <div className="flex items-center gap-5 border-t border-outline-variant/10 pt-6">
                            <div className={`w-14 h-14 rounded-full bg-${review.color}/10 flex items-center justify-center text-${review.color} font-bold text-xl`}>{review.initials}</div>
                            <div>
                              <h5 className="font-bold text-primary text-lg">{review.name}</h5>
                              <p className="text-sm text-on-surface-variant font-medium">{review.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-section-gap">
          <div className="max-w-container-max mx-auto px-6 md:px-12">
            <div className="bg-primary rounded-3xl overflow-hidden flex flex-col lg:flex-row">
              <div className="p-10 md:p-20 lg:w-1/2 text-on-primary">
                <h2 className="font-display-xl text-headline-lg-mobile md:text-headline-xl mb-8">Let&apos;s build something exceptional together.</h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <span className="material-symbols-outlined text-4xl text-secondary-fixed">mail</span>
                    <div>
                      <p className="text-on-primary/60 text-sm">Send us an email</p>
                      <p className="font-bold text-lg">hello@itnesto.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="material-symbols-outlined text-4xl text-secondary-fixed">phone_callback</span>
                    <div>
                      <p className="text-on-primary/60 text-sm">Give us a call</p>
                      <p className="font-bold text-lg">+1 (234) 567 890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="material-symbols-outlined text-4xl text-secondary-fixed">location_on</span>
                    <div>
                      <p className="text-on-primary/60 text-sm">Our Studio</p>
                      <p className="font-bold text-lg">New York City, NY</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 md:p-16 lg:p-20 lg:w-1/2 flex flex-col justify-center">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-2" htmlFor="name">Full Name</label>
                      <input className="w-full bg-[#f5f5f7] border-2 border-transparent rounded-2xl px-6 py-4 text-primary focus:border-primary/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all duration-300" id="name" placeholder="John Doe" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-2" htmlFor="email">Business Email</label>
                      <input className="w-full bg-[#f5f5f7] border-2 border-transparent rounded-2xl px-6 py-4 text-primary focus:border-primary/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all duration-300" id="email" placeholder="john@company.com" type="email" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-2" htmlFor="service">I&apos;m interested in</label>
                    <div className="relative">
                      <select className="w-full bg-[#f5f5f7] border-2 border-transparent rounded-2xl px-6 py-4 text-primary focus:border-primary/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all duration-300 appearance-none cursor-pointer" id="service">
                        <option>Web Development</option>
                        <option>Mobile App</option>
                        <option>SEO</option>
                        <option>Digital Marketing</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">expand_more</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-2" htmlFor="message">Project Details</label>
                    <textarea className="w-full bg-[#f5f5f7] border-2 border-transparent rounded-3xl px-6 py-5 text-primary focus:border-primary/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all duration-300 resize-none" id="message" placeholder="Tell us about your goals, timeline, and budget..." rows="4"></textarea>
                  </div>
                  
                  <button className="w-full mt-4 bg-primary text-white py-5 rounded-full font-bold text-lg shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* Footer */}
      <footer className="w-full bg-primary mt-section-gap relative overflow-hidden text-white pt-24 pb-8 border-t border-outline-variant/10">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-container-max mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 lg:gap-8 mb-20">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-4">
              <span className="font-display-2xl text-[40px] font-black tracking-tighter block mb-6">IT NESTO</span>
              <p className="text-white/60 mb-8 max-w-sm text-lg leading-relaxed">
                Pioneering the future of digital interaction through sophisticated engineering and human-centric design.
              </p>
              <div className="flex gap-4">
                <a className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300 shadow-sm" href="#"><span className="material-symbols-outlined text-lg">language</span></a>
                <a className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300 shadow-sm" href="#"><span className="material-symbols-outlined text-lg">share</span></a>
                <a className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300 shadow-sm" href="#"><span className="material-symbols-outlined text-lg">mail</span></a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="col-span-1 lg:col-span-2 lg:col-start-7">
              <h4 className="font-bold text-xl mb-6">Navigation</h4>
              <ul className="space-y-4">
                <li><a className="text-secondary font-bold hover:text-white transition-colors" href="#">Home</a></li>
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">Services</a></li>
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">Portfolio</a></li>
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">Insights</a></li>
              </ul>
            </div>
            
            <div className="col-span-1 lg:col-span-2">
              <h4 className="font-bold text-xl mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">About Us</a></li>
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">Careers</a></li>
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">Contact</a></li>
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div className="col-span-1 lg:col-span-2">
              <h4 className="font-bold text-xl mb-6">Socials</h4>
              <ul className="space-y-4">
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">LinkedIn</a></li>
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">Twitter (X)</a></li>
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">Instagram</a></li>
                <li><a className="text-white/60 hover:text-white font-medium transition-colors" href="#">Dribbble</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm font-medium">© 2026 IT NESTO. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-white/40 font-medium">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
