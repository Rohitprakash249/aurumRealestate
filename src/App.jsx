import { useState, useEffect, useRef } from "react";
import "./App.css";
import Properties from "./Components/Properties";
/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════ */
const T = {
  gold: "#C9A96E",
  goldLight: "#E8D5B0",
  goldDark: "#8B6914",
  obsidian: "#0A0A0A",
  charcoal: "#141414",
  smoke: "#1C1C1C",
  ivory: "#F5F0E8",
  ivoryDim: "rgba(245,240,232,0.55)",
  ivoryFaint: "rgba(245,240,232,0.35)",
  goldBorder: "rgba(201,169,110,0.2)",
  goldBorderHover: "rgba(201,169,110,0.5)",
  cormorant: "'Cormorant Garamond', Georgia, serif",
  montserrat: "'Montserrat', sans-serif",
};

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES (injected once)
═══════════════════════════════════════════════════════ */
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500;600;700&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   html { scroll-behavior: smooth; }
//   body {
//     background: #0A0A0A;
//     color: #F5F0E8;
//     font-family: 'Montserrat', sans-serif;
//     overflow-x: hidden;
//   }
//   ::-webkit-scrollbar { width: 4px; }
//   ::-webkit-scrollbar-track { background: #0A0A0A; }
//   ::-webkit-scrollbar-thumb { background: #C9A96E; }

//   .au-gold-text {
//     background: linear-gradient(135deg, #C9A96E 0%, #E8D5B0 50%, #C9A96E 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   @keyframes shimmer { 0%,100%{opacity:.4} 50%{opacity:1} }
//   @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
//   @keyframes heroReveal { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes fadeSlideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
//   @keyframes barPulse { 0%,100%{transform:scaleX(.4)} 50%{transform:scaleX(1)} }

//   .au-hero-h1  { animation: heroReveal 1.2s cubic-bezier(.25,.8,.25,1) .2s both; }
//   .au-hero-sub { animation: heroReveal 1.2s cubic-bezier(.25,.8,.25,1) .55s both; }
//   .au-hero-search { animation: heroReveal 1.2s cubic-bezier(.25,.8,.25,1) .85s both; }
//   .au-hero-stats { animation: heroReveal 1.2s cubic-bezier(.25,.8,.25,1) 1.1s both; }

//   .au-fade-up { opacity:0; transform:translateY(40px); transition:opacity .85s ease,transform .85s ease; }
//   .au-fade-up.visible { opacity:1; transform:translateY(0); }

//   .au-float { animation: float 6s ease-in-out infinite; }
//   .au-shimmer { animation: shimmer 3s infinite; }

//   .au-card {
//     background: linear-gradient(145deg,#161616,#111);
//     border: 1px solid rgba(201,169,110,.15);
//     transition: transform .5s cubic-bezier(.25,.8,.25,1), border-color .4s, box-shadow .5s;
//     overflow: hidden;
//     position: relative;
//   }
//   .au-card:hover {
//     transform: translateY(-7px);
//     border-color: rgba(201,169,110,.5);
//     box-shadow: 0 30px 70px rgba(0,0,0,.65), 0 0 40px rgba(201,169,110,.07);
//   }
//   .au-card-img {
//     width:100%; height:260px; object-fit:cover;
//     display:block;
//     transition: transform .75s ease;
//   }
//   .au-card:hover .au-card-img { transform: scale(1.07); }

//   .au-btn-gold {
//     display:inline-block;
//     background: linear-gradient(135deg, #8B6914 0%, #C9A96E 50%, #8B6914 100%);
//     background-size: 200% 100%;
//     color: #0A0A0A;
//     font-family: 'Montserrat',sans-serif;
//     font-size: 10px;
//     letter-spacing: .2em;
//     font-weight: 600;
//     text-transform: uppercase;
//     border: none;
//     cursor: pointer;
//     transition: background-position .4s ease, box-shadow .4s ease;
//     text-decoration: none;
//   }
//   .au-btn-gold:hover {
//     background-position: right center;
//     box-shadow: 0 8px 32px rgba(201,169,110,.45);
//   }

//   .au-btn-outline {
//     display:inline-block;
//     border: 1px solid #C9A96E;
//     color: #C9A96E;
//     background: transparent;
//     font-family: 'Montserrat',sans-serif;
//     font-size: 10px;
//     letter-spacing: .2em;
//     font-weight: 500;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background .3s, box-shadow .3s;
//     text-decoration: none;
//   }
//   .au-btn-outline:hover {
//     background: rgba(201,169,110,.1);
//     box-shadow: 0 0 24px rgba(201,169,110,.2);
//   }

//   .au-input {
//     background: rgba(255,255,255,.04);
//     border: 1px solid rgba(201,169,110,.22);
//     color: #F5F0E8;
//     font-family: 'Montserrat',sans-serif;
//     font-size: 12px;
//     outline: none;
//     transition: border-color .3s, box-shadow .3s;
//     width: 100%;
//   }
//   .au-input:focus {
//     border-color: #C9A96E;
//     box-shadow: 0 0 0 3px rgba(201,169,110,.12);
//   }
//   .au-input::placeholder { color: rgba(245,240,232,.35); }
//   .au-input option { background: #1a1a1a; color: #F5F0E8; }

