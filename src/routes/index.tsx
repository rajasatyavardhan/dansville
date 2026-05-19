import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Instagram, MessageCircle, Phone } from "lucide-react";
import { useMedia } from "@/hooks/use-media";
import dansvillaNeon from "@/assets/dansvilla-neon-sign.jpg";
import chaitanya from "@/assets/chaitanya.jpg";

const INSTAGRAM_URL = "https://www.instagram.com/dansvilla_studio/";
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/Zdo8BycCBqZErtNn8";
const PHONE = "16132189417";
const wa = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

const MSG = {
  general: "Hi Chaitanya Master, I'm interested in joining Dansvilla Studio dance classes.",
  dropIn: "Hi Chaitanya Master, I'd like to book a $15 drop-in class at Dansvilla Studio.",
  monthly: "Hi Chaitanya Master, I'd like to register for the Monthly plan ($60/month). Please share next steps.",
  threeMonths: "Hi Chaitanya Master, I'd like to register for the 3-Month plan ($150 total). Please share next steps.",
  family: "Hi Chaitanya Master, I'd like to register for the Family/Duo plan ($50/person/month). We are 2 people joining together.",
  about: "Hi Chaitanya Master, I'd love to know more about your classes at Dansvilla Studio.",
  event: "Hi Chaitanya Master, I'd like to book Dansvilla Studio for a Sangeeth / event choreography. Please share details.",
  batch: (name: string, time: string, age: string) =>
    `Hi Chaitanya Master, I'd like to register for the ${name} batch (${time}, ${age}) at Dansvilla Studio.`,
};

