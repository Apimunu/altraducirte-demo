import { Mail, MapPin } from "lucide-react";
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
                Demo de landing con narrativa por scroll. Texto e imágenes de
                ejemplo para presentar el estudio de traducción.
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
      <div className="sticky top-10">
        <motion.div style={{ scale, borderRadius: radius as any }} className="mx-auto max-w-5xl bg-neutral-900 text-white p-8 md:p-14 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8">
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

function CTA() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-semibold">¿Vemos cómo quedaría tu proyecto?</h3>
        <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
          Esta es solo una demo de desplazamiento. Podemos ajustar tipografías, colores y animaciones al estilo que prefieras.
        </p>
        <a
          href={`mailto:${config.email}`}
          className="inline-block mt-8 rounded-full bg-neutral-900 px-6 py-3 text-white hover:bg-neutral-800 transition"
        >
          Escríbeme una línea
        </a>
      </div>
    </section>
  );
}

export default function AltraducirteScrollDemo() {
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

        <FeatureBlock
          title="Especializada en contenidos editoriales y web"
          body="Artículos, blogs, microsites y materiales de marca. En esta demo, toda la información es de muestra."
          img={config.imgs.books}
        />

        <CTA />

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