//   .au-nav-blur {
//     backdrop-filter: blur(20px);
//     -webkit-backdrop-filter: blur(20px);
//     background: rgba(10,10,10,.88);
//     border-bottom: 1px solid rgba(201,169,110,.15);
//   }

//   .au-tab-btn {
//     font-family: 'Montserrat',sans-serif;
//     font-size: 10px;
//     letter-spacing: .14em;
//     font-weight: 500;
//     text-transform: uppercase;
//     cursor: pointer;
//     border: none;
//     transition: all .3s;
//     padding: 7px 16px;
//   }
//   .au-tab-btn.active {
//     background: linear-gradient(135deg,#8B6914,#C9A96E);
//     color: #0A0A0A;
//   }
//   .au-tab-btn:not(.active) {
//     background: transparent;
//     color: rgba(245,240,232,.55);
//   }
//   .au-tab-btn:not(.active):hover { color: #C9A96E; }

//   .au-filter-btn {
//     font-family:'Montserrat',sans-serif;
//     font-size:10px;
//     letter-spacing:.14em;
//     font-weight:500;
//     text-transform:uppercase;
//     cursor:pointer;
//     padding:8px 16px;
//     border:1px solid #C9A96E;
//     transition:all .3s;
//   }
//   .au-filter-btn.active {
//     background:linear-gradient(135deg,#8B6914,#C9A96E);
//     color:#0A0A0A;
//     border-color:transparent;
//   }
//   .au-filter-btn:not(.active) {
//     background:transparent;
//     color:#C9A96E;
//   }
//   .au-filter-btn:not(.active):hover { background:rgba(201,169,110,.1); }

//   .au-service-card {
//     border: 1px solid rgba(201,169,110,.13);
//     background: rgba(201,169,110,.02);
//     transition: border-color .35s, background .35s;
//     padding: 32px;
//   }
//   .au-service-card:hover {
//     border-color: rgba(201,169,110,.4);
//     background: rgba(201,169,110,.05);
//   }

//   .au-area-card {
//     position:relative;
//     overflow:hidden;
//     cursor:pointer;
//     flex-shrink:0;
//     width:270px;
//     height:360px;
//   }
//   .au-area-card img {
//     width:100%;height:100%;object-fit:cover;
//     transition: transform .75s ease;
//   }
//   .au-area-card:hover img { transform: scale(1.1); }
//   .au-area-card .au-area-overlay {
//     position:absolute;inset:0;
//     background:linear-gradient(0deg,rgba(10,10,10,.9) 0%,rgba(10,10,10,.15) 60%,transparent 100%);
//   }
//   .au-area-card .au-area-info {
//     position:absolute;bottom:0;left:0;right:0;padding:24px;
//   }
//   .au-area-line {
//     height:1px;
//     background:linear-gradient(90deg,transparent,#C9A96E,transparent);
//     margin-top:12px;
//     opacity:0;
//     transition:opacity .3s;
//   }
//   .au-area-card:hover .au-area-line { opacity:1; }

//   .au-stat-card {
//     background:linear-gradient(145deg,rgba(201,169,110,.07),rgba(201,169,110,.02));
//     border:1px solid rgba(201,169,110,.2);
//     transition:border-color .3s;
//     padding:28px 20px;
//     text-align:center;
//   }
//   .au-stat-card:hover { border-color:rgba(201,169,110,.5); }

//   .au-testi-card {
//     background:linear-gradient(145deg,#131313,#0e0e0e);
//     border:1px solid rgba(201,169,110,.13);
//     padding:32px;
//     cursor:pointer;
//     transition:border-color .3s,transform .3s;
//   }
//   .au-testi-card:hover { border-color:rgba(201,169,110,.35); transform:translateY(-4px); }
//   .au-testi-card.active { border-color:rgba(201,169,110,.45); }

//   .au-corner-tl {
//     position:absolute;top:0;left:0;
//     width:22px;height:22px;
//     border-top:1px solid #C9A96E;
//     border-left:1px solid #C9A96E;
//     opacity:.5;
//   }
//   .au-corner-br {
//     position:absolute;bottom:0;right:0;
//     width:22px;height:22px;
//     border-bottom:1px solid #C9A96E;
//     border-right:1px solid #C9A96E;
//     opacity:.5;
//   }

//   .au-gold-line {
//     height:1px;
//     background:linear-gradient(90deg,transparent,#C9A96E,transparent);
//   }

//   .au-mobile-menu {
//     transition:max-height .4s ease, opacity .4s ease;
//     overflow:hidden;
//   }
//   .au-mobile-menu.closed { max-height:0;opacity:0; }
//   .au-mobile-menu.open   { max-height:600px;opacity:1; }

//   .au-areas-scroll::-webkit-scrollbar { height:2px; }
//   .au-areas-scroll::-webkit-scrollbar-thumb { background:#C9A96E; }

