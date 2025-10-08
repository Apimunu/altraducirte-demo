// Frase gancho animada con zoom y fade al hacer scroll
function HookPhrase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 1.18]);
  // El texto es 100% visible (negro puro) al inicio y se desvanece con el scroll
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.2, 0]);
  // El color permanece negro puro, solo se desvanece por opacidad
  const color = "#000";
  return (
    <div ref={ref} className="w-full flex justify-center mt-[-2.5rem] md:mt-[-3.5rem]">
      <motion.div
        style={{ scale, opacity }}
        className="w-full max-w-3xl px-2 py-1 md:py-2"
      >
        <motion.h2
          className="text-center text-3xl md:text-4xl font-semibold tracking-tight"
          style={{ color }}
        >
          Detrás de cada texto hay una historia que merece ser bien contada
        </motion.h2>
      </motion.div>
    </div>
  );
}
// Componente para animar el cambio de texto con efecto flip

import './i18n';
import { Search, ShoppingBag, Home, BookOpen, Briefcase, User, Mail, MapPin, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
// (eliminado duplicado)
// (eliminado duplicado)


function FlipText({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const [flipping, setFlipping] = useState(false);
  const prevText = useRef(text);
  useEffect(() => {
    if (prevText.current !== text) {
      setFlipping(true);
      setTimeout(() => {
        setDisplay(text);
      }, 120);
      setTimeout(() => {
        setFlipping(false);
        prevText.current = text;
      }, 320);
    }
  }, [text]);
  return (
    <span
      className={`inline-block transition-transform duration-300 ${flipping ? 'animate-flip' : ''} ${className}`}
      style={{ perspective: 400 }}
    >
      {display}
    </span>
  );
}
import './i18n';
// (eliminado duplicado)
import { useRef, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

// --- Config rápido para demo con texto e imágenes de prueba (estilo Apple scroll) ---
const config = {
  brand: "Altraducirte",
  email: "altraducirte@gmail.com",
  location: "Barcelona, España",
  // imágenes libres (Unsplash) para demo
  imgs: {
    desk:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2400&auto=format&fit=crop",
    tablet:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2000&auto=format&fit=crop",
    notes:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2000&auto=format&fit=crop",
    books:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop",
  },
};

function StickyHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  return (
    <section ref={ref} className="relative h-[160vh]">
      <motion.div
        style={{ y, opacity }}
        className="sticky top-0 h-screen w-full bg-center bg-cover"
      >
        <div
          className="h-full w-full bg-black/50"
          style={{ backgroundImage: `url(${config.imgs.desk})`, backgroundBlendMode: "multiply" }}
        >
          <div className="container mx-auto h-full px-6 flex items-center">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <TypewriterGreetings />
              </h1>
              <p className="mt-6 text-lg md:text-2xl font-medium">
                Mi nombre es Noelia Bas y soy traductora de francés, inglés y ruso a español
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Componente Typewriter para los saludos
function TypewriterGreetings() {
  const greetings = ["Hola", "Hi", "Bonjour", "Привет"];
  const [text, setText] = useState("");
  const [greetIdx, setGreetIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = greetings[greetIdx];
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(charIdx + 1), 140); // más lento
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1600); // espera más
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(charIdx - 1), 70); // más lento
    } else if (deleting && charIdx === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setGreetIdx((greetIdx + 1) % greetings.length);
      }, 600); // espera más
    }
    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, greetIdx]);

  return (
    <span className="inline-block min-w-[7ch]">{text}<span className="animate-pulse">|</span></span>
  );
}

