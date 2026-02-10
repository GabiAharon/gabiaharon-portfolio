import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  Mail,
  Globe,
  Play,
  X,
  ChevronDown,
  Star,
  Quote,
  Users,
  Mic,
  Target,
  Award,
  ArrowRight,
  Download,
  Sparkles,
  Camera
} from "lucide-react";
import { useLanguage } from './_app';
import Head from 'next/head';

// ============================================
// HOOK FOR DETECTING MOBILE
// ============================================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// ============================================
// LECTURE IMAGES DATA
// ============================================
const lectureImages = [
  {
    src: "https://i.postimg.cc/qRw4Tb0d/IMG-20241209-WA0055.jpg",
    alt: "Lecture 1"
  },
  {
    src: "https://i.postimg.cc/BQXsrBzv/IMG-20250109-WA0062.jpg",
    alt: "Lecture 2"
  },
  {
    src: "https://i.postimg.cc/nhmxzcZd/IMG-20250511-WA0122.jpg",
    alt: "Lecture 3"
  },
  {
    src: "https://i.postimg.cc/ZRMsppxr/IMG-20260113-WA0016.jpg",
    alt: "Lecture 4"
  }
];

// ============================================
// MORPHING PORTRAIT GALLERY - Remotion-inspired
// For vertical/portrait lecture photos
// ============================================
const MorphingPortraitGallery = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    images.forEach(img => {
      const image = new Image();
      image.src = img.src;
    });
    setIsLoaded(true);
  }, [images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!isLoaded) return null;

  // On mobile show 1, on tablet show 3, on desktop show all 4
  const visibleCount = isMobile ? 1 : 4;

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-3 md:gap-4">
        {images.map((img, idx) => {
          const isActive = idx === currentIndex;

          // On mobile, only show active
          if (isMobile && !isActive) return null;

          return (
            <motion.div
              key={idx}
              className="relative cursor-pointer"
              onClick={() => setCurrentIndex(idx)}
              initial={false}
              animate={{
                scale: isActive ? 1.05 : 0.95,
                opacity: isActive ? 1 : 0.6,
                y: isActive ? -8 : 0,
              }}
              whileHover={{ scale: isActive ? 1.08 : 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              {/* Card container - Portrait orientation */}
              <div className={`relative overflow-hidden rounded-xl transition-shadow duration-500 ${
                isActive
                  ? 'w-36 h-48 md:w-40 md:h-56 shadow-xl shadow-blue-500/40'
                  : 'w-32 h-44 md:w-36 md:h-48 shadow-lg shadow-black/30'
              }`}>
                {/* Image */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay - lighter for active */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive
                    ? 'bg-gradient-to-t from-slate-950/60 via-transparent to-transparent'
                    : 'bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/10'
                }`} />

                {/* Border for active */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl border-2 border-blue-400/60" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`rounded-full transition-all duration-400 ${
              idx === currentIndex
                ? 'w-8 h-2 bg-blue-400'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// ENCHANTED PROFILE IMAGE - Frontend Design Masterpiece
// ============================================
const EnchantedProfileImage = ({ src, alt }) => {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  const particleCount = isMobile ? 8 : 16;

  return (
    <motion.div
      className="relative mx-auto w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Orbital Particles */}
      {!isMobile && [...Array(particleCount)].map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 140 + (i % 3) * 15;
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: `linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))`,
              left: '50%',
              top: '50%',
              marginLeft: -3,
              marginTop: -3,
            }}
            animate={{
              x: Math.cos(angle + Date.now() * 0.0001 * (i % 2 ? 1 : -1)) * radius,
              y: Math.sin(angle + Date.now() * 0.0001 * (i % 2 ? 1 : -1)) * radius,
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Rotating Rings - 3 layers */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(rgb(15, 23, 42), rgb(15, 23, 42)), linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4))',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute -inset-2 rounded-full"
        style={{
          border: '1px solid transparent',
          backgroundImage: 'linear-gradient(rgb(15, 23, 42), rgb(15, 23, 42)), linear-gradient(225deg, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3))',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute -inset-4 rounded-full"
        style={{
          border: '1px solid transparent',
          backgroundImage: 'linear-gradient(rgb(15, 23, 42), rgb(15, 23, 42)), linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulsating Glow */}
      <motion.div
        className="absolute -inset-6 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), transparent)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(110deg, transparent 45%, rgba(255, 255, 255, 0.3) 50%, transparent 55%)',
        }}
        animate={{
          x: ['-200%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      {/* Main Image Container with 3D tilt */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-blue-500/20"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: isMobile ? 0 : mousePosition.y * 15,
          rotateY: isMobile ? 0 : mousePosition.x * 15,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent" />

        {/* The image */}
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Decorative corner accents */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-blue-500"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </>
      )}
    </motion.div>
  );
};

// ============================================
// SIGNATURE LECTURE BADGE - Highlight Main Talk
// ============================================
const SignatureLectureBadge = ({ label, title, language }) => {
  const isHebrew = language === 'he';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="relative inline-flex flex-col items-center gap-2 my-6"
    >
      {/* Top decorative line */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ width: 0 }}
        animate={{ width: 'auto' }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400/60 to-amber-400/60" />
        <span className="text-xs text-amber-400/70 font-light tracking-widest uppercase">
          {label}
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent via-amber-400/60 to-amber-400/60" />
      </motion.div>

      {/* Main title with theatrical curtain icon */}
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-400/20 shadow-lg shadow-amber-500/10">
          {/* Theater/Stage icon */}
          <svg
            className="w-5 h-5 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>

          <span
            className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 bg-clip-text text-transparent"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            "{title}"
          </span>
        </div>

        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <div className="w-full h-full bg-amber-300 rounded-full blur-sm" />
        </motion.div>

        <motion.div
          className="absolute -bottom-1 -left-1 w-2 h-2"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            delay: 1,
          }}
        >
          <div className="w-full h-full bg-yellow-300 rounded-full blur-sm" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// FLOATING PARTICLES BACKGROUND
// ============================================
const FloatingParticles = () => {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 10 : 30;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================
const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(easeProgress * numericValue));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
};

// ============================================
// MAGNETIC BUTTON COMPONENT
// ============================================
const MagneticButton = ({ children, onClick, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.15);
      y.set((e.clientY - centerY) * 0.15);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

// ============================================
// TEXT REVEAL ANIMATION
// ============================================
const TextReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ============================================
// GLOWING ORB CURSOR FOLLOWER
// ============================================
const GlowingOrb = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed w-64 h-64 rounded-full pointer-events-none z-[1] hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        left: mousePosition.x - 128,
        top: mousePosition.y - 128,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
    />
  );
};

// ============================================
// CINEMATIC INTRO COMPONENT
// ============================================
const CinematicIntro = ({ onComplete, language }) => {
  const [phase, setPhase] = useState(0);
  const isMobile = useIsMobile();
  const isHebrew = language === 'he';

  const particleCount = isMobile ? 15 : 50;
  const lightRayCount = isMobile ? 6 : 12;
  const spotlightSize = isMobile ? 'w-[300px] h-[300px]' : 'w-[800px] h-[800px]';
  const ringSize = isMobile ? 'w-32 h-32' : 'w-64 h-64';

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3500),
      setTimeout(() => onComplete(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={onComplete}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase >= 4 ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
            initial={{ x: '50%', y: '50%', scale: 0, opacity: 0 }}
            animate={phase >= 1 ? {
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: [0, isMobile ? 1 : 1.5, 0.5],
              opacity: [0, 0.8, 0]
            } : {}}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0 }}
        animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div
          className={`${spotlightSize} rounded-full`}
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[...Array(lightRayCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] origin-left"
            style={{
              width: isMobile ? '40%' : '50%',
              maxWidth: isMobile ? '150px' : '400px',
              background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, transparent 100%)',
              transform: `rotate(${i * (360 / lightRayCount)}deg)`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase >= 1 ? { scaleX: 1, opacity: [0, 0.6, 0.3] } : {}}
            transition={{ duration: 2, delay: 0.1 * i, ease: "easeOut" }}
          />
        ))}
      </div>

      <motion.div
        className={`absolute ${ringSize} rounded-full border-2 border-blue-500/30`}
        initial={{ scale: 0, opacity: 0 }}
        animate={phase >= 1 ? {
          scale: [0, isMobile ? 1.5 : 2, isMobile ? 2 : 3],
          opacity: [0, 0.5, 0]
        } : {}}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4"
          style={{ fontFamily: "'Heebo', sans-serif" }}
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            {isHebrew ? 'גבי אהרון' : 'Gabi Aharon'}
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-xl md:text-2xl text-gray-300 font-light tracking-wide px-2"
          style={{ fontFamily: "'Assistant', sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {isHebrew ? 'מומחה לשפת גוף ועמידה מול קהל' : 'Body Language & Public Speaking Expert'}
        </motion.p>

        <motion.div
          className="mt-6 md:mt-8 mx-auto h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={phase >= 3 ? { width: isMobile ? 150 : 200, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      </div>

      <motion.p
        className="absolute bottom-6 md:bottom-8 text-gray-500 text-xs md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 0.6 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isHebrew ? 'לחצו לדלג' : 'Click to skip'}
      </motion.p>

      <motion.div
        className="absolute top-0 left-0 w-16 h-16 md:w-32 md:h-32"
        style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%)' }}
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-16 h-16 md:w-32 md:h-32"
        style={{ background: 'linear-gradient(-45deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%)' }}
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  he: {
    nav: {
      services: "שירותים",
      about: "אודות",
      testimonials: "המלצות",
      contact: "צור קשר",
      switchLang: "EN"
    },
    hero: {
      greeting: "שלום, אני",
      name: "גבי אהרון",
      title: "מומחה לשפת גוף ועמידה מול קהל",
      subtitle: "מסייע למנהלים, יזמים ואנשי מקצוע להפוך לדוברים בטוחים ומשפיעים",
      cta: "בואו נדבר",
      ctaSecondary: "גלו עוד",
      liveInAction: "בפעולה",
      signatureLecture: "ההרצאה שלי",
      lectureTitle: "הבמה הכי גדולה היא החיים עצמם"
    },
    stats: {
      years: "שנות ניסיון",
      lectures: "הרצאות וסדנאות",
      participants: "משתתפים",
      satisfaction: "שביעות רצון"
    },
    services: {
      title: "ההרצאות והסדנאות",
      subtitle: "כלים פרקטיים שתוכלו ליישם מיד",
      bodyLanguage: {
        title: "שפת גוף ותקשורת לא מילולית",
        description: "למדו לקרוא ולהשתמש בשפת הגוף כדי להשפיע, לשכנע וליצור אמון מיידי. סדנה אינטראקטיבית עם תרגול מעשי.",
        features: ["קריאת שפת גוף", "יצירת רושם ראשוני", "זיהוי שקרים", "בניית אמון"]
      },
      publicSpeaking: {
        title: "עמידה מול קהל ונוכחות",
        description: "הפכו כל הופעה לחוויה בלתי נשכחת. טכניקות מוכחות לעמידה בטוחה, קול משכנע והעברת מסר חזק.",
        features: ["התגברות על פחד קהל", "טכניקות קול", "בניית מצגת", "אימפרוביזציה"]
      },
      downloadFlyer: "הורידו פלייר"
    },
    about: {
      title: "קצת עליי",
      p1: "אני גבי אהרון - מנהל, מהנדס מכונות ואיש של אנשים. בשנים האחרונות עובד עם מגוון רחב של אנשים - בני נוער, יזמים ומורים.",
      p2: "המטרה שלי היא לחשוף את הפוטנציאל הסמוי שיש בכל אחד מאיתנו להשפיע, לשכנע ולהוביל שינוי.",
      p3: "היכולת לעמוד מול קהל בביטחון, להשתמש בשפת גוף מדויקת ולהעביר מסר חזק - היא לא רק כלי, היא נשק סודי. זה המפתח שפותח דלתות בכל תחומי החיים.",
      quote: "הבמה הכי גדולה היא החיים עצמם"
    },
    testimonials: {
      title: "מה אומרים עליי",
      subtitle: "משובים מלקוחות ומשתתפים"
    },
    ted: {
      title: "הרצאות TED מומלצות",
      subtitle: "אוסף מובחר של ההרצאות הכי טובות בנושא שפת גוף ודיבור מול קהל",
      watch: "צפייה"
    },
    contact: {
      title: "בואו נדבר",
      subtitle: "מעוניינים בהרצאה או סדנה לארגון שלכם? אשמח לשמוע מכם",
      whatsapp: "שלחו הודעה בוואטסאפ",
      email: "שלחו מייל",
      or: "או עקבו אחריי"
    },
    footer: {
      rights: "כל הזכויות שמורות",
      made: "נוצר עם"
    }
  },
  en: {
    nav: {
      services: "Services",
      about: "About",
      testimonials: "Testimonials",
      contact: "Contact",
      switchLang: "עב"
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Gabi Aharon",
      title: "Body Language & Public Speaking Expert",
      subtitle: "Helping executives, entrepreneurs and professionals become confident and influential speakers",
      cta: "Let's Talk",
      ctaSecondary: "Learn More",
      liveInAction: "Live in Action",
      signatureLecture: "My Signature Talk",
      lectureTitle: "The Biggest Stage is Life Itself"
    },
    stats: {
      years: "Years Experience",
      lectures: "Lectures & Workshops",
      participants: "Participants",
      satisfaction: "Satisfaction"
    },
    services: {
      title: "Lectures & Workshops",
      subtitle: "Practical tools you can implement immediately",
      bodyLanguage: {
        title: "Body Language & Non-Verbal Communication",
        description: "Learn to read and use body language to influence, persuade and build instant trust. Interactive workshop with hands-on practice.",
        features: ["Reading body language", "First impressions", "Detecting deception", "Building trust"]
      },
      publicSpeaking: {
        title: "Public Speaking & Presence",
        description: "Turn every appearance into an unforgettable experience. Proven techniques for confident stance, persuasive voice and powerful messaging.",
        features: ["Overcoming stage fright", "Voice techniques", "Presentation building", "Improvisation"]
      },
      downloadFlyer: "Download Flyer"
    },
    about: {
      title: "About Me",
      p1: "I'm Gabi Aharon - a manager, mechanical engineer, and people person. In recent years, I've been working with diverse groups - teenagers, entrepreneurs, and educators.",
      p2: "My mission is to unlock the hidden potential within each of us to influence, persuade, and lead change.",
      p3: "The ability to stand confidently before an audience, use precise body language, and deliver a powerful message - is not just a tool, it's a secret weapon. It's the key that opens doors in every area of life.",
      quote: "The biggest stage is life itself"
    },
    testimonials: {
      title: "What They Say",
      subtitle: "Feedback from clients and participants"
    },
    ted: {
      title: "Recommended TED Talks",
      subtitle: "A curated collection of the best talks on body language and public speaking",
      watch: "Watch"
    },
    contact: {
      title: "Let's Connect",
      subtitle: "Interested in a lecture or workshop for your organization? I'd love to hear from you",
      whatsapp: "Message on WhatsApp",
      email: "Send Email",
      or: "Or follow me"
    },
    footer: {
      rights: "All rights reserved",
      made: "Made with"
    }
  }
};

// Testimonials Data
const testimonialsData = [
  {
    id: 1,
    name: { he: "ד״ר שרה כהן", en: "Dr. Sarah Cohen" },
    title: { he: "מנהלת משאבי אנוש", en: "HR Director" },
    content: {
      he: "גבי הוא מרצה יוצא דופן. ההרצאה שלו על שפת גוף שינתה לחלוטין את האופן שבו הצוות שלנו מתנהל. הכלים הפרקטיים מיושמים אצלנו עד היום.",
      en: "Gabi is an exceptional speaker. His lecture on body language completely changed how our team operates. The practical tools are still being used today."
    },
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: { he: "אורי לוי", en: "Uri Levy" },
    title: { he: "מנכ״ל", en: "CEO" },
    content: {
      he: "הזמנתי את גבי להרצות בכנס השנתי שלנו. התגובות היו מדהימות! המשתתפים עדיין מיישמים את הטכניקות. מרצה שיודע להעביר תוכן מורכב בצורה מרתקת.",
      en: "I invited Gabi to speak at our annual conference. The response was amazing! Participants are still implementing the techniques. A speaker who conveys complex content fascinatingly."
    },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: { he: "דנה אביב", en: "Dana Aviv" },
    title: { he: "מנהלת הדרכות", en: "Training Manager" },
    content: {
      he: "גבי הדריך את מנהלי המכירות שלנו על שפת גוף ונוכחות. התוצאות היו מיידיות - עלייה של 25% בשביעות רצון הלקוחות!",
      en: "Gabi trained our sales managers on body language and presence. The results were immediate - 25% increase in customer satisfaction!"
    },
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

// TED Talks Data
const tedTalks = [
  {
    title: "Your Body Language May Shape Who You Are",
    speaker: "Amy Cuddy",
    url: "https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are",
    views: "71M+",
    image: "https://img.youtube.com/vi/Ks-_Mh1QhMc/mqdefault.jpg"
  },
  {
    title: "How to Speak So That People Want to Listen",
    speaker: "Julian Treasure",
    url: "https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen",
    views: "50M+",
    image: "https://img.youtube.com/vi/eIho2S0ZahI/mqdefault.jpg"
  },
  {
    title: "The Power of Vulnerability",
    speaker: "Brené Brown",
    url: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability",
    views: "62M+",
    image: "https://img.youtube.com/vi/iCvmsMzlF7o/mqdefault.jpg"
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function Preview() {
  const { language, setLanguage } = useLanguage();
  const [showIntro, setShowIntro] = useState(false);
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const isMobile = useIsMobile();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const t = translations[language];
  const isHebrew = language === 'he';

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'he' ? 'en' : 'he');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/972546436659', '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:Gabiaharon@gmail.com', '_blank');
  };

  const handleFlyerDownload = (type) => {
    const link = document.createElement('a');
    link.href = type === 'body' ? '/images/lectureflyer2.jpg' : '/images/lectureflyer1.jpg';
    link.download = type === 'body' ? 'gabi-aharon-body-language.jpg' : 'gabi-aharon-public-speaking.jpg';
    link.click();
    setShowFlyerModal(false);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>{isHebrew ? 'גבי אהרון | מומחה לשפת גוף ועמידה מול קהל' : 'Gabi Aharon | Body Language & Public Speaking Expert'}</title>
      </Head>

      {/* Preview Banner */}
      <div className="fixed top-0 left-0 right-0 z-[300] bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-sm font-medium">
        {isHebrew ? '🔍 תצוגה מקדימה - עיצוב חדש עם גלריית תמונות מורפינג' : '🔍 Preview - New design with morphing image gallery'}
      </div>

      {/* Cinematic Intro */}
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro
            onComplete={() => setShowIntro(false)}
            language={language}
          />
        )}
      </AnimatePresence>

      <GlowingOrb />
      <FloatingParticles />

      <div className={`min-h-screen bg-gradient-to-b from-slate-950 via-gray-950 to-black text-white overflow-x-hidden ${isHebrew ? 'rtl' : 'ltr'}`} style={{ fontFamily: "'Heebo', 'Assistant', sans-serif" }}>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: showIntro ? 4.5 : 0 }}
          className="fixed top-8 left-0 right-0 z-50 px-6 py-4"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between backdrop-blur-md bg-slate-900/50 rounded-full px-6 py-3 border border-white/10">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-500/30">
                G
              </div>
              <span className="font-medium text-lg hidden sm:block">{isHebrew ? 'גבי אהרון' : 'Gabi Aharon'}</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
              {[
                { key: 'services', id: 'services' },
                { key: 'about', id: 'about' },
                { key: 'testimonials', id: 'testimonials' },
                { key: 'contact', id: 'contact' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  {t.nav[item.key]}
                </button>
              ))}
            </div>

            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{t.nav.switchLang}</span>
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero Section - Centered with Enchanted Profile Image */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/40 to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-800/15 to-transparent" />

            {/* Animated Gradient Orb - Responsive size */}
            <motion.div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-5xl mx-auto px-6 text-center"
            style={{ opacity: heroOpacity }}
          >
            {/* Enchanted Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: showIntro ? 4.3 : 0.2 }}
              className="mb-8"
            >
              <EnchantedProfileImage
                src="https://i.postimg.cc/hjqSQKms/Untitled-design1.png"
                alt="Gabi Aharon"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showIntro ? 4.4 : 0.3 }}
              className="text-blue-400 text-lg mb-2 font-light tracking-wide"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showIntro ? 4.5 : 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              style={{ fontFamily: "'Assistant', sans-serif", fontWeight: 800 }}
            >
              {t.hero.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showIntro ? 4.6 : 0.5 }}
              className="text-xl md:text-2xl text-blue-300/90 font-bold mb-6"
              style={{ fontFamily: "'Assistant', sans-serif" }}
            >
              {t.hero.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showIntro ? 4.7 : 0.6 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showIntro ? 4.8 : 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MagneticButton
                onClick={handleWhatsApp}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg overflow-hidden shadow-lg shadow-blue-500/25"
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {t.hero.cta}
                </span>
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection('services')}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                {t.hero.ctaSecondary}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-gray-500" />
          </motion.div>
        </section>

        {/* Lecture Photos Section - Separate section below hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-6xl mx-auto px-6">
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-10"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400/40" />
              <span className="text-blue-400/70 text-sm font-medium tracking-widest uppercase flex items-center gap-2">
                <Camera className="w-4 h-4" />
                {t.hero.liveInAction}
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400/40" />
            </motion.div>

            {/* Photos gallery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <MorphingPortraitGallery images={lectureImages} interval={4000} />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-y border-white/5 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10", suffix: "+", label: t.stats.years, icon: Award },
                { value: "200", suffix: "+", label: t.stats.lectures, icon: Mic },
                { value: "5000", suffix: "+", label: t.stats.participants, icon: Users },
                { value: "98", suffix: "%", label: t.stats.satisfaction, icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + index * 0.3} />
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <TextReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {t.services.title}
                </h2>
              </TextReveal>

              {/* Signature Lecture Badge - Featured under Services Title */}
              <div className="flex justify-center mb-6">
                <SignatureLectureBadge
                  label={t.hero.signatureLecture}
                  title={t.hero.lectureTitle}
                  language={language}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg"
              >
                {t.services.subtitle}
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Body Language Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-3xl p-8 hover:border-purple-400/30 transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400/20 to-purple-600/20 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{t.services.bodyLanguage.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{t.services.bodyLanguage.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {t.services.bodyLanguage.features.map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    onClick={() => setShowFlyerModal(true)}
                    className="flex items-center gap-2 text-purple-400 font-medium hover:gap-3 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <Download className="w-4 h-4" />
                    {t.services.downloadFlyer}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Public Speaking Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-3xl p-8 hover:border-blue-400/30 transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center mb-6">
                    <Mic className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{t.services.publicSpeaking.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{t.services.publicSpeaking.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {t.services.publicSpeaking.features.map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    onClick={() => setShowFlyerModal(true)}
                    className="flex items-center gap-2 text-blue-400 font-medium hover:gap-3 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <Download className="w-4 h-4" />
                    {t.services.downloadFlyer}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />
          <motion.div
            className="hidden md:block absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="hidden md:block absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-500/5 blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="max-w-4xl mx-auto px-6 relative">
            <div className="text-center">
              <TextReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {t.about.title}
                </h2>
              </TextReveal>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                {[t.about.p1, t.about.p2, t.about.p3].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              <motion.blockquote
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-12 relative"
              >
                <motion.div animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                  <Quote className="w-12 h-12 text-blue-400/20 absolute -top-4 left-1/2 -translate-x-1/2" />
                </motion.div>
                <motion.p
                  className="text-2xl md:text-3xl font-medium text-blue-400 italic pt-6"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(59, 130, 246, 0)',
                      '0 0 30px rgba(59, 130, 246, 0.3)',
                      '0 0 20px rgba(59, 130, 246, 0)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  "{t.about.quote}"
                </motion.p>
              </motion.blockquote>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <TextReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {t.testimonials.title}
                </h2>
              </TextReveal>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg"
              >
                {t.testimonials.subtitle}
              </motion.p>
            </div>

            <div className="relative min-h-[320px]">
              <AnimatePresence mode="wait">
                {testimonialsData.map((testimonial, index) => (
                  index === activeTestimonial && (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 md:p-10 text-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name[language]}
                          className="w-20 h-20 rounded-full mx-auto mb-6 border-2 border-blue-400/30 object-cover"
                        />
                        <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed italic">
                          "{testimonial.content[language]}"
                        </p>
                        <div className="flex items-center justify-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />
                          ))}
                        </div>
                        <h4 className="font-semibold text-white">{testimonial.name[language]}</h4>
                        <p className="text-sm text-gray-500">{testimonial.title[language]}</p>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'w-8 bg-blue-400' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* TED Talks Section */}
        <section className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <TextReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {t.ted.title}
                </h2>
              </TextReveal>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg"
              >
                {t.ted.subtitle}
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {tedTalks.map((talk, index) => (
                <motion.a
                  key={index}
                  href={talk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={talk.image}
                      alt={talk.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-xs text-gray-300">
                      {talk.views} views
                    </div>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                    {talk.title}
                  </h3>
                  <p className="text-sm text-gray-500">{talk.speaker}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-green-500/10 blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-blue-500/10 blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div className="max-w-3xl mx-auto px-6 text-center relative">
            <div>
              <TextReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {t.contact.title}
                </h2>
              </TextReveal>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg mb-12"
              >
                {t.contact.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                <MagneticButton
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-500/25 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/20"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <MessageCircle className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{t.contact.whatsapp}</span>
                </MagneticButton>

                <MagneticButton
                  onClick={handleEmail}
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-semibold flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  {t.contact.email}
                </MagneticButton>
              </motion.div>

              <p className="text-gray-500 text-sm mb-6">{t.contact.or}</p>

              <div className="flex items-center justify-center gap-4">
                {[
                  { icon: Instagram, url: "https://instagram.com/gabi.aharon", color: "hover:text-pink-400" },
                  { icon: Linkedin, url: "https://linkedin.com/in/gabi-aharon", color: "hover:text-blue-400" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {isHebrew ? 'גבי אהרון' : 'Gabi Aharon'}. {t.footer.rights}.
            </p>
            <p className="text-gray-600 text-xs mt-2 flex items-center justify-center gap-1">
              {t.footer.made} <Sparkles className="w-3 h-3 text-blue-400" />
            </p>
          </div>
        </footer>

        {/* Flyer Modal */}
        <AnimatePresence>
          {showFlyerModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
              onClick={() => setShowFlyerModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">{isHebrew ? 'בחר סוג הרצאה' : 'Choose Lecture Type'}</h3>
                  <button onClick={() => setShowFlyerModal(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-3">
                  <motion.button
                    onClick={() => handleFlyerDownload('body')}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-400/20 hover:border-purple-400/40 transition-all flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Target className="w-8 h-8 text-purple-400 flex-shrink-0" />
                    <div className={isHebrew ? 'text-right flex-1' : 'text-left flex-1'}>
                      <div className="font-semibold">{t.services.bodyLanguage.title}</div>
                      <div className="text-sm text-gray-400">{isHebrew ? 'הורד פלייר' : 'Download flyer'}</div>
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => handleFlyerDownload('speaking')}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-400/20 hover:border-blue-400/40 transition-all flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mic className="w-8 h-8 text-blue-400 flex-shrink-0" />
                    <div className={isHebrew ? 'text-right flex-1' : 'text-left flex-1'}>
                      <div className="font-semibold">{t.services.publicSpeaking.title}</div>
                      <div className="text-sm text-gray-400">{isHebrew ? 'הורד פלייר' : 'Download flyer'}</div>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