//   .au-sent-success {
//     animation: fadeSlideUp .5s ease both;
//   }

//   @media (max-width:768px) {
//     .au-hero-h1-text { font-size:3.2rem !important; }
//     .au-section-h2   { font-size:2.6rem !important; }
//   }
// `;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const PROPERTIES = [
  {
    id: 1,
    title: "Sky Residences, Downtown",
    type: "Penthouse",
    area: "Downtown Dubai",
    price: "AED 28,500,000",
    beds: 5,
    baths: 6,
    sqft: "7,200",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    tag: "Featured",
    views: "Burj Khalifa View",
  },
  {
    id: 2,
    title: "Marina Pearl Tower",
    type: "Apartment",
    area: "Dubai Marina",
    price: "AED 4,200,000",
    beds: 3,
    baths: 3,
    sqft: "2,100",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80",
    tag: "New",
    views: "Marina View",
  },
  {
    id: 3,
    title: "Palm Shore Villa",
    type: "Villa",
    area: "Palm Jumeirah",
    price: "AED 52,000,000",
    beds: 7,
    baths: 8,
    sqft: "12,400",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    tag: "Exclusive",
    views: "Sea Front",
  },
  {
    id: 4,
    title: "Creek Harbour Loft",
    type: "Duplex",
    area: "Dubai Creek",
    price: "AED 7,800,000",
    beds: 4,
    baths: 4,
    sqft: "3,900",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    tag: "Premium",
    views: "Creek View",
  },
  {
    id: 5,
    title: "Business Bay Heights",
    type: "Apartment",
    area: "Business Bay",
    price: "AED 2,950,000",
    beds: 2,
    baths: 2,
    sqft: "1,450",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    tag: "New",
    views: "Canal View",
  },
  {
    id: 6,
    title: "Emirates Hills Manor",
    type: "Villa",
    area: "Emirates Hills",
    price: "AED 85,000,000",
    beds: 9,
    baths: 10,
    sqft: "18,000",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    tag: "Ultra-Luxury",
    views: "Golf Course",
  },
];

const AREAS = [
  {
    name: "Downtown Dubai",
    count: "240+",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=70",
  },
  {
    name: "Palm Jumeirah",
    count: "185+",
    img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=70",
  },
  {
    name: "Dubai Marina",
    count: "320+",
    img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=70",
  },
  {
    name: "Business Bay",
    count: "290+",
    img: "https://images.unsplash.com/photo-1594388935685-6b1c0c54e88c?w=600&q=70",
  },
  {
    name: "Emirates Hills",
    count: "75+",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=70",
  },
  {
    name: "Jumeirah",
    count: "160+",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=70",
  },
];

const SERVICES = [
  {
    icon: "🏡",
    title: "Residential Sales",
    desc: "Curated portfolio of apartments, villas, and penthouses across Dubai's most prestigious addresses.",
  },
  {
    icon: "🏢",
    title: "Commercial Leasing",
    desc: "Premium office spaces and retail units in Dubai's thriving business districts.",
  },
  {
    icon: "📈",
    title: "Investment Advisory",
    desc: "Strategic guidance on Dubai's real estate market to maximise your portfolio returns.",
  },
  {
    icon: "🔑",
    title: "Property Management",
    desc: "End-to-end management services so your investment performs while you're away.",
  },
  {
    icon: "🌍",
    title: "International Buyers",
    desc: "Dedicated concierge service for international investors navigating UAE property law.",
  },
  {
    icon: "⚖️",
    title: "Legal & Compliance",
    desc: "Full legal support with DLD registration, RERA compliance, and title deeds.",
  },
];

