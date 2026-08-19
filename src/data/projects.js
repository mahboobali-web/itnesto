export const projects = [
  {
    id: "fintech-dashboard",
    slug: "fintech-dashboard",
    title: "Fintech Dashboard",
    category: "Web Application",
    coverImage: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=100&w=3840&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=100&w=3840&auto=format&fit=crop"
    ],
    summary: "A comprehensive financial dashboard providing real-time analytics, predictive modeling, and seamless transaction management for enterprise clients.",
    client: "Global Finance Corp",
    role: "Full-Stack Development, UX/UI Design",
    timeline: "6 Months",
    challenge: "The client needed a way to visualize millions of daily transactions in real-time without browser lag or data staleness. Their existing system was taking 30 seconds to load key financial reports, causing significant operational bottlenecks.",
    solution: "We engineered a highly performant React architecture utilizing WebSockets for real-time data streaming and a virtualized DOM to render massive datasets effortlessly. The UI was redesigned from the ground up to prioritize critical financial metrics at a glance.",
    impact: "Page load times decreased by 98% (from 30s to 600ms). The streamlined dashboard led to a 40% increase in daily active users and saved the analytics team an estimated 15 hours per week in report generation.",
    features: [
      "Real-time WebSocket data streaming",
      "Predictive machine learning models",
      "Customizable widget-based layout",
      "Enterprise-grade role-based access control (RBAC)",
      "Automated PDF & Excel report generation"
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "WebSockets", "D3.js", "Node.js"],
    url: "https://example.com/fintech"
  },
  {
    id: "ecommerce-platform",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Mobile App",
    coverImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=100&w=3840&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=100&w=3840&auto=format&fit=crop"
    ],
    summary: "A highly-optimized native mobile shopping experience featuring AR product previews, one-click checkout, and AI-driven personalization.",
    client: "Luxe Retail",
    role: "Mobile Engineering, 3D Rendering",
    timeline: "8 Months",
    challenge: "Mobile conversion rates were dropping due to a clunky checkout process and inability for users to visualize products in their space. The app also suffered from slow load times on older devices.",
    solution: "We rebuilt the app natively, implementing an Augmented Reality (AR) module that allows users to place products in their environment before purchasing. We streamlined the checkout flow to a single tap and optimized asset loading, resulting in a 45% increase in mobile conversions.",
    impact: "Achieved a 45% increase in mobile conversions within the first quarter. The AR feature drove a 200% increase in session duration, and overall app crash rates dropped to below 0.1%.",
    features: [
      "Augmented Reality (AR) product placement",
      "AI-driven product recommendations",
      "One-click biometric checkout (Apple Pay/Google Pay)",
      "Offline mode and aggressive caching",
      "Real-time inventory sync"
    ],
    technologies: ["React Native", "ARKit/ARCore", "Stripe API", "Node.js", "GraphQL", "Redis"],
    url: "https://example.com/ecommerce"
  },
  {
    id: "healthcare-portal",
    slug: "healthcare-portal",
    title: "Healthcare Portal",
    category: "UI/UX Design",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=100&w=3840&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=100&w=3840&auto=format&fit=crop"
    ],
    summary: "A HIPAA-compliant patient portal designed for accessibility, featuring telemedicine integration and secure medical record management.",
    client: "National Health Network",
    role: "System Architecture, Frontend Development",
    timeline: "12 Months",
    challenge: "The hospital network needed a centralized, secure platform where patients could access their medical records, schedule appointments, and conduct telehealth visits, all while strictly adhering to HIPAA regulations.",
    solution: "We designed and developed a highly secure, intuitive web application with end-to-end encryption. The UI was built with strict accessibility standards (WCAG 2.1 AA) ensuring all patients, regardless of ability, could easily navigate their healthcare journey.",
    impact: "Reduced patient no-show rates by 30% through automated scheduling and reminders. Telehealth adoption skyrocketed by 150%, and the platform successfully passed all third-party HIPAA compliance audits.",
    features: [
      "End-to-end encrypted video consultations",
      "Secure medical record access and sharing",
      "Automated SMS/Email appointment reminders",
      "WCAG 2.1 AA compliant accessibility",
      "Integration with legacy EHR systems"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "WebRTC", "PostgreSQL", "AWS HIPAA Architecture"],
    url: "https://example.com/healthcare"
  },
  {
    id: "logistics-software",
    slug: "logistics-software",
    title: "Logistics Software",
    category: "Enterprise Solution",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=100&w=3840&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=100&w=3840&auto=format&fit=crop"
    ],
    summary: "An end-to-end global supply chain management system with real-time fleet tracking and automated inventory forecasting.",
    client: "FastTrack Logistics",
    role: "Cloud Infrastructure, Data Engineering",
    timeline: "9 Months",
    challenge: "The client was managing a global fleet using outdated, disparate systems leading to lost shipments, inaccurate ETA predictions, and significant manual overhead.",
    solution: "We deployed a unified cloud-based logistics hub. Utilizing GPS APIs and machine learning algorithms, the system now provides highly accurate delivery forecasts and automated route optimization, saving the company thousands of hours in manual tracking.",
    impact: "Fleet operational costs were reduced by 18% in year one. On-time delivery rates improved from 82% to 98.5%, significantly boosting end-client satisfaction and retention.",
    features: [
      "Live GPS fleet tracking map",
      "AI-powered route optimization",
      "Predictive maintenance alerts for vehicles",
      "Automated customs document generation",
      "Multi-warehouse inventory synchronization"
    ],
    technologies: ["Next.js", "Python", "TensorFlow", "Google Maps API", "Docker", "Kubernetes"],
    url: "https://example.com/logistics"
  }
];