const REVIEWS = [
  { name: "Priya S.", initial: "P", date: "2 months ago", text: "Chaitanya Master is incredibly patient and the kids LOVE his classes. Best studio in Barrhaven by far!" },
  { name: "Anjali R.", initial: "A", date: "1 month ago", text: "Amazing energy, brilliant choreography. My daughter cannot wait for every class." },
  { name: "Karthik M.", initial: "K", date: "3 weeks ago", text: "Joined as a complete beginner — felt welcomed from day one. The vibe is fun and you genuinely improve." },
  { name: "Meera V.", initial: "M", date: "1 week ago", text: "Performed at our Sangeeth thanks to Master's choreography. Everyone was blown away. Highly recommend." },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Dansvilla Studio — Bollywood, Freestyle & more | Nepean, Ottawa" },
      { name: "description", content: "Join Dansvilla Studio in Barrhaven/Nepean for Bollywood, Tollywood, Kollywood & Freestyle dance classes for kids, teens & adults. $15/class. Limited spots — register now." },
      { property: "og:title", content: "The Dansvilla Studio — Dance Classes in Nepean" },
      { property: "og:description", content: "Bollywood · Tollywood · Kollywood · Freestyle. All ages welcome." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;900&family=Dancing+Script:wght@700&display=swap" },
    ],
  }),
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="dv-root">
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <HeroCarousel />
      <GoogleReviews />
      <Ticker />
      <Schedule />
      <Pricing />
      <Gallery />
      <Events />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const links = [
    ["schedule", "Schedule"], ["pricing", "Pricing"], ["gallery", "Gallery"],
    ["events", "Events"], ["about", "About"], ["contact", "Contact"],
  ] as const;
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <nav className="dv-nav">
        <a href="#top" className="dv-nav-logo" onClick={(e) => { e.preventDefault(); scrollTo("top"); }}>DANSVILLA</a>
        <ul className="dv-nav-links">
          {links.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
          ))}
        </ul>
        <div className="dv-nav-icons">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={17} />
          </a>
          <a href={wa(MSG.general)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="wa">
            <MessageCircle size={17} />
          </a>
          <button className="dv-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`dv-mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a>
        ))}
      </div>
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section id="top" className="dv-hero">
      <div className="dv-hero-bg" style={{ backgroundImage: `url(${dansvillaNeon})` }} />
      <div className="dv-hero-content">
        <div className="dv-hero-badge">⚡ LIMITED SPOTS · REGISTER NOW</div>
        <span className="dv-hero-the">— The —</span>
        <h1 className="dv-hero-title">DANSVILLA</h1>
        <div className="dv-hero-studio">STUDIO</div>
        <p className="dv-hero-styles">BOLLYWOOD · TOLLYWOOD · KOLLYWOOD · FREESTYLE</p>
        <div className="dv-hero-price">⚡ DROP-IN RATE&nbsp;<span>$15 PER CLASS</span></div>
        <p className="dv-hero-desc">
          Dance classes for every age and every level — taught with energy,<br />
          heart, and a little bit of filmy magic by Chaitanya Master in Barrhaven, Nepean.
        </p>
        <div className="dv-hero-btns">
          <a href={wa(MSG.general)} target="_blank" rel="noopener noreferrer" className="dv-btn-primary">
            <MessageCircle size={16} /> Register on WhatsApp
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="dv-btn-outline">
            <Instagram size={16} /> Follow on Instagram
          </a>
          <a href={`tel:+${PHONE}`} className="dv-btn-outline" style={{ borderColor: "var(--dv-pink)", color: "var(--dv-pink)" }}>
            <Phone size={16} /> 613-218-9417
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- HERO CAROUSEL: photos (from admin uploads) + reviews ---------- */
function HeroCarousel() {
  const { items: heroMedia } = useMedia("hero");
  type Slide =
    | { kind: "photo"; src: string; mediaType: string; caption: string; id: string }
    | { kind: "review"; quote: string; name: string; id: string };

  const slides: Slide[] = useMemo(() => {
    const photos: Slide[] = heroMedia.map((m) => ({
      kind: "photo", src: m.publicUrl, mediaType: m.media_type, caption: m.caption ?? "Dansvilla Studio", id: m.id,
    }));
    const reviews: Slide[] = REVIEWS.slice(0, 3).map((r, i) => ({
      kind: "review", quote: r.text, name: `${r.name} · ★★★★★`, id: `rv-${i}`,
    }));
    // Interleave photo, review, photo, review...
    const out: Slide[] = [];
    const max = Math.max(photos.length, reviews.length);
    for (let i = 0; i < max; i++) {
      if (photos[i]) out.push(photos[i]);
      if (reviews[i]) out.push(reviews[i]);
    }
    // Fallback if no photos
    if (photos.length === 0) return reviews;
    return out;
  }, [heroMedia]);

  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [count]);

  if (count === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  // Slide width approx: 280px photo or 300px review + 20 gap. Use 320 avg for translate.
  const slideStep = 320;
  return (
    <section className="dv-carousel-section">
      <p className="dv-carousel-label">⭐ Studio Moments & Student Reviews</p>
      <div className="dv-carousel-wrap">
        <div className="dv-carousel-track" style={{ transform: `translateX(calc(50% - ${slideStep / 2}px - ${index * slideStep}px))` }}>
          {slides.map((s) => (
            s.kind === "photo" ? (
              <div key={s.id} className="dv-slide photo">
                {s.mediaType === "video" ? (
                  <video src={s.src} autoPlay muted loop playsInline />
                ) : (
                  <img src={s.src} alt={s.caption} loading="lazy" />
                )}
              </div>
            ) : (
              <div key={s.id} className="dv-slide review">
                <div>
                  <div className="dv-cs-stars">★★★★★</div>
                  <p className="dv-cs-text">"{s.quote}"</p>
                </div>
                <p className="dv-cs-author">{s.name}</p>
              </div>
            )
          ))}
        </div>
      </div>
      <div className="dv-carousel-controls">
        <button className="dv-carousel-btn" onClick={prev} aria-label="Previous">‹</button>
        <div className="dv-carousel-dots">
          {slides.map((_, i) => (
            <button key={i} className={`dv-carousel-dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <button className="dv-carousel-btn" onClick={next} aria-label="Next">›</button>
      </div>
    </section>
  );
}

/* ---------- GOOGLE REVIEWS ---------- */
function GoogleReviews() {
  return (
    <section style={{ background: "var(--dv-dark)" }}>
      <div className="dv-container">
        <div style={{ textAlign: "center" }}>
          <p className="dv-section-label">Loved by Families</p>
          <h2 className="dv-section-title">WHAT STUDENTS SAY</h2>
          <p className="dv-section-sub" style={{ margin: "0 auto" }}>Our 5★ Google rating, in their words.</p>
        </div>
        <div className="dv-gr-grid">
          {REVIEWS.map((r) => (
            <div key={r.name} className="dv-gr-card">
              <div className="dv-gr-top">
                <div className="dv-gr-avatar">{r.initial}</div>
                <div style={{ flex: 1 }}>
                  <div className="dv-gr-name">{r.name}</div>
                  <div className="dv-gr-stars">★★★★★</div>
                  <div className="dv-gr-date">{r.date}</div>
                </div>
              </div>
              <p className="dv-gr-text">"{r.text}"</p>
            </div>
          ))}
        </div>
        <div className="dv-gr-footer">
          <span className="dv-gr-footer-text" style={{ fontSize: "0.82rem", color: "var(--dv-muted)" }}>
            See all reviews on
          </span>
          <a className="dv-gr-more" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            <span style={{ color: "#4285F4", fontWeight: 900 }}>G</span>
            <span style={{ color: "#EA4335", fontWeight: 900 }}>o</span>
            <span style={{ color: "#FBBC05", fontWeight: 900 }}>o</span>
            <span style={{ color: "#4285F4", fontWeight: 900 }}>g</span>
            <span style={{ color: "#34A853", fontWeight: 900 }}>l</span>
            <span style={{ color: "#EA4335", fontWeight: 900 }}>e</span>
            &nbsp;Reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- TICKER ---------- */
function Ticker() {
  const words = ["BOLLYWOOD", "TOLLYWOOD", "KOLLYWOOD", "FREESTYLE", "DANSVILLA"];
  const line = (
    <>
      {Array.from({ length: 6 }).map((_, k) =>
        words.map((w, i) => (
          <span key={`${k}-${i}`} style={{ margin: "0 22px" }}>
            ✦ {w}
          </span>
        ))
      )}
    </>
  );
  return (
    <div className="dv-ticker">
      <div className="dv-ticker-inner">{line}{line}</div>
    </div>
  );
}

/* ---------- SCHEDULE ---------- */
function Schedule() {
  const weekend = [
    { time: "11–12 PM", name: "Tiny Tots", age: "Ages 3–7" },
    { time: "12–1 PM", name: "Juniors", age: "Ages 8–12" },
    { time: "1–2 PM", name: "Teens & Adults Beginner", age: "13+" },
    { time: "2–3 PM", name: "Teens & Adults Advanced", age: "13+" },
  ];
  const monday = [
    { time: "5–6 PM", name: "Tiny Tots", age: "Ages 3–7" },
    { time: "6–7 PM", name: "Juniors", age: "Ages 8–12" },
    { time: "7–8 PM", name: "Teens & Adults", age: "13+" },
  ];
  const wednesday = monday;

  return (
    <section id="schedule" className="dv-schedule">
      <div className="dv-container" style={{ textAlign: "center" }}>
        <p className="dv-section-label">Class Schedule</p>
        <h2 className="dv-section-title">DANCE WITH US</h2>
        <p className="dv-section-sub" style={{ margin: "0 auto" }}>Weekday and weekend batches for every age.</p>
      </div>
      <div className="dv-container">
        <div className="dv-schedule-grid">
          <ScheduleCard title="MONDAY" subtitle="BOLLYWOOD" icon="💃" variant="bollywood" batches={monday} />
          <ScheduleCard title="WEDNESDAY" subtitle="FREESTYLE" icon="⚡" variant="freestyle" batches={wednesday} />
          <ScheduleCard title="WEEKEND" subtitle="ALL STYLES" icon="🌟" variant="weekend" batches={weekend} />
        </div>
      </div>
    </section>
  );
}

function ScheduleCard({ title, subtitle, icon, variant, batches }: {
  title: string; subtitle: string; icon: string;
  variant: "bollywood" | "freestyle" | "weekend";
  batches: { time: string; name: string; age: string }[];
}) {
  return (
    <div className="dv-schedule-card">
      <div className={`dv-schedule-header ${variant}`}>
        <div className="dv-schedule-icon">{icon}</div>
        <div>
          <div className="dv-schedule-day">{title}</div>
          <div className="dv-schedule-style">{subtitle}</div>
        </div>
      </div>
      <div className="dv-schedule-batches">
        {batches.map((b) => (
          <div key={b.time + b.name} className="dv-batch-row">
            <div className="dv-batch-time">{b.time}</div>
            <div className="dv-batch-info">
              <div className="dv-batch-name">{b.name}</div>
              <div className="dv-batch-age">{b.age}</div>
            </div>
            <a className="dv-wa-batch" href={wa(MSG.batch(b.name, b.time, b.age))} target="_blank" rel="noopener noreferrer">
              REGISTER
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- PRICING ---------- */
function Pricing() {
  return (
    <section id="pricing" className="dv-pricing">
      <div className="dv-container" style={{ textAlign: "center" }}>
        <p className="dv-section-label">Pricing</p>
        <h2 className="dv-section-title">SIMPLE & FAIR</h2>
        <p className="dv-section-sub" style={{ margin: "0 auto" }}>Pick what works for your family.</p>
      </div>
      <div className="dv-container" style={{ marginTop: 40 }}>
        <div className="dv-pricing-highlight">
          <div className="dv-drop-price">$15</div>
          <div>
            <div className="dv-drop-label">DROP-IN CLASS</div>
            <div className="dv-drop-sub">Try a single class · no commitment</div>
          </div>
          <a href={wa(MSG.dropIn)} target="_blank" rel="noopener noreferrer" className="dv-btn-primary" style={{ marginLeft: "auto" }}>
            <MessageCircle size={16} /> Book a Drop-in
          </a>
        </div>
        <div className="dv-pricing-grid">
          <PriceCard name="Monthly" amount="$60" period="/ month · CAD"
            features={["4 classes per month", "One dance style", "Cancel anytime"]}
            ctaMessage={MSG.monthly} />
          <PriceCard name="3 Months" amount="$150" period="total · CAD"
            features={["12 classes (3 months)", "Best value", "One dance style"]}
            badge="MOST POPULAR" save="Save $30" featured ctaMessage={MSG.threeMonths} />
          <PriceCard name="Family / Duo" amount="$50" period="/ person / month"
            features={["Siblings · Parent & Child · Couples", "Valid when 2 join together", "Save together, dance together"]}
            ctaMessage={MSG.family} />
        </div>
        <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--dv-muted)", marginTop: 24 }}>
          All prices in CAD. Limited spots each session.
        </p>
      </div>
    </section>
  );
}

function PriceCard({ name, amount, period, features, badge, save, featured, ctaMessage }: {
  name: string; amount: string; period: string; features: string[]; badge?: string; save?: string; featured?: boolean; ctaMessage: string;
}) {
  return (
    <div className={`dv-price-card ${featured ? "featured" : ""}`}>
      {badge && <div className="dv-featured-tag">{badge}</div>}
      <div className="dv-price-name">{name}</div>
      <div className="dv-price-amount">{amount}</div>
      <div className="dv-price-period">{period}</div>
      {save && <div className="dv-price-save">⚡ {save}</div>}
      <ul className="dv-price-features">
        {features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <a href={wa(ctaMessage)} target="_blank" rel="noopener noreferrer" className="dv-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        <MessageCircle size={16} /> Register {name}
      </a>
    </div>
  );
}

/* ---------- GALLERY ---------- */
function Gallery() {
  const { items } = useMedia("gallery");
  return (
    <section id="gallery" className="dv-gallery-sec">
      <div className="dv-container">
        <div className="dv-gallery-header">
          <div>
            <p className="dv-section-label">Studio Moments</p>
            <h2 className="dv-section-title">GALLERY</h2>
            <p className="dv-section-sub">Real photos & reels from our classes and performances.</p>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="dv-insta-follow">
            <Instagram size={14} /> Follow @dansvilla_studio
          </a>
        </div>

        {items.length > 0 ? (
          <div className="masonry">
            {items.map((m) => (
              <div key={m.id} className="masonry-item" style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "var(--dv-card)" }}>
                {m.media_type === "video" ? (
                  <video src={m.publicUrl} controls playsInline style={{ width: "100%", display: "block" }} />
                ) : (
                  <img src={m.publicUrl} alt={m.caption ?? "Dansvilla"} loading="lazy" style={{ width: "100%", display: "block" }} />
                )}
                {m.caption && <p style={{ padding: "8px 12px", fontSize: "0.72rem", color: "var(--dv-muted)" }}>{m.caption}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="dv-gallery-cta">
            <p>Photos coming soon — Master will add them via the admin panel.</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="dv-insta-follow">
              <Instagram size={14} /> See us on Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- EVENTS ---------- */
function Events() {
  const { items } = useMedia("events");
  const placeholders = [
    { icon: "💍", title: "Sangeeth Choreography", desc: "Custom choreography for the bride, groom, family and friends — performance-ready in just a few sessions." },
    { icon: "🎤", title: "Stage Performances", desc: "Annual showcases and community events featuring our students across all age groups." },
    { icon: "🎉", title: "Private Events", desc: "Birthdays, anniversaries and cultural celebrations — bring Dansvilla energy to your special day." },
  ];
  return (
    <section id="events" className="dv-events-sec">
      <div className="dv-container" style={{ textAlign: "center" }}>
        <p className="dv-section-label">On Stage</p>
        <h2 className="dv-section-title">EVENTS & SANGEETHS</h2>
        <p className="dv-section-sub" style={{ margin: "0 auto" }}>From private sangeeth choreography to community showcases — we bring your celebration to life.</p>
      </div>
      <div className="dv-container">
        {items.length > 0 && (
          <div className="masonry" style={{ marginTop: 32 }}>
            {items.map((m) => (
              <div key={m.id} className="masonry-item" style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "var(--dv-card)" }}>
                {m.media_type === "video" ? (
                  <video src={m.publicUrl} controls playsInline style={{ width: "100%", display: "block" }} />
                ) : (
                  <img src={m.publicUrl} alt={m.caption ?? "Event"} loading="lazy" style={{ width: "100%", display: "block" }} />
                )}
                {m.caption && <p style={{ padding: "8px 12px", fontSize: "0.72rem", color: "var(--dv-muted)" }}>{m.caption}</p>}
              </div>
            ))}
          </div>
        )}
        <div className="dv-events-grid">
          {placeholders.map((p) => (
            <div key={p.title} className="dv-event-card">
              <div className="dv-event-icon">{p.icon}</div>
              <h3 className="dv-event-title">{p.title}</h3>
              <p className="dv-event-desc">{p.desc}</p>
              <a href={wa(MSG.event)} target="_blank" rel="noopener noreferrer" className="dv-btn-primary">
                <MessageCircle size={14} /> Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  return (
    <section id="about" className="dv-about-sec">
      <div className="dv-container">
        <div className="dv-about-grid">
          <div className="dv-about-img">
            <img src={chaitanya} alt="Chaitanya Master, founder of Dansvilla Studio" />
          </div>
          <div>
            <p className="dv-section-label">Meet your instructor</p>
            <h2 className="dv-section-title">CHAITANYA MASTER</h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginTop: 12 }}>
              Chaitanya Master is the heart and energy behind Dansvilla Studio. With years of experience choreographing across Bollywood, Tollywood, Kollywood and freestyle styles, he's known for making every student — whether 3 or 53 — feel like a star on the floor.
            </p>
            <div className="dv-about-features">
              <div className="dv-about-feat">
                <div className="dv-about-feat-icon">🎯</div>
                <div className="dv-about-feat-title">All Ages, All Levels</div>
                <div className="dv-about-feat-text">From 3-year-olds to grown-ups — everyone has a batch.</div>
              </div>
              <div className="dv-about-feat">
                <div className="dv-about-feat-icon">🎵</div>
                <div className="dv-about-feat-title">4 Dance Styles</div>
                <div className="dv-about-feat-text">Bollywood, Tollywood, Kollywood and Freestyle.</div>
              </div>
              <div className="dv-about-feat">
                <div className="dv-about-feat-icon">⭐</div>
                <div className="dv-about-feat-title">5★ Rated</div>
                <div className="dv-about-feat-text">Loved by our students and families on Google.</div>
              </div>
              <div className="dv-about-feat">
                <div className="dv-about-feat-icon">📍</div>
                <div className="dv-about-feat-title">Right in Barrhaven</div>
                <div className="dv-about-feat-text">131 Harbour View St, Nepean.</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={wa(MSG.about)} target="_blank" rel="noopener noreferrer" className="dv-btn-primary">
                <MessageCircle size={16} /> Message Master
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="dv-btn-outline">
                <Instagram size={16} /> Follow
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section id="contact" className="dv-contact-sec">
      <div className="dv-container" style={{ textAlign: "center" }}>
        <p className="dv-section-label">Visit Us</p>
        <h2 className="dv-section-title">COME DANCE WITH US</h2>
      </div>
      <div className="dv-container">
        <div className="dv-contact-grid">
          <div className="dv-contact-info">
            <div className="dv-contact-item">
              <div className="dv-contact-icon">📍</div>
              <div>
                <div className="dv-contact-label">Studio Location</div>
                <div className="dv-contact-value">131 Harbour View St, Nepean (Barrhaven), ON K2G 6Z8</div>
              </div>
            </div>
            <div className="dv-contact-item">
              <div className="dv-contact-icon">📞</div>
              <div>
                <div className="dv-contact-label">Call Chaitanya Master</div>
                <div className="dv-contact-value"><a href={`tel:+${PHONE}`}>+1 613-218-9417</a></div>
              </div>
            </div>
            <div className="dv-contact-item">
              <div className="dv-contact-icon">📷</div>
              <div>
                <div className="dv-contact-label">Instagram</div>
                <div className="dv-contact-value"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@dansvilla_studio</a></div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
              <a href={wa(MSG.general)} target="_blank" rel="noopener noreferrer" className="dv-btn-primary" style={{ background: "#25d366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="dv-btn-primary" style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
                <Instagram size={16} /> Instagram
              </a>
            </div>
          </div>
          <div className="dv-map">
            <iframe
              title="Dansvilla Studio location"
              src="https://www.google.com/maps?q=131+Harbour+View+St,+Nepean,+ON+K2G+6Z8&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="dv-footer">
      <div className="dv-footer-logo">DANSVILLA</div>
      <div className="dv-footer-links">
        <a href="#schedule" onClick={(e) => { e.preventDefault(); document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" }); }}>Schedule</a>
        <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}>Pricing</a>
        <a href="#gallery" onClick={(e) => { e.preventDefault(); document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }); }}>Gallery</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>Contact</a>
        <Link to="/admin" style={{ color: "var(--dv-muted)", textDecoration: "none" }}>Admin</Link>
      </div>
      <p className="dv-footer-copy">© {new Date().getFullYear()} Dansvilla Studio · Nepean, Ontario</p>
    </footer>
  );
}