const TESTIMONIALS = [
  {
    name: "James Worthington",
    role: "Investor, London",
    text: "AURUM found us the perfect penthouse in Downtown Dubai within two weeks. Their market knowledge and white-glove service is unmatched.",
    avatar: "JW",
  },
  {
    name: "Sophia Al Rashid",
    role: "Private Client",
    text: "I have worked with several agencies across Dubai, but none come close to AURUM's professionalism and attention to detail.",
    avatar: "SA",
  },
  {
    name: "Marcus Chen",
    role: "CEO, Hong Kong",
    text: "They managed our entire portfolio — acquisitions, management, exits — with absolute precision. Truly elite service.",
    avatar: "MC",
  },
];

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useScrollFadeUp() {
  useEffect(() => {
    const els = document.querySelectorAll(".au-fade-up");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ═══════════════════════════════════════════════════════
   LOGO SVG
═══════════════════════════════════════════════════════ */
function AurumLogo() {
  return (
    <svg viewBox="0 0 32 32" fill="none" style={{ width: 32, height: 32 }}>
      <polygon
        points="16,2 30,12 30,26 16,30 2,26 2,12"
        stroke="#C9A96E"
        strokeWidth="1.2"
        fill="rgba(201,169,110,0.08)"
      />
      <polygon
        points="16,7 25,13 25,23 16,27 7,23 7,13"
        stroke="#C9A96E"
        strokeWidth="0.6"
        fill="rgba(201,169,110,0.04)"
      />
      <circle cx="16" cy="16" r="2.2" fill="#C9A96E" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   COUNTER
═══════════════════════════════════════════════════════ */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let n = 0;
          const step = target / 60;
          const t = setInterval(() => {
            n += step;
            if (n >= target) {
              setVal(target);
              clearInterval(t);
            } else setVal(Math.floor(n));
          }, 18);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Properties", "Areas", "Services", "About", "Contact"];

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: "padding .4s, background .4s",
    padding: scrolled ? "12px 0" : "20px 0",
    ...(scrolled ? {} : { background: "transparent" }),
  };

  return (
    <nav className={scrolled ? "au-nav-blur" : ""} style={navStyle}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <AurumLogo />
          <div>
            <div
              className="au-gold-text"
              style={{
                fontFamily: T.cormorant,
                fontSize: 20,
                fontWeight: 500,
                letterSpacing: "0.25em",
              }}
            >
              AURUM
            </div>
            <div
              style={{
                fontFamily: T.montserrat,
                fontSize: 7,
                letterSpacing: "0.28em",
                color: "rgba(245,240,232,0.3)",
              }}
            >
              DUBAI REAL ESTATE
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <div
          style={{ display: "flex", gap: 36, alignItems: "center" }}
          className="au-desktop-links"
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                fontFamily: T.montserrat,
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "rgba(245,240,232,0.6)",
                textDecoration: "none",
                fontWeight: 500,
                textTransform: "uppercase",
                transition: "color .3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#C9A96E")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(245,240,232,0.6)")
              }
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="au-btn-gold"
          style={{ padding: "10px 22px", borderRadius: 2 }}
        >
          Book Consultation
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: 6,
            padding: 8,
          }}
          className="au-hamburger"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                height: 1,
                background: "#C9A96E",
                transition: "all .3s",
                width: i === 1 ? (open ? 0 : 16) : 24,
                transform:
                  i === 0 && open
                    ? "rotate(45deg) translate(5px,5px)"
                    : i === 2 && open
                      ? "rotate(-45deg) translate(5px,-5px)"
                      : "none",
                opacity: i === 1 && open ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`au-mobile-menu au-nav-blur ${open ? "open" : "closed"} au-mobile-only`}
      >
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: T.montserrat,
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "rgba(245,240,232,0.7)",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid rgba(201,169,110,0.1)",
                textTransform: "uppercase",
              }}
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            className="au-btn-gold"
            style={{
              padding: "13px 0",
              textAlign: "center",
              marginTop: 12,
              borderRadius: 2,
            }}
          >
            Book Consultation
          </a>
        </div>
      </div>

      {/* Responsive helper styles */}
      <style>{`
        @media(max-width:900px) {
          .au-desktop-links { display:none !important; }
          nav > div > a.au-btn-gold { display:none !important; }
          .au-hamburger { display:flex !important; }
        }
        @media(min-width:901px) { .au-mobile-only { display:none !important; } }
      `}</style>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
