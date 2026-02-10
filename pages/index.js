import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Instagram, Linkedin, MessageCircle, Mail, ChevronDown, Star, Quote, Users, Mic, Target, Award, Download, Sparkles } from "lucide-react";
import { useLanguage } from './_app';
import Head from 'next/head';

// ============================================
// MOBILE HOOK
// ============================================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// ============================================
// DATA
// ============================================
const PROFILE_IMG = "https://i.postimg.cc/hjqSQKms/Untitled-design1.png";

const LECTURE_IMAGES = [
  { src: "https://i.postimg.cc/qRw4Tb0d/IMG-20241209-WA0055.jpg", alt: "Lecture 1" },
  { src: "https://i.postimg.cc/BQXsrBzv/IMG-20250109-WA0062.jpg", alt: "Lecture 2" },
  { src: "https://i.postimg.cc/nhmxzcZd/IMG-20250511-WA0122.jpg", alt: "Lecture 3" },
  { src: "https://i.postimg.cc/ZRMsppxr/IMG-20260113-WA0016.jpg", alt: "Lecture 4" },
];

const STATS = [
  { value: 10, suffix: "+", he: "שנות ניסיון", en: "Years Experience" },
  { value: 200, suffix: "+", he: "הרצאות וסדנאות", en: "Lectures & Workshops" },
  { value: 5000, suffix: "+", he: "משתתפים", en: "Participants" },
  { value: 98, suffix: "%", he: "שביעות רצון", en: "Satisfaction" },
];

const SERVICES = [
  {
    icon: Target,
    he: { title: "שפת גוף ותקשורת לא מילולית", desc: "למדו לקרוא ולהשתמש בשפת הגוף כדי להשפיע, לשכנע וליצור אמון מיידי. סדנה אינטראקטיבית עם תרגול מעשי.", tags: ["קריאת שפת גוף", "רושם ראשוני", "זיהוי שקרים", "בניית אמון"] },
    en: { title: "Body Language & Non-Verbal Communication", desc: "Learn to read and use body language to influence, persuade and build instant trust. Interactive workshop with hands-on practice.", tags: ["Reading body language", "First impressions", "Detecting deception", "Building trust"] },
  },
  {
    icon: Mic,
    he: { title: "עמידה מול קהל ונוכחות", desc: "הפכו כל הופעה לחוויה בלתי נשכחת. טכניקות מוכחות לעמידה בטוחה, קול משכנע והעברת מסר חזק.", tags: ["התגברות על פחד קהל", "טכניקות קול", "בניית מצגת", "אימפרוביזציה"] },
    en: { title: "Public Speaking & Presence", desc: "Turn every appearance into an unforgettable experience. Proven techniques for confident stance, persuasive voice and powerful messaging.", tags: ["Overcoming stage fright", "Voice techniques", "Presentation building", "Improvisation"] },
  },
];

const TESTIMONIALS = [
  {
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    he: { name: "ד״ר שרה כהן", role: "מנהלת משאבי אנוש", quote: "גבי הוא מרצה יוצא דופן. ההרצאה שלו על שפת גוף שינתה לחלוטין את האופן שבו הצוות שלנו מתנהל. הכלים הפרקטיים מיושמים אצלנו עד היום." },
    en: { name: "Dr. Sarah Cohen", role: "HR Director", quote: "Gabi is an exceptional speaker. His lecture on body language completely changed how our team operates. The practical tools are still being used today." },
  },
  {
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    he: { name: "אורי לוי", role: "מנכ״ל", quote: "הזמנתי את גבי להרצות בכנס השנתי שלנו. התגובות היו מדהימות! המשתתפים עדיין מיישמים את הטכניקות. מרצה שיודע להעביר תוכן מורכב בצורה מרתקת." },
    en: { name: "Uri Levy", role: "CEO", quote: "I invited Gabi to speak at our annual conference. The response was amazing! Participants are still implementing the techniques. A speaker who conveys complex content fascinatingly." },
  },
  {
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    he: { name: "דנה אביב", role: "מנהלת הדרכות", quote: "גבי הדריך את מנהלי המכירות שלנו על שפת גוף ונוכחות. התוצאות היו מיידיות - עלייה של 25% בשביעות רצון הלקוחות!" },
    en: { name: "Dana Aviv", role: "Training Manager", quote: "Gabi trained our sales managers on body language and presence. The results were immediate - 25% increase in customer satisfaction!" },
  },
];

