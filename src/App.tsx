import { Mail, MapPin, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

function FeatureBlock({ title, body, img, flip = false }: { title: string; body: string; img: string; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  return (
    <section ref={ref} className="py-24">
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
    <section ref={ref} className="min-h-[180vh]">
      <div className="sticky top-10 left-0 w-full flex justify-center z-10">
        <motion.div
          style={{ scale, borderRadius: radius as any }}
          className="w-screen bg-neutral-900 text-white p-8 md:p-14 shadow-2xl flex justify-center"
        >
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-semibold">Traducción</h3>
              <p className="mt-2 text-neutral-300">Francés, inglés y ruso a español, con foco en tono y contexto cultural.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Revisión</h3>
              <p className="mt-2 text-neutral-300">Corrección ortotipográfica y de estilo. Entregas limpias listas para publicar.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Localización</h3>
              <p className="mt-2 text-neutral-300">Web y producto. Mensajes que suenan naturales y convierten.</p>
            </div>
          </div>
        </motion.div>
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
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

export default function AltraducirteScrollDemo() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(true);

  useEffect(() => {
    function onScroll() {
      if (!ctaRef.current) return;
      const rect = ctaRef.current.getBoundingClientRect();
      setShowFloating(!(rect.top < window.innerHeight && rect.bottom > 0));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header simple fijo (marca) */}
      <header className="fixed left-0 right-0 top-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between backdrop-blur bg-white/60 border-b">
          <div className="font-semibold tracking-wide text-amber-800">{config.brand}</div>
          <nav className="hidden md:flex gap-6 text-sm text-neutral-600">
            <a href="#" className="hover:text-neutral-900">Inicio</a>
            <a href="#" className="hover:text-neutral-900">Servicios</a>
            <a href="#" className="hover:text-neutral-900">Proyectos</a>
            <a href="#" className="hover:text-neutral-900">Sobre mí</a>
          </nav>
        </div>
      </header>

      {/* Botón flotante tipo CTA */}
      <a
        href="mailto:altraducirte@gmail.com"
        className={`fixed left-1/2 bottom-10 z-40 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 shadow-xl border border-neutral-200 backdrop-blur text-lg font-semibold hover:bg-white transition-all group ${showFloating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-500`}
      >
        ¿Conectamos?
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 group-hover:bg-blue-700 transition-all">
          <ArrowRight className="w-5 h-5 text-white" />
        </span>
      </a>

      <main className="pt-16">
        <StickyHero />
        <FeatureBlock
          title="Traducciones que respiran naturalidad"
          body="Texto ficticio de ejemplo. Explicamos cómo se adapta el mensaje al registro adecuado y al lector real, no sólo a la gramática."
          img={config.imgs.tablet}
        />
        <FeatureBlock
          title="Proceso claro y entregas puntuales"
          body="Plan simple: recibo el material, aclaro el objetivo, creo un glosario base y entrego versiones revisadas con control de cambios."
          img={config.imgs.notes}
          flip
        />
        <PinPanel />
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
  );
}