function Hero() {
  const [tab, setTab] = useState("Buy");

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* BG */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg,rgba(10,10,10,.25) 0%,rgba(10,10,10,.65) 55%,rgba(10,10,10,1) 100%),
          url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=80') center/cover no-repeat`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(201,169,110,.09) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 24px 80px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 680 }}>
          {/* Label */}
          <div
            className="au-hero-h1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#C9A96E",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: T.montserrat,
                fontSize: 9,
                letterSpacing: "0.3em",
                color: "#C9A96E",
                textTransform: "uppercase",
              }}
            >
              Est. 2008 · Dubai, UAE
            </span>
          </div>

          {/* Headline */}
          <h1 className="au-hero-h1">
            <span
              className="au-hero-h1-text"
              style={{
                display: "block",
                fontFamily: T.cormorant,
                fontSize: "5.5rem",
                fontWeight: 300,
                lineHeight: 1,
                color: T.ivory,
              }}
            >
              Where Luxury
            </span>
            <span
              className="au-hero-h1-text au-gold-text"
              style={{
                display: "block",
                fontFamily: T.cormorant,
                fontSize: "5.5rem",
                fontWeight: 300,
                lineHeight: 1.05,
                fontStyle: "italic",
              }}
            >
              Meets Legacy.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="au-hero-sub"
            style={{
              fontFamily: T.montserrat,
              fontSize: 13,
              lineHeight: 2,
              color: "rgba(245,240,232,.58)",
              marginTop: 24,
              marginBottom: 40,
              maxWidth: 440,
              letterSpacing: ".02em",
            }}
          >
            Dubai's most exclusive portfolio of residences, penthouses, and
            villas. Curated for those who demand nothing less than
            extraordinary.
          </p>

          {/* Search box */}
          <div
            className="au-hero-search"
            style={{
              background: "rgba(0,0,0,.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(201,169,110,.25)",
              borderRadius: 3,
              padding: 6,
              maxWidth: 700,
            }}
          >
            <div style={{ display: "flex", gap: 4, padding: "8px 8px 4px" }}>
              {["Buy", "Rent", "Off-Plan"].map((t) => (
                <button
                  key={t}
                  className={`au-tab-btn ${tab === t ? "active" : ""}`}
                  onClick={() => setTab(t)}
                  style={{ borderRadius: 2 }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
                gap: 6,
                padding: "4px 8px 8px",
              }}
            >
              {[
                { ph: "Select Area", opts: AREAS.map((a) => a.name) },
                {
                  ph: "Property Type",
                  opts: [
                    "Apartment",
                    "Villa",
                    "Penthouse",
                    "Townhouse",
                    "Duplex",
                    "Off-Plan",
                  ],
                },
                {
                  ph: "Budget",
                  opts: [
                    "Up to AED 2M",
                    "AED 2M – 5M",
                    "AED 5M – 15M",
                    "AED 15M – 50M",
                    "AED 50M+",
                  ],
                },
              ].map(({ ph, opts }) => (
                <select
                  key={ph}
                  className="au-input"
                  style={{ padding: "12px 14px", borderRadius: 2 }}
                >
                  <option value="">{ph}</option>
                  {opts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ))}
              <button
                className="au-btn-gold"
                style={{
                  padding: "12px 22px",
                  borderRadius: 2,
                  whiteSpace: "nowrap",
                  fontSize: 10,
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div
            className="au-hero-stats"
            style={{
              display: "flex",
              gap: 40,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            {[
              ["1,200+", "Active Listings"],
              ["AED 2B+", "Transactions"],
              ["16", "Years of Excellence"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  className="au-gold-text"
                  style={{
                    fontFamily: T.cormorant,
                    fontSize: 28,
                    fontWeight: 400,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: T.montserrat,
                    fontSize: 9,
                    color: "rgba(245,240,232,.4)",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: T.montserrat,
            fontSize: 9,
            letterSpacing: ".22em",
            color: "rgba(201,169,110,.5)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          className="au-shimmer"
          style={{
            width: 1,
            height: 36,
            background: "linear-gradient(180deg,#C9A96E,transparent)",
          }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════════════ */
function StatsBar() {
  return (
    <section style={{ background: T.charcoal, padding: "64px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="au-gold-line au-shimmer" style={{ marginBottom: 48 }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 16,
          }}
        >
          {[
            { n: 1200, s: "+", l: "Premium Listings" },
            { n: 98, s: "%", l: "Client Satisfaction" },
            { n: 3500, s: "+", l: "Properties Sold" },
            { n: 16, s: "", l: "Years in Dubai Market" },
          ].map(({ n, s, l }) => (
            <div
              key={l}
              className="au-stat-card au-fade-up"
              style={{ borderRadius: 3 }}
            >
              <div
                className="au-gold-text"
                style={{
                  fontFamily: T.cormorant,
                  fontSize: "3rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                <Counter target={n} suffix={s} />
              </div>
              <div
                style={{
                  fontFamily: T.montserrat,
                  fontSize: 9,
                  color: "rgba(245,240,232,.4)",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
        <div className="au-gold-line au-shimmer" style={{ marginTop: 48 }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PROPERTIES
═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   AREAS
═══════════════════════════════════════════════════════ */
function Areas() {
  return (
    <section id="areas" style={{ background: T.charcoal, padding: "96px 0" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          marginBottom: 48,
        }}
        className="au-fade-up"
      >
        <div
          style={{
            fontFamily: T.montserrat,
            fontSize: 9,
            letterSpacing: ".3em",
            color: "#C9A96E",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Prime Locations
        </div>
        <h2
          className="au-section-h2"
          style={{ fontFamily: T.cormorant, fontSize: "4rem", fontWeight: 300 }}
        >
          <span style={{ color: T.ivory }}>Explore Dubai's</span>
          <br />
          <span className="au-gold-text" style={{ fontStyle: "italic" }}>
            Finest Districts
          </span>
        </h2>
      </div>

      <div
        className="au-areas-scroll"
        style={{
          display: "flex",
          gap: 16,
          padding: "0 24px",
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        {AREAS.map((a, i) => (
          <div
            key={a.name}
            className="au-area-card au-fade-up"
            style={{ borderRadius: 3, transitionDelay: `${i * 60}ms` }}
          >
            <img src={a.img} alt={a.name} />
            <div className="au-area-overlay" />
            <div className="au-area-info">
              <div
                style={{
                  fontFamily: T.cormorant,
                  fontSize: 22,
                  fontWeight: 500,
                  color: T.ivory,
                  marginBottom: 4,
                }}
              >
                {a.name}
              </div>
              <div
                style={{
                  fontFamily: T.montserrat,
                  fontSize: 9,
                  color: "#C9A96E",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                }}
              >
                {a.count} Listings
              </div>
              <div className="au-area-line" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════ */
function About() {
  return (
    <section
      id="about"
      style={{ background: T.obsidian, padding: "96px 24px" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* Text */}
        <div className="au-fade-up">
          <div
            style={{
              fontFamily: T.montserrat,
              fontSize: 9,
              letterSpacing: ".3em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Our Story
          </div>
          <h2
            className="au-section-h2"
            style={{
              fontFamily: T.cormorant,
              fontSize: "4rem",
              fontWeight: 300,
              marginBottom: 28,
            }}
          >
            <span style={{ color: T.ivory }}>A Legacy Built on</span>
            <br />
            <span className="au-gold-text" style={{ fontStyle: "italic" }}>
              Trust & Excellence
            </span>
          </h2>
          <p
            style={{
              fontFamily: T.montserrat,
              fontSize: 13,
              lineHeight: 2,
              color: T.ivoryDim,
              marginBottom: 16,
            }}
          >
            Since 2008, AURUM has been synonymous with prestige in Dubai's real
            estate landscape. We have guided over 3,500 families and investors
            to their dream properties — from breathtaking waterfront villas on
            Palm Jumeirah to iconic penthouses overlooking Burj Khalifa.
          </p>
          <p
            style={{
              fontFamily: T.montserrat,
              fontSize: 13,
              lineHeight: 2,
              color: T.ivoryDim,
              marginBottom: 36,
            }}
          >
            Our philosophy is simple: every client deserves a bespoke journey.
            We combine deep market intelligence with a curated portfolio and a
            team of dedicated advisors who understand the art of luxury living.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 36,
            }}
          >
            {[
              ["RERA Certified", "Registered Agents"],
              ["DLD Partner", "Official Developer Relations"],
              ["Top 10", "Dubai Luxury Agency 2024"],
              ["UHNWI", "Specialist Advisors"],
            ].map(([t, s]) => (
              <div
                key={t}
                style={{
                  padding: 16,
                  border: "1px solid rgba(201,169,110,.18)",
                  background: "rgba(201,169,110,.03)",
                  borderRadius: 2,
                }}
              >
                <div
                  style={{
                    fontFamily: T.montserrat,
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#C9A96E",
                    letterSpacing: ".1em",
                    marginBottom: 4,
                  }}
                >
                  {t}
                </div>
                <div
                  style={{
                    fontFamily: T.montserrat,
                    fontSize: 10,
                    color: "rgba(245,240,232,.4)",
                  }}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>
          <button
            className="au-btn-gold"
            style={{ padding: "14px 36px", borderRadius: 2 }}
          >
            Meet Our Team
          </button>
        </div>

        {/* Image */}
        <div className="au-fade-up" style={{ position: "relative" }}>
          <div
            style={{
              borderRadius: 3,
              overflow: "hidden",
              height: 580,
              position: "relative",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
              alt="Dubai Luxury"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg,rgba(201,169,110,.12) 0%,transparent 60%)",
              }}
            />
          </div>
          {/* Float card */}
          <div
            className="au-float"
            style={{
              position: "absolute",
              bottom: -24,
              left: -24,
              padding: 24,
              background: "linear-gradient(135deg,#1a1508,#111)",
              border: "1px solid rgba(201,169,110,.35)",
              borderRadius: 3,
              boxShadow: "0 24px 60px rgba(0,0,0,.5)",
            }}
          >
            <div
              className="au-gold-text"
              style={{
                fontFamily: T.cormorant,
                fontSize: "2.8rem",
                fontWeight: 300,
              }}
            >
              16
            </div>
            <div
              style={{
                fontFamily: T.montserrat,
                fontSize: 9,
                color: "rgba(245,240,232,.5)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Years of Excellence
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {"★★★★★".split("").map((s, i) => (
                <span key={i} style={{ color: "#C9A96E", fontSize: 13 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="au-corner-tl" style={{ top: 16, left: 16 }} />
          <div className="au-corner-br" style={{ bottom: 8, right: 8 }} />
        </div>
      </div>

      <style>{`@media(max-width:900px){ #about > div { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════ */
function Services() {
  return (
    <section
      id="services"
      style={{ background: T.charcoal, padding: "96px 24px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="au-fade-up"
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div
            style={{
              fontFamily: T.montserrat,
              fontSize: 9,
              letterSpacing: ".3em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            What We Offer
          </div>
          <h2
            className="au-section-h2"
            style={{
              fontFamily: T.cormorant,
              fontSize: "4rem",
              fontWeight: 300,
            }}
          >
            <span style={{ color: T.ivory }}>Complete Real Estate</span>
            <br />
            <span className="au-gold-text" style={{ fontStyle: "italic" }}>
              Solutions
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 20,
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="au-service-card au-fade-up"
              style={{ borderRadius: 3, transitionDelay: `${i * 70}ms` }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  border: "1px solid rgba(201,169,110,.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(201,169,110,.05)",
                  borderRadius: 2,
                  marginBottom: 20,
                  fontSize: 24,
                }}
              >
                {s.icon}
              </div>
              <h3
                style={{
                  fontFamily: T.cormorant,
                  fontSize: 22,
                  fontWeight: 500,
                  color: T.ivory,
                  marginBottom: 10,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: T.montserrat,
                  fontSize: 12,
                  lineHeight: 1.9,
                  color: T.ivoryDim,
                }}
              >
                {s.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 20,
                  fontFamily: T.montserrat,
                  fontSize: 9,
                  color: "#C9A96E",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Learn More <span style={{ fontSize: 14 }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════ */
function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section style={{ background: T.obsidian, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="au-fade-up"
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div
            style={{
              fontFamily: T.montserrat,
              fontSize: 9,
              letterSpacing: ".3em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Client Stories
          </div>
          <h2
            className="au-section-h2"
            style={{
              fontFamily: T.cormorant,
              fontSize: "4rem",
              fontWeight: 300,
            }}
          >
            <span style={{ color: T.ivory }}>Words From Our</span>
            <br />
            <span className="au-gold-text" style={{ fontStyle: "italic" }}>
              Distinguished Clients
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 20,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`au-testi-card au-fade-up ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              style={{ borderRadius: 3, transitionDelay: `${i * 90}ms` }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} style={{ color: "#C9A96E", fontSize: 13 }}>
                    {s}
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontFamily: T.cormorant,
                  fontSize: 15,
                  fontStyle: "italic",
                  lineHeight: 1.8,
                  color: "rgba(245,240,232,.65)",
                  marginBottom: 28,
                }}
              >
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(135deg,#8B6914,#C9A96E)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: T.montserrat,
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#0A0A0A",
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: T.montserrat,
                      fontSize: 13,
                      fontWeight: 500,
                      color: T.ivory,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: T.montserrat,
                      fontSize: 9,
                      color: "rgba(245,240,232,.4)",
                      letterSpacing: ".1em",
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CTA BANNER
═══════════════════════════════════════════════════════ */
function CTABanner() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg,#0c0900,#1a1200,#0c0900)",
        padding: "96px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%,rgba(201,169,110,.13) 0%,transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(201,169,110,.5),transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(201,169,110,.5),transparent)",
        }}
      />

      <div
        className="au-fade-up"
        style={{
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: T.montserrat,
            fontSize: 9,
            letterSpacing: ".3em",
            color: "#C9A96E",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          Begin Your Journey
        </div>
        <h2
          className="au-section-h2"
          style={{
            fontFamily: T.cormorant,
            fontSize: "4.5rem",
            fontWeight: 300,
            marginBottom: 20,
          }}
        >
          <span style={{ color: T.ivory }}>Your Dream Home</span>
          <br />
          <span className="au-gold-text" style={{ fontStyle: "italic" }}>
            Awaits in Dubai
          </span>
        </h2>
        <p
          style={{
            fontFamily: T.montserrat,
            fontSize: 13,
            lineHeight: 2,
            color: T.ivoryFaint,
            marginBottom: 36,
            maxWidth: 480,
            margin: "0 auto 36px",
          }}
        >
          Let our expert advisors guide you to the finest properties in Dubai.
          Schedule a private consultation today — completely complimentary.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#contact"
            className="au-btn-gold"
            style={{ padding: "14px 40px", borderRadius: 2 }}
          >
            Book Free Consultation
          </a>
          <a
            href="tel:+97144000000"
            className="au-btn-outline"
            style={{ padding: "14px 40px", borderRadius: 2 }}
          >
            +971 4 400 0000
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      id="contact"
      style={{ background: T.charcoal, padding: "96px 24px" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Info */}
        <div className="au-fade-up">
          <div
            style={{
              fontFamily: T.montserrat,
              fontSize: 9,
              letterSpacing: ".3em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Get In Touch
          </div>
          <h2
            className="au-section-h2"
            style={{
              fontFamily: T.cormorant,
              fontSize: "4rem",
              fontWeight: 300,
              marginBottom: 20,
            }}
          >
            <span style={{ color: T.ivory }}>Contact Our</span>
            <br />
            <span className="au-gold-text" style={{ fontStyle: "italic" }}>
              Expert Advisors
            </span>
          </h2>
          <p
            style={{
              fontFamily: T.montserrat,
              fontSize: 13,
              lineHeight: 2,
              color: T.ivoryDim,
              marginBottom: 36,
            }}
          >
            Ready to begin? Our specialists are available 7 days a week to guide
            you through Dubai's most exclusive real estate opportunities.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              ["📍", "Office", "One Central, Sheikh Zayed Road, Dubai, UAE"],
              ["📞", "Phone", "+971 4 400 0000"],
              ["✉️", "Email", "hello@aurumdubai.ae"],
              ["⏰", "Hours", "Sunday – Thursday: 9AM – 7PM"],
            ].map(([icon, label, val]) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    border: "1px solid rgba(201,169,110,.25)",
                    background: "rgba(201,169,110,.05)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: T.montserrat,
                      fontSize: 9,
                      color: "#C9A96E",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: T.montserrat,
                      fontSize: 13,
                      color: "rgba(245,240,232,.7)",
                    }}
                  >
                    {val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="au-fade-up">
          <div
            style={{
              padding: 36,
              border: "1px solid rgba(201,169,110,.2)",
              background: "rgba(10,10,10,.5)",
              borderRadius: 3,
              position: "relative",
            }}
          >
            <div className="au-corner-tl" />
            <div className="au-corner-br" />
            <h3
              style={{
                fontFamily: T.cormorant,
                fontSize: 24,
                fontWeight: 500,
                color: T.ivory,
                marginBottom: 24,
              }}
            >
              Send Us a Message
            </h3>
            <form
              onSubmit={submit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <input
                  required
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="au-input"
                  style={{ padding: "13px 16px", borderRadius: 2 }}
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="au-input"
                  style={{ padding: "13px 16px", borderRadius: 2 }}
                />
              </div>
              <input
                placeholder="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="au-input"
                style={{ padding: "13px 16px", borderRadius: 2 }}
              />
              <select
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className="au-input"
                style={{ padding: "13px 16px", borderRadius: 2 }}
              >
                <option value="">I'm interested in…</option>
                {[
                  "Buying a Property",
                  "Renting a Property",
                  "Selling my Property",
                  "Investment Advisory",
                  "Property Management",
                  "General Enquiry",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <textarea
                required
                placeholder="Your message…"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="au-input"
                style={{
                  padding: "13px 16px",
                  borderRadius: 2,
                  resize: "vertical",
                }}
              />
              <button
                type="submit"
                className="au-btn-gold"
                style={{
                  padding: "15px 0",
                  borderRadius: 2,
                  fontSize: 10,
                  opacity: sent ? 0.8 : 1,
                }}
              >
                {sent ? "✓  Message Sent" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){ #contact > div { grid-template-columns:1fr !important; gap:48px !important; } }`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Our Team", "Awards", "News & Press", "Careers"],
    },
    {
      title: "Properties",
      links: ["Apartments", "Villas", "Penthouses", "Off-Plan", "Commercial"],
    },
    {
      title: "Areas",
      links: [
        "Downtown Dubai",
        "Palm Jumeirah",
        "Dubai Marina",
        "Emirates Hills",
        "Business Bay",
      ],
    },
  ];

  return (
    <footer style={{ background: T.obsidian }}>
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(201,169,110,.5),transparent)",
        }}
      />
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 32px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 18,
              }}
            >
              <AurumLogo />
              <div>
                <div
                  className="au-gold-text"
                  style={{
                    fontFamily: T.cormorant,
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: "0.25em",
                  }}
                >
                  AURUM
                </div>
                <div
                  style={{
                    fontFamily: T.montserrat,
                    fontSize: 7,
                    letterSpacing: "0.28em",
                    color: "rgba(245,240,232,.3)",
                  }}
                >
                  DUBAI REAL ESTATE
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: T.montserrat,
                fontSize: 12,
                lineHeight: 1.9,
                color: "rgba(245,240,232,.4)",
                marginBottom: 20,
              }}
            >
              Dubai's most prestigious real estate agency, delivering
              extraordinary living since 2008.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["in", "tw", "ig", "fb"].map((s) => (
                <div
                  key={s}
                  style={{
                    width: 34,
                    height: 34,
                    border: "1px solid rgba(201,169,110,.25)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: T.montserrat,
                    fontSize: 9,
                    fontWeight: 600,
                    color: "rgba(245,240,232,.45)",
                    cursor: "pointer",
                    transition: "all .3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C9A96E";
                    e.currentTarget.style.color = "#C9A96E";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,.25)";
                    e.currentTarget.style.color = "rgba(245,240,232,.45)";
                  }}
                >
                  {s.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <div
                style={{
                  fontFamily: T.montserrat,
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: ".18em",
                  color: "#C9A96E",
                  textTransform: "uppercase",
                  marginBottom: 18,
                }}
              >
                {title}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      style={{
                        fontFamily: T.montserrat,
                        fontSize: 12,
                        color: "rgba(245,240,232,.4)",
                        textDecoration: "none",
                        transition: "color .3s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#C9A96E")}
                      onMouseLeave={(e) =>
                        (e.target.style.color = "rgba(245,240,232,.4)")
                      }
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(201,169,110,.4),transparent)",
            marginBottom: 24,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: T.montserrat,
              fontSize: 10,
              color: "rgba(245,240,232,.3)",
            }}
          >
            © 2024 AURUM Dubai Real Estate. All Rights Reserved. RERA No. 12345.
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontFamily: T.montserrat,
                    fontSize: 10,
                    color: "rgba(245,240,232,.3)",
                    textDecoration: "none",
                    transition: "color .3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#C9A96E")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(245,240,232,.3)")
                  }
                >
                  {l}
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){ footer > div > div:first-child { grid-template-columns:1fr 1fr !important; } }`}</style>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════ */
export default function App() {
  useScrollFadeUp();

  return (
    <>
      {/* Inject global styles */}
      {/* <style>{GLOBAL_CSS}</style>s */}

      <Navbar />
      <Hero />
      <StatsBar />
      <Properties />
      <Areas />
      <About />
      <Services />
      <Testimonials />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}