const TED_TALKS = [
  { speaker: "Amy Cuddy", views: "71M+", url: "https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are", thumb: "https://img.youtube.com/vi/Ks-_Mh1QhMc/mqdefault.jpg", he: "שפת הגוף שלך מעצבת מי אתה", en: "Your Body Language May Shape Who You Are" },
  { speaker: "Julian Treasure", views: "50M+", url: "https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen", thumb: "https://img.youtube.com/vi/eIho2S0ZahI/mqdefault.jpg", he: "איך לדבר כך שאנשים ירצו להקשיב", en: "How to Speak So That People Want to Listen" },
  { speaker: "Brene Brown", views: "62M+", url: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability", thumb: "https://img.youtube.com/vi/iCvmsMzlF7o/mqdefault.jpg", he: "כוחה של הפגיעות", en: "The Power of Vulnerability" },
];

// ============================================
// ANIMATED COUNTER
// ============================================
const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(value);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ============================================
// PROFILE IMAGE WITH ORBITAL RINGS
// ============================================
const ProfileImage = () => (
  <motion.div
    className="relative mx-auto"
    style={{ width: 240, height: 240 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
  >
    {/* Glow */}
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ inset: -28, background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(147,51,234,0.12) 50%, transparent 70%)" }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Rings */}
    <motion.div className="absolute rounded-full pointer-events-none" style={{ inset: -8, border: "1.5px solid rgba(59,130,246,0.4)" }} animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
    <motion.div className="absolute rounded-full pointer-events-none" style={{ inset: -16, border: "1px solid rgba(147,51,234,0.25)" }} animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} />
    <motion.div className="absolute rounded-full pointer-events-none" style={{ inset: -24, border: "1px solid rgba(59,130,246,0.12)" }} animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
    {/* Orbital dot */}
    <motion.div className="absolute pointer-events-none" style={{ inset: -8, borderRadius: "50%" }} animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
      <div className="absolute top-0 left-1/2 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/60" style={{ transform: "translate(-50%,-50%)" }} />
    </motion.div>
    {/* Photo */}
    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-blue-500/40" style={{ boxShadow: "0 0 40px rgba(59,130,246,0.28), 0 0 80px rgba(147,51,234,0.12)" }}>
      <img src={PROFILE_IMG} alt="Gabi Aharon" className="w-full h-full object-cover" />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%)" }} animate={{ x: ["-200%", "200%"] }} transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }} />
    </div>
  </motion.div>
);

// ============================================
// LECTURE GALLERY
// ============================================
const LectureGallery = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % LECTURE_IMAGES.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-end gap-3">
        {LECTURE_IMAGES.map((img, i) => {
          const isActive = i === active;
          return (
            <motion.div key={i} onClick={() => setActive(i)} className="relative cursor-pointer rounded-xl overflow-hidden" animate={{ scale: isActive ? 1.06 : 0.93, opacity: isActive ? 1 : 0.5 }} transition={{ duration: 0.4 }} style={{ width: isActive ? 110 : 88, height: isActive ? 155 : 128 }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              {!isActive && <div className="absolute inset-0 bg-slate-950/50" />}
              {isActive && <div className="absolute inset-0 rounded-xl ring-2 ring-blue-400/60" />}
            </motion.div>
          );
        })}
      </div>
      <div className="flex gap-2">
        {LECTURE_IMAGES.map((_, i) => (
          <motion.button key={i} onClick={() => setActive(i)} className={`rounded-full transition-all duration-300 ${i === active ? "w-6 h-2 bg-blue-400" : "w-2 h-2 bg-white/20"}`} whileHover={{ scale: 1.2 }} />
        ))}
      </div>
    </div>
  );
};

