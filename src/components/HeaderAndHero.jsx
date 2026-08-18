import { Link } from 'react-scroll';
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Play, Star, MessageCircle, TrendingUp, Menu, X } from 'lucide-react';
import './HeaderAndHero.css';

import logo from '../assets/logo.webp';
import heroImg from '../assets/hero.webp';

// ── NEW: Avatar Hover-Spring Engine ───────────────────────
const __TRANSITION_STYLES = `
:root {
  --avatar-lift: -6px;
  --avatar-dur: 320ms;
  --avatar-scale: 1.15;
  --avatar-falloff: 0.45;
  --avatar-ease-in: cubic-bezier(0.22, 1, 0.36, 1);
  --avatar-ease-out: cubic-bezier(0.34, 3.85, 0.64, 1);
}

.t-avatar {
  transform-origin: center;
  transform:
    translateY(var(--shift, 0px))
    scale(var(--scale-active, 1));
  transition: transform var(--avatar-dur) var(--avatar-ease-in);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .t-avatar { transition: none !important; transform: none !important; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("transitions-p11")) {
  const __style = document.createElement("style");
  __style.id = "transitions-p11";
  __style.textContent = __TRANSITION_STYLES;
  document.head.appendChild(__style);
}

export function AvatarGroup({ items }) {
  const rootRef = useRef(null);

  const setShifts = (activeIdx, phase) => {
    if (!rootRef.current) return;
    const cs = getComputedStyle(document.documentElement);
    const num = (name, fb) => {
      const v = parseFloat(cs.getPropertyValue(name));
      return Number.isFinite(v) ? v : fb;
    };
    const ease = (name, fb) => cs.getPropertyValue(name).trim() || fb;

    const lift    = num("--avatar-lift", -6);
    const falloff = num("--avatar-falloff", 0.45);
    const scale   = num("--avatar-scale", 1.15);
    const tf      = phase === "out"
      ? ease("--avatar-ease-out", "cubic-bezier(0.34, 3.85, 0.64, 1)")
      : ease("--avatar-ease-in",  "cubic-bezier(0.22, 1, 0.36, 1)");

    const els = rootRef.current.querySelectorAll(".t-avatar");
    els.forEach((el, i) => {
      el.style.transitionTimingFunction = tf;
      if (activeIdx == null) {
        el.style.setProperty("--shift", "0px");
        el.style.setProperty("--scale-active", "1");
        return;
      }
      const d = Math.abs(i - activeIdx);
      el.style.setProperty("--shift", (lift * Math.pow(falloff, d)).toFixed(3) + "px");
      el.style.setProperty("--scale-active", i === activeIdx ? String(scale) : "1");
    });
  };

  return (
    <div ref={rootRef} onMouseLeave={() => setShifts(null, "out")} className="avatar-flex-row">
      {items.map((node, i) => (
        <div key={i} className="t-avatar" onMouseEnter={() => setShifts(i, "in")}>
          {node}
        </div>
      ))}
    </div>
  );
}

// ── Interactive 3D Tilt Wrapper ───────────────────────────
const TiltWrapper = ({ children }) => {
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rxDeg = ((y - centerY) / centerY) * -15; 
    const ryDeg = ((x - centerX) / centerX) * 15;
    const gxPct = (x / rect.width) * 100;
    const gyPct = (y / rect.height) * 100;
    el.style.setProperty('--tilt-rx', `${rxDeg}deg`);
    el.style.setProperty('--tilt-ry', `${ryDeg}deg`);
    el.style.setProperty('--tilt-gx', `${gxPct}%`);
    el.style.setProperty('--tilt-gy', `${gyPct}%`);
    el.classList.add('is-tilting');
  };

  const handleMouseEnter = () => {
    const el = tiltRef.current;
    if (el) el.classList.add('is-hover');
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.classList.remove('is-tilting');
    el.classList.remove('is-hover');
    el.style.setProperty('--tilt-rx', '0deg');
    el.style.setProperty('--tilt-ry', '0deg');
  };

  return (
    <div className="t-tilt" ref={tiltRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="t-tilt-card">
        {children}
        <div className="t-tilt-glare"></div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────
const HeaderAndHero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const openWhatsApp = () => window.open('https://wa.me/919863233254', '_blank');
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Avatar nodes for the new animated group
  const avatarNodes = [
    <div className="avatar premium-shadow"><img src="https://i.pravatar.cc/100?img=22" alt="User 1" /></div>,
    <div className="avatar premium-shadow"><img src="https://i.pravatar.cc/100?img=23" alt="User 2" /></div>,
    <div className="avatar premium-shadow"><img src="https://i.pravatar.cc/100?img=24" alt="User 3" /></div>,
    <div className="avatar premium-shadow"><img src="https://i.pravatar.cc/100?img=25" alt="User 4" /></div>
  ];

  return (
    <div className="page-wrapper">
      {/* 1. Header & Navbar Section */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar">
          <div className="logo-container">
            <div className="logo-icon"><img src={logo} alt="JustBloom Logo" style={{ width: '32px', height: '32px' }} /></div>
            <div className="logo-text">
              <span className="brand-name">Just<span className="brand-highlight">Bloom</span></span>
              <span className="brand-tagline">Where Brands Bloom</span>
            </div>
          </div>

          <ul id="nav-links" className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><Link activeClass="active" to="home" spy smooth offset={-100} duration={200} onClick={closeMenu}>Home</Link></li>
            <li><Link activeClass="active" to="about" spy smooth offset={-100} duration={200} onClick={closeMenu}>About Us</Link></li>
            <li><Link activeClass="active" to="services" spy smooth offset={-100} duration={200} onClick={closeMenu}>Services</Link></li>
            <li><Link activeClass="active" to="portfolio" spy smooth offset={-100} duration={200} onClick={closeMenu}>Portfolio</Link></li>
            <li><Link activeClass="active" to="contact" spy smooth offset={-100} duration={200} onClick={closeMenu}>Contact</Link></li>
            <li className="mobile-only-cta">
              <button className="btn-primary-small w-full" onClick={scrollToContact}>Let's Talk <ArrowRight size={16} /></button>
            </li>
          </ul>

          <div className="nav-actions">
            <button className="btn-primary-small desktop-only" onClick={scrollToContact}>Let's Talk <ArrowRight size={16} /></button>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="nav-links"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section id="home" className="hero-section hero-enter-anim">
        {/* Left Column: Text & Buttons */}
        <div className="hero-content">
          <div className="tagline-badge premium-glow">
            <span className="star-icon">✦</span> Digital Marketing That Delivers Results
          </div>
          <h1 className="hero-title">
            We Grow Brands.<br />You Just <span className="text-gradient">Bloom</span>.
          </h1>
          <p className="hero-subtitle">
            From elite shooting & editing to hyper-targeted Meta & Google Ads campaigns. We architect digital growth that breaks the algorithm.
          </p>
          
          <div className="cta-group">
            <button className="btn-primary-large" onClick={scrollToContact}>
              Get Free Consultation <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">
              <Play size={16} fill="currentColor" /> See Our Magic
            </button>
          </div>

          {/* Upgraded Avatar Group integration */}
          <div className="social-proof">
            <AvatarGroup items={avatarNodes} />
            <span className="social-text">Join <span className="text-bold-blue">50+ Happy Clients</span></span>
            <div className="divider-vertical"></div>
            <div className="reviews">
              <span className="rating-num">5.0</span>
              <div className="stars">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Visuals & Floating Cards */}
        <div className="hero-visuals">
          <TiltWrapper>
            <img 
              src={heroImg} 
              alt="Hero Visual - Digital Marketing and Ads Performance" 
              style={{ width: '100%', maxWidth: '500px', borderRadius: '24px', transform: 'translateZ(20px)', boxShadow: '0 24px 64px rgba(0,0,0,0.1)' }} 
            />
            
            {/* Frosted Glass Floating Cards */}
            <div className="float-card card-meta frosted-glass">
              <div className="card-header"><span className="card-title">Meta Ads</span><span className="icon-infinity">∞</span></div>
              <div className="card-stat">120K+</div>
              <div className="card-label">People Reached</div>
            </div>
            
            <div className="float-card card-google frosted-glass">
              <div className="card-header"><span className="card-title">Google Ads</span><span className="icon-g">G</span></div>
              <div className="card-stat">2.5K+</div>
              <div className="card-label">Conversions</div>
            </div>
            
            <div className="float-card card-growth frosted-glass">
              <div className="card-header"><span className="card-title">Growth</span><TrendingUp size={16} className="icon-trend" /></div>
              <div className="card-stat">150%</div>
              <div className="card-label">Performance Rise</div>
            </div>
          </TiltWrapper>
        </div>

        
      </section>
    </div>
  );
};

export default HeaderAndHero;