// Componente Typewriter para el bloque de servicios
function TypewriterServices() {
  const services = [
    {
      lang: "es",
      lines: [
        "Traducción",
        "Francés, inglés y ruso a español, con foco en tono y contexto cultural.",
        "",
        "Revisión",
        "Corrección ortotipográfica y de estilo. Entregas limpias listas para publicar.",
        "",
        "Localización",
        "Web y producto. Mensajes que suenan naturales y convierten."
      ]
    },
    {
      lang: "en",
      lines: [
        "Translation",
        "French, English and Russian to Spanish, focused on tone and cultural context.",
        "",
        "Proofreading",
        "Orthotypographic and style correction. Clean deliveries ready to publish.",
        "",
        "Localization",
        "Web and product. Messages that sound natural and convert."
      ]
    },
    {
      lang: "fr",
      lines: [
        "Traduction",
        "Français, anglais et russe vers l'espagnol, avec attention au ton et au contexte culturel.",
        "",
        "Révision",
        "Correction orthotypographique et de style. Livraisons prêtes à publier.",
        "",
        "Localisation",
        "Web et produit. Messages naturels qui convertissent."
      ]
    },
    {
      lang: "ru",
      lines: [
        "Перевод",
        "С французского, английского и русского на испанский, с акцентом на тон и культурный контекст.",
        "",
        "Редактирование",
        "Орфографическая и стилистическая правка. Готово к публикации.",
        "",
        "Локализация",
        "Веб и продукт. Сообщения, которые звучат естественно и убеждают."
      ]
    }
  ];
  const [langIdx, setLangIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [display, setDisplay] = useState<string[]>([""]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const lines = services[langIdx].lines;
    const currentLine = lines[lineIdx] || "";
    if (!deleting && charIdx < currentLine.length) {
      timeout = setTimeout(() => {
        setDisplay(prev => {
          const newDisplay = [...prev];
          newDisplay[lineIdx] = currentLine.slice(0, charIdx + 1);
          return newDisplay;
        });
        setCharIdx(charIdx + 1);
      }, 30);
    } else if (!deleting && charIdx === currentLine.length) {
      if (lineIdx < lines.length - 1) {
        timeout = setTimeout(() => {
          setLineIdx(lineIdx + 1);
          setCharIdx(0);
          setDisplay(prev => [...prev, ""]);
        }, 400);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else if (deleting && lineIdx >= 0) {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplay(prev => {
            const newDisplay = [...prev];
            newDisplay[lineIdx] = currentLine.slice(0, charIdx - 1);
            return newDisplay;
          });
          setCharIdx(charIdx - 1);
        }, 10);
      } else if (lineIdx > 0) {
        timeout = setTimeout(() => {
          setLineIdx(lineIdx - 1);
          setCharIdx(lines[lineIdx - 1]?.length || 0);
          setDisplay(prev => prev.slice(0, -1));
        }, 10);
      } else {
        timeout = setTimeout(() => {
          setDeleting(false);
          setLangIdx((langIdx + 1) % services.length);
          setLineIdx(0);
          setCharIdx(0);
          setDisplay([""]);
        }, 400);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, lineIdx, deleting, langIdx]);

  return (
    <div className="whitespace-pre-line min-h-[12rem]">
      {display.map((line, i) => (
        <div key={i} className="text-left text-lg md:text-xl font-medium">
          {line}
          {i === display.length - 1 && <span className="animate-pulse">|</span>}
        </div>
      ))}
    </div>
  );
}

function FeatureBlock({ title, body, img, flip = false, id }: { title: string; body: string; img: string; flip?: boolean; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  return (
    <section ref={ref} className="py-24" id={id}>
      <div className={`container mx-auto grid items-center gap-12 px-6 md:grid-cols-2 ${flip ? "md:[&>div:first-child]:order-2" : ""}`}>
        <motion.div style={{ opacity, y }}>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-5 text-neutral-600 text-lg leading-relaxed">
            {body}
          </p>
        </motion.div>
        <motion.div style={{ opacity, y }} className="rounded-3xl overflow-hidden shadow-xl border">
          <img src={img} alt="demo" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

function PinPanel() {
  // panel fijado que va cambiando el texto con el progreso
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.08]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <section ref={ref} className="min-h-[180vh] flex justify-center">
      <div className="sticky top-10 left-0 z-10 w-full">
        <div className="w-full px-0">
          <motion.div
            style={{ scale, borderRadius: radius as any }}
            className="w-full h-screen bg-neutral-900 text-white p-8 md:p-14 shadow-2xl flex justify-center items-center"
          >
            <div className="w-full grid md:grid-cols-3 gap-10 place-items-center">
              {/* Traducción */}
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 mb-6 rounded-xl bg-neutral-200 flex items-center justify-center text-3xl md:text-4xl text-amber-800 font-bold">T</div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 text-amber-100 leading-tight">Traducción</h3>
                <p className="text-neutral-200 mb-6 text-lg md:text-xl leading-snug">
                  Cada palabra cuenta y cada matiz importa. Con mis traducciones, tu mensaje no solo cambia de idioma: se transforma para sonar natural, preciso y auténtico. Ya sea un artículo, un texto comercial o contenido creativo, adapto cada frase para que refleje tu intención original, respetando el estilo y la voz que quieres proyectar.
                </p>
                <ul className="text-left text-neutral-200 text-sm space-y-1 mt-2">
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Traducción jurídica</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Turismo</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Marketing</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Educación</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Moda y cosmética</li>
                </ul>
              </div>
              {/* Subtitulación */}
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 mb-6 rounded-xl bg-neutral-200 flex items-center justify-center text-3xl md:text-4xl text-amber-800 font-bold">S</div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 text-amber-100 leading-tight">Subtitulación</h3>
                <p className="text-neutral-200 mb-6 text-lg md:text-xl leading-snug">
                  Los vídeos no solo se ven, se sienten. Con mis servicios de subtitulación, cada línea encaja <span className="font-semibold text-white">perfectamente con la imagen y el ritmo del contenido</span>, manteniendo la claridad y la emoción. El resultado: un espectador que entiende, conecta y disfruta, sin distracciones ni pérdida de sentido.
                </p>
                <ul className="text-left text-neutral-200 text-sm space-y-1 mt-2">
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Vídeos instructivos</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Proyectos cinematográficos y series</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Videotutoriales</li>
                </ul>
              </div>
              {/* Localización */}
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-20 h-20 mb-6 rounded-xl bg-neutral-200 flex items-center justify-center text-3xl md:text-4xl text-amber-800 font-bold">L</div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 text-amber-100 leading-tight">Localización</h3>
                <p className="text-neutral-200 mb-6 text-lg md:text-xl leading-snug">
                  Un contenido global necesita un enfoque local. Con la localización, adapto tu texto, app o página web para que <span className="font-semibold text-white">resuene culturalmente</span>, sin perder tu identidad. Cada detalle, desde expresiones hasta referencias culturales, se ajusta para que tu público se sienta entendido y conectado.
                </p>
                <ul className="text-left text-neutral-200 text-sm space-y-1 mt-2">
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Páginas web</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Apps y software</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Ecommerce</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Videojuegos</li>
                  <li className="before:content-['■'] before:mr-2 before:text-amber-400">Textos publicitarios</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="h-[140vh]" />
    </section>
  );
}

function CTA({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement> }) {
  return (
    <section className="py-28" ref={ctaRef}>
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-semibold">¿Vemos cómo quedaría tu proyecto?</h3>
        <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
          Esta es solo una demo de desplazamiento. Podemos ajustar tipografías, colores y animaciones al estilo que prefieras.
        </p>
        <a
          href={`mailto:${config.email}`}
          className="inline-block mt-8 rounded-full bg-white/90 px-6 py-3 text-neutral-900 font-semibold shadow-xl border border-neutral-200 backdrop-blur hover:bg-white transition-all group text-lg"
        >
          Trabajemos juntos
          <span className="ml-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 group-hover:bg-blue-700 transition-all">
            <ArrowRight className="w-5 h-5 text-white" />
          </span>
        </a>
      </div>
    </section>
  );
}

// Nueva sección de servicios principales
function ServiciosModernos() {
  return (
    <section className="py-24 bg-white flex justify-center">
      <div className="w-full max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Traducción */}
          <div className="flex flex-col items-center text-center border border-neutral-200 rounded-2xl p-8 shadow-sm bg-neutral-50">
            <div className="w-24 h-24 mb-6 rounded-xl bg-neutral-200 flex items-center justify-center text-4xl text-amber-800 font-bold">T</div>
            <h3 className="text-2xl font-bold mb-4 text-amber-900">Traducción</h3>
            <p className="text-neutral-700 mb-4 text-base">
              Cada palabra cuenta y cada matiz importa. Con mis traducciones, tu mensaje no solo cambia de idioma: se transforma para sonar natural, preciso y auténtico. Ya sea un artículo, un texto comercial o contenido creativo, adapto cada frase para que refleje tu intención original, respetando el estilo y la voz que quieres proyectar.
            </p>
            <ul className="text-left text-neutral-700 text-sm space-y-1 mt-2">
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Traducción jurídica</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Turismo</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Marketing</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Educación</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Moda y cosmética</li>
            </ul>
          </div>
          {/* Subtitulación */}
          <div className="flex flex-col items-center text-center border border-neutral-200 rounded-2xl p-8 shadow-sm bg-neutral-50">
            <div className="w-24 h-24 mb-6 rounded-xl bg-neutral-200 flex items-center justify-center text-4xl text-amber-800 font-bold">S</div>
            <h3 className="text-2xl font-bold mb-4 text-amber-900">Subtitulación</h3>
            <p className="text-neutral-700 mb-4 text-base">
              Los vídeos no solo se ven, se sienten. Con mis servicios de subtitulación, cada línea encaja <span className="font-semibold">perfectamente con la imagen y el ritmo del contenido</span>, manteniendo la claridad y la emoción. El resultado: un espectador que entiende, conecta y disfruta, sin distracciones ni pérdida de sentido.
            </p>
            <ul className="text-left text-neutral-700 text-sm space-y-1 mt-2">
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Vídeos instructivos</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Proyectos cinematográficos y series</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Videotutoriales</li>
            </ul>
          </div>
          {/* Localización */}
          <div className="flex flex-col items-center text-center border border-neutral-200 rounded-2xl p-8 shadow-sm bg-neutral-50">
            <div className="w-24 h-24 mb-6 rounded-xl bg-neutral-200 flex items-center justify-center text-4xl text-amber-800 font-bold">L</div>
            <h3 className="text-2xl font-bold mb-4 text-amber-900">Localización</h3>
            <p className="text-neutral-700 mb-4 text-base">
              Un contenido global necesita un enfoque local. Con la localización, adapto tu texto, app o página web para que <span className="font-semibold">resuene culturalmente</span>, sin perder tu identidad. Cada detalle, desde expresiones hasta referencias culturales, se ajusta para que tu público se sienta entendido y conectado.
            </p>
            <ul className="text-left text-neutral-700 text-sm space-y-1 mt-2">
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Páginas web</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Apps y software</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Ecommerce</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Videojuegos</li>
              <li className="before:content-['■'] before:mr-2 before:text-amber-700">Textos publicitarios</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Scroll suave global para anclas
const globalSmoothScroll = (
  <style>{`html { scroll-behavior: smooth !important; }`}</style>
);


export default function AltraducirteScrollDemo() {
  const { t, i18n } = useTranslation();
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(true);
  // Estado para la sección activa
  const [activeSection, setActiveSection] = useState<string>('inicio');

  // Referencias a las secciones
  const heroRef = useRef<HTMLElement>(null);
  const serviciosRef = useRef<HTMLElement>(null);
  const proyectosRef = useRef<HTMLElement>(null);
  const sobreMiRef = useRef<HTMLElement>(null);

  // Detectar sección activa en scroll
  useEffect(() => {
    function onScroll() {
      if (!ctaRef.current) return;
      const rect = ctaRef.current.getBoundingClientRect();
      setShowFloating(!(rect.top < window.innerHeight && rect.bottom > 0));

      // Detectar sección visible
      const sections = [
        { id: 'inicio', ref: heroRef },
        { id: 'servicios', ref: serviciosRef },
        { id: 'proyectos', ref: proyectosRef },
        { id: 'sobre_mi', ref: sobreMiRef },
      ];
      const offset = 120; // margen para activar antes
      let found = 'inicio';
      for (const section of sections) {
        const el = section.ref.current;
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top - offset < window.innerHeight / 2) {
            found = section.id;
          }
        }
      }
      setActiveSection(found);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {globalSmoothScroll}
      <div className="min-h-screen text-neutral-900 flex">
        {/* Barra superior con slide en hover, fondo siempre cubriendo el top */}
        <div className="group/nav">
          {/* Fondo translúcido que se estira en hover */}
          <div
            className="fixed top-0 left-0 w-full z-20 bg-white/60 border-b border-neutral-200 backdrop-blur-md shadow-lg transition-all duration-300 pointer-events-none"
            style={{
              height: '60px',
              transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
            id="nav-bg"
          />
          {/* Barra completa que hace slide en hover, pero el fondo nunca se mueve, solo crece */}
          <nav
            className="fixed top-0 left-0 w-full z-30 flex items-center px-2 md:px-8 py-2"
            style={{ height: '60px', transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(8px)';
              const bg = document.getElementById('nav-bg');
              if (bg) {
                bg.style.height = '78px';
                bg.style.transform = 'translateY(0)';
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              const bg = document.getElementById('nav-bg');
              if (bg) {
                bg.style.height = '60px';
                bg.style.transform = 'translateY(0)';
              }
            }}
          >
            {/* Logo tipo libro */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow mr-4">
              <BookOpen className="w-7 h-7 text-blue-700" />
            </div>
            <div className="flex flex-1 items-center gap-2 md:gap-4">
              <a
                href="#"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-all group ${activeSection === 'inicio' ? 'border-b-2 border-black' : ''}`}
                ref={heroRef as any}
              >
                <Home className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                <span className="hidden md:inline text-base font-medium">
                  <FlipText text={t('nav.inicio')} />
                </span>
              </a>
              <a
                href="#servicios"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-all group ${activeSection === 'servicios' ? 'border-b-2 border-black' : ''}`}
                ref={serviciosRef as any}
              >
                <BookOpen className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                <span className="hidden md:inline text-base font-medium">
                  <FlipText text={t('nav.servicios')} />
                </span>
              </a>
              <a
                href="#"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-all group ${activeSection === 'proyectos' ? 'border-b-2 border-black' : ''}`}
                ref={proyectosRef as any}
              >
                <Briefcase className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                <span className="hidden md:inline text-base font-medium">
                  <FlipText text={t('nav.proyectos')} />
                </span>
              </a>
              <a
                href="#"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-all group ${activeSection === 'sobre_mi' ? 'border-b-2 border-black' : ''}`}
                ref={sobreMiRef as any}
              >
                <User className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                <span className="hidden md:inline text-base font-medium">
                  <FlipText text={t('nav.sobre_mi')} />
                </span>
              </a>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-all group">
                <Search className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                <span className="hidden md:inline text-base font-medium">{t('nav.buscar')}</span>
              </a>
              {/* Botones de idioma */}
              <div className="flex items-center gap-1 ml-2">
                <button
                  title="Español"
                  className={`text-xl px-2 py-1 rounded-full transition-all relative overflow-visible ${i18n.language === 'es' ? 'bg-transparent' : 'hover:bg-neutral-100'}`}
                  aria-label="Español"
                  onClick={() => i18n.changeLanguage('es')}
                >
                  {i18n.language === 'es' && (
                    <span className="absolute inset-0 rounded-full bg-neutral-300/60 pointer-events-none" style={{zIndex:0}} />
                  )}
                  <FlipText text="🇪🇸" />
                </button>
                <button
                  title="English"
                  className={`text-xl px-2 py-1 rounded-full transition-all relative overflow-visible ${i18n.language === 'en' ? 'bg-transparent' : 'hover:bg-neutral-100'}`}
                  aria-label="English"
                  onClick={() => i18n.changeLanguage('en')}
                >
                  {i18n.language === 'en' && (
                    <span className="absolute inset-0 rounded-full bg-neutral-300/60 pointer-events-none" style={{zIndex:0}} />
                  )}
                  <FlipText text="🇬🇧" />
                </button>
                <button
                  title="Français"
                  className={`text-xl px-2 py-1 rounded-full transition-all relative overflow-visible ${i18n.language === 'fr' ? 'bg-transparent' : 'hover:bg-neutral-100'}`}
                  aria-label="Français"
                  onClick={() => i18n.changeLanguage('fr')}
                >
                  {i18n.language === 'fr' && (
                    <span className="absolute inset-0 rounded-full bg-neutral-300/60 pointer-events-none" style={{zIndex:0}} />
                  )}
                  <FlipText text="🇫🇷" />
                </button>
                <button
                  title="Русский"
                  className={`text-xl px-2 py-1 rounded-full transition-all relative overflow-visible ${i18n.language === 'ru' ? 'bg-transparent' : 'hover:bg-neutral-100'}`}
                  aria-label="Русский"
                  onClick={() => i18n.changeLanguage('ru')}
                >
                  {i18n.language === 'ru' && (
                    <span className="absolute inset-0 rounded-full bg-neutral-300/60 pointer-events-none" style={{zIndex:0}} />
                  )}
                  <FlipText text="🇷🇺" />
                </button>
              </div>
            </div>
          </nav>
        </div>
        {/* Botón flotante tipo CTA */}
        <a
          href="mailto:altraducirte@gmail.com"
          className={`fixed left-1/2 bottom-10 z-40 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 shadow-xl border border-neutral-200 backdrop-blur text-lg font-semibold hover:bg-white transition-all group ${showFloating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-500`}
        >
          {t('cta.connect')}
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 group-hover:bg-blue-700 transition-all">
            <ArrowRight className="w-5 h-5 text-white" />
          </span>
        </a>

        {/* Main content ocupa todo el ancho, barra superpuesta */}
        <main className="flex-1">
          {/* StickyHero sección principal */}
          <section ref={heroRef as any} id="inicio">
            <StickyHero />
          </section>
          {/* Sección Servicios: id para scroll */}
          <section
            ref={serviciosRef as any}
            id="servicios"
            className="scroll-mt-24 pt-8 md:pt-12 pb-0 bg-white flex flex-col items-center"
          >
            {/* Frase gancho animada, más arriba y con menos padding vertical */}
            <div className="w-full flex justify-center">
              <HookPhrase />
            </div>
            {/* Bloque principal de servicios, justo debajo y visible */}
            <div className="w-full max-w-5xl -mt-2 md:-mt-4">
              <FeatureBlock
                title="Traducciones que respiran naturalidad"
                body="Texto ficticio de ejemplo. Explicamos cómo se adapta el mensaje al registro adecuado y al lector real, no sólo a la gramática."
                img={config.imgs.tablet}
                // @ts-ignore
                id="servicios"
              />
            </div>
          </section>


          <section ref={proyectosRef as any} id="proyectos">
            <FeatureBlock
              title="Proceso claro y entregas puntuales"
              body="Plan simple: recibo el material, aclaro el objetivo, creo un glosario base y entrego versiones revisadas con control de cambios."
              img={config.imgs.notes}
              flip
            />
          </section>
          <section ref={sobreMiRef as any} id="sobre_mi">
            <PinPanel />
          </section>
          {/* Nueva sección moderna de servicios */}
          <div ref={ctaRef}><ServiciosModernos /></div>
          <CTA ctaRef={ctaRef} />
          {/* Footer */}
          <footer className="pb-12">
            <div className="w-full flex flex-col items-center gap-3 text-sm text-neutral-600">
              <a href={`mailto:${config.email}`} className="inline-flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4" /> {config.email}
              </a>
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {config.location}
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