// ============================================
// FLOATING PARTICLES BACKGROUND
// ============================================
const Particles = () => {
  const [particles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 6,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full bg-blue-400/15" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }} animate={{ y: [0, -25, 0], opacity: [0.1, 0.35, 0.1] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
};

// ============================================
// SCROLL REVEAL — client-only so SSR is never opacity:0
// ============================================
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => { setMounted(true); }, []);

  // Before hydration: render fully visible (no animation)
  if (!mounted) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] }}>
      {children}
    </motion.div>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const isMobile = useIsMobile();
  const isHe = language === "he";

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const navItems = [
    { key: "services", he: "שירותים", en: "Services" },
    { key: "about", he: "אודות", en: "About" },
    { key: "testimonials", he: "המלצות", en: "Testimonials" },
    { key: "contact", he: "צור קשר", en: "Contact" },
  ];

  return (
    <>
      <Head>
        <title>{isHe ? "גבי אהרון | מומחה לשפת גוף ועמידה מול קהל" : "Gabi Aharon | Body Language & Public Speaking Expert"}</title>
        <meta name="description" content={isHe ? "מומחה לשפת גוף ועמידה מול קהל" : "Body Language & Public Speaking Expert"} />
      </Head>

      <div className={`min-h-screen bg-gradient-to-b from-slate-950 via-gray-950 to-black text-white overflow-x-hidden ${isHe ? "rtl" : "ltr"}`} style={{ fontFamily: "'Heebo', 'Assistant', sans-serif" }}>
        <Particles />

        {/* NAV */}
        <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between backdrop-blur-md bg-slate-900/60 rounded-full px-6 py-3 border border-white/10">
            <span className="font-bold text-white text-base" style={{ fontFamily: "'Assistant', sans-serif" }}>{isHe ? "גבי אהרון" : "Gabi Aharon"}</span>
            <div className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <a key={item.key} href={`#${item.key}`} className="text-sm text-gray-300 hover:text-white transition-colors">{isHe ? item.he : item.en}</a>
              ))}
            </div>
            <button onClick={() => setLanguage(isHe ? "en" : "he")} className="text-xs text-gray-300 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-3 py-1.5 transition-all">
              {isHe ? "EN" : "עב"}
            </button>
          </div>
        </motion.nav>

        {/* HERO */}
        <section className="relative min-h-screen flex items-center pt-24 pb-16">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-8" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 w-full">
            <div className={`flex flex-col items-center gap-12 ${!isMobile && (isHe ? "md:flex-row-reverse" : "md:flex-row")} ${!isMobile && "md:items-center"}`}>

              {/* Image */}
              <div className="flex flex-col items-center gap-5 flex-shrink-0">
                <ProfileImage />
                <motion.div animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }} className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2">
                  <Sparkles size={13} className="text-amber-400" />
                  <span className="text-amber-300 text-xs font-medium">{isHe ? "ההרצאה שלי | הבמה הכי גדולה היא החיים עצמם" : "My Talk | The Biggest Stage is Life Itself"}</span>
                </motion.div>
              </div>

              {/* Text */}
              <div className={`flex-1 ${isMobile ? "text-center" : isHe ? "text-right" : "text-left"}`}>
                <motion.p animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-blue-400 text-lg mb-2">{isHe ? "שלום, אני" : "Hello, I'm"}</motion.p>
                <motion.h1 animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="font-black leading-tight mb-3" style={{ fontSize: isMobile ? "2.8rem" : "3.8rem", fontFamily: "'Assistant', sans-serif" }}>
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">{isHe ? "גבי אהרון" : "Gabi Aharon"}</span>
                </motion.h1>
                <motion.h2 animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl text-blue-300 font-medium mb-4">
                  {isHe ? "מומחה לשפת גוף ועמידה מול קהל" : "Body Language & Public Speaking Expert"}
                </motion.h2>
                <motion.p animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="text-gray-400 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
                  {isHe ? "מסייע למנהלים, יזמים ואנשי מקצוע להפוך לדוברים בטוחים ומשפיעים" : "Helping executives, entrepreneurs and professionals become confident and influential speakers"}
                </motion.p>
                <motion.div animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className={`flex gap-4 flex-wrap ${isMobile ? "justify-center" : isHe ? "justify-end" : "justify-start"}`}>
                  <motion.a href="https://wa.me/972546436659" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <MessageCircle size={16} />{isHe ? "בואו נדבר" : "Let's Talk"}
                  </motion.a>
                  <motion.a href="#services" className="flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    {isHe ? "גלו עוד" : "Learn More"}<ChevronDown size={16} />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* LECTURE PHOTOS */}
        <section className="py-14 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-8">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{isHe ? "בפעולה" : "Live in Action"}</p>
              <div className="w-10 h-px bg-blue-500/40 mx-auto" />
            </Reveal>
            <Reveal delay={0.1}><LectureGallery /></Reveal>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 px-6 border-y border-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <span className="text-4xl md:text-5xl font-black text-white block mb-1" style={{ fontFamily: "'Assistant', sans-serif" }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </span>
                <span className="text-gray-400 text-sm">{isHe ? s.he : s.en}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ fontFamily: "'Assistant', sans-serif" }}>{isHe ? "ההרצאות והסדנאות" : "Lectures & Workshops"}</h2>
              <p className="text-gray-400">{isHe ? "כלים פרקטיים שתוכלו ליישם מיד" : "Practical tools you can implement immediately"}</p>
              <div className="w-14 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4" />
            </Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES.map((svc, i) => {
                const Icon = svc.icon;
                const c = isHe ? svc.he : svc.en;
                return (
                  <Reveal key={i} delay={i * 0.15}>
                    <motion.div className="relative p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 overflow-hidden group" whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.4)" }} transition={{ duration: 0.25 }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.07), transparent 60%)" }} />
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                          <Icon size={22} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold" style={{ fontFamily: "'Assistant', sans-serif" }}>{c.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-5">{c.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {c.tags.map((tag, ti) => <span key={ti} className="text-xs bg-blue-900/30 text-blue-300 border border-blue-500/20 rounded-full px-3 py-1">{tag}</span>)}
                      </div>
                      <motion.button onClick={() => setShowFlyerModal(true)} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium" whileHover={{ x: isHe ? -4 : 4 }}>
                        <Download size={14} />{isHe ? "הורידו פלייר" : "Download Flyer"}
                      </motion.button>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-5xl mx-auto">
            <div className={`flex flex-col gap-12 ${!isMobile && (isHe ? "md:flex-row-reverse" : "md:flex-row")} items-center`}>
              <Reveal className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ fontFamily: "'Assistant', sans-serif" }}>{isHe ? "קצת עליי" : "About Me"}</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                  <p>{isHe ? "אני גבי אהרון - מנהל, מהנדס מכונות ואיש של אנשים. בשנים האחרונות עובד עם מגוון רחב של אנשים - בני נוער, יזמים ומורים." : "I'm Gabi Aharon - a manager, mechanical engineer, and people person. In recent years, I've been working with diverse groups - teenagers, entrepreneurs, and educators."}</p>
                  <p>{isHe ? "המטרה שלי היא לחשוף את הפוטנציאל הסמוי שיש בכל אחד מאיתנו להשפיע, לשכנע ולהוביל שינוי." : "My mission is to unlock the hidden potential within each of us to influence, persuade, and lead change."}</p>
                  <p>{isHe ? "היכולת לעמוד מול קהל בביטחון, להשתמש בשפת גוף מדויקת ולהעביר מסר חזק - היא לא רק כלי, היא נשק סודי." : "The ability to stand confidently before an audience, use precise body language, and deliver a powerful message - is not just a tool, it's a secret weapon."}</p>
                </div>
                <motion.blockquote className="mt-8 border-r-4 border-blue-500 pr-5 py-1" whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                  <Quote size={16} className="text-blue-400 mb-2" />
                  <p className="text-blue-200 text-lg italic font-medium">{isHe ? "הבמה הכי גדולה היא החיים עצמם" : "The biggest stage is life itself"}</p>
                </motion.blockquote>
              </Reveal>
              <Reveal delay={0.2} className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-4">
                  {[{ icon: Award, he: "10+ שנות ניסיון", en: "10+ Years Exp." }, { icon: Users, he: "5000+ משתתפים", en: "5000+ People" }, { icon: Mic, he: "200+ הרצאות", en: "200+ Talks" }, { icon: Star, he: "98% שביעות רצון", en: "98% Satisfaction" }].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={i} className="p-5 rounded-xl bg-slate-800/60 border border-white/10 text-center" whileHover={{ scale: 1.03, borderColor: "rgba(59,130,246,0.4)" }} transition={{ duration: 0.2 }}>
                        <Icon size={20} className="text-blue-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-300">{isHe ? item.he : item.en}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ fontFamily: "'Assistant', sans-serif" }}>{isHe ? "מה אומרים עליי" : "What They Say"}</h2>
              <p className="text-gray-400">{isHe ? "משובים מלקוחות ומשתתפים" : "Feedback from clients and participants"}</p>
              <div className="w-14 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4" />
            </Reveal>
            <AnimatePresence mode="wait">
              <motion.div key={activeTestimonial} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }} className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10">
                <Quote size={26} className="text-blue-500/40 mb-4" />
                <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-8">{isHe ? TESTIMONIALS[activeTestimonial].he.quote : TESTIMONIALS[activeTestimonial].en.quote}</p>
                <div className="flex items-center gap-4">
                  <img src={TESTIMONIALS[activeTestimonial].photo} alt="" className="w-11 h-11 rounded-full object-cover border-2 border-blue-500/40" />
                  <div>
                    <p className="font-bold text-white text-sm">{isHe ? TESTIMONIALS[activeTestimonial].he.name : TESTIMONIALS[activeTestimonial].en.name}</p>
                    <p className="text-blue-400 text-xs">{isHe ? TESTIMONIALS[activeTestimonial].he.role : TESTIMONIALS[activeTestimonial].en.role}</p>
                  </div>
                  <div className={`${isHe ? "mr-auto" : "ml-auto"} flex gap-0.5`}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-5">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-8 h-2 bg-blue-400" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`} />
              ))}
            </div>
          </div>
        </section>

        {/* TED TALKS */}
        <section className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ fontFamily: "'Assistant', sans-serif" }}>{isHe ? "הרצאות TED מומלצות" : "Recommended TED Talks"}</h2>
              <p className="text-gray-400">{isHe ? "אוסף מובחר של ההרצאות הכי טובות בנושא שפת גוף ודיבור מול קהל" : "A curated collection of the best talks on body language and public speaking"}</p>
              <div className="w-14 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4" />
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {TED_TALKS.map((talk, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <motion.a href={talk.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden border border-white/10 bg-slate-900/60 group" whileHover={{ y: -4, borderColor: "rgba(239,68,68,0.4)" }} transition={{ duration: 0.25 }}>
                    <div className="relative overflow-hidden">
                      <img src={talk.thumb} alt={talk.en} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-11 h-11 rounded-full bg-red-600/90 flex items-center justify-center">
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="white"><path d="M0 0L14 8L0 16V0Z"/></svg>
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded">{talk.views}</span>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-white text-sm mb-1 leading-snug">{isHe ? talk.he : talk.en}</p>
                      <p className="text-gray-500 text-xs">{talk.speaker}</p>
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Assistant', sans-serif" }}>{isHe ? "בואו נדבר" : "Let's Connect"}</h2>
              <p className="text-gray-400 mb-10">{isHe ? "מעוניינים בהרצאה או סדנה לארגון שלכם? אשמח לשמוע מכם" : "Interested in a lecture or workshop for your organization? I'd love to hear from you"}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <motion.a href="https://wa.me/972546436659" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-full transition-colors" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <MessageCircle size={19} />{isHe ? "שלחו הודעה בוואטסאפ" : "Message on WhatsApp"}
                </motion.a>
                <motion.a href="mailto:Gabiaharon@gmail.com" className="flex items-center justify-center gap-3 border border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-full transition-colors" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Mail size={19} />{isHe ? "שלחו מייל" : "Send Email"}
                </motion.a>
              </div>
              <p className="text-gray-500 text-sm mb-5">{isHe ? "או עקבו אחריי" : "Or follow me"}</p>
              <div className="flex justify-center gap-4">
                <motion.a href="https://instagram.com/gabi.aharon" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500/50 transition-all" whileHover={{ scale: 1.1, y: -2 }}><Instagram size={17} /></motion.a>
                <motion.a href="https://linkedin.com/in/gabi-aharon" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all" whileHover={{ scale: 1.1, y: -2 }}><Linkedin size={17} /></motion.a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-6 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} {isHe ? "גבי אהרון. כל הזכויות שמורות." : "Gabi Aharon. All rights reserved."}</p>
        </footer>

        {/* FLYER MODAL */}
        <AnimatePresence>
          {showFlyerModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setShowFlyerModal(false)}>
              <motion.div initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 24 }} transition={{ type: "spring", damping: 22 }} className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Assistant', sans-serif" }}>{isHe ? "בחר סוג הרצאה" : "Choose Lecture Type"}</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: isHe ? "שפת גוף - הורד פלייר" : "Body Language - Download", file: "/images/lectureflyer2.jpg", name: "gabi-body-language.jpg" },
                    { label: isHe ? "עמידה מול קהל - הורד פלייר" : "Public Speaking - Download", file: "/images/lectureflyer1.jpg", name: "gabi-public-speaking.jpg" },
                  ].map((f, i) => (
                    <a key={i} href={f.file} download={f.name} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-medium transition-colors">
                      <Download size={15} />{f.label}
                    </a>
                  ))}
                </div>
                <button onClick={() => setShowFlyerModal(false)} className="mt-6 text-gray-500 text-sm hover:text-gray-300 transition-colors">{isHe ? "סגור" : "Close"}</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
