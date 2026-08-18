import { Link } from 'react-scroll';
import React from 'react';
import { ArrowRight, Send, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';
import logo from '../assets/logo.webp';

const SocialIcon = ({ type }) => {
  const getPath = () => {
    switch (type) {
      case 'linkedin':
        return <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />;
      case 'twitter':
        return <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />;
      case 'instagram':
        return <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />;
      case 'youtube':
        return <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />;
      default:
        return <circle cx="12" cy="12" r="10" />;
    }
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {getPath()}
    </svg>
  );
};

const Footer = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="footer-section relative">
      {/* Absolute ambient footer glow */}
      <div className="footer-glow"></div>

      {/* --- Elevated CTA Banner --- */}
      <div className="cta-banner-wrapper">
        <div className="cta-banner premium-mesh-cta">
          <div className="cta-left">
            <div className="cta-icon-box glass-orb"><Send size={20} strokeWidth={2.5} /></div>
            <div className="cta-text">
              <h3>Ready to Grow Your Brand?</h3>
              <p>Let's architect something legendary together.</p>
            </div>
          </div>
          <button className="cta-btn premium-invert-btn" onClick={scrollToContact}>
            <span>Get Free Consultation</span> <ArrowRight size={18} className="kinetic-arrow" />
          </button>
        </div>
      </div>

      {/* --- Main Footer --- */}
      <div className="main-footer">
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="JustBloom Logo" style={{ width: '32px', height: '32px' }} />
            <div className="footer-logo-text">
              <span className="brand-name">Just<span className="text-gradient">Bloom</span></span>
              <span className="brand-tagline">Where Brands Bloom</span>
            </div>
          </div>
          <p className="footer-desc">
            Helping elite businesses scale with high-fidelity creative content, weaponized advertising, and result-driven strategy.
          </p>
          <p className="footer-copyright">© 2026 JustBloom. All Rights Reserved.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="kinetic-links">
            <li><Link to="about" smooth={true} offset={-100} duration={500}>About Us</Link></li>
            <li><Link to="services" smooth={true} offset={-100} duration={500}>Services</Link></li>
            <li><Link to="portfolio" smooth={true} offset={-100} duration={500}>Portfolio</Link></li>
            <li><Link to="about" smooth={true} offset={-100} duration={500}>Why Us</Link></li>
            <li><Link to="contact" smooth={true} offset={-100} duration={500}>Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul className="kinetic-links">
            <li><Link to="services" smooth={true} offset={-100} duration={500}>Shooting & Production</Link></li>
            <li><Link to="services" smooth={true} offset={-100} duration={500}>Editing & Post Production</Link></li>
            <li><Link to="services" smooth={true} offset={-100} duration={500}>Brand Promotion</Link></li>
            <li><Link to="services" smooth={true} offset={-100} duration={500}>Meta Ads Campaigns</Link></li>
            <li><Link to="services" smooth={true} offset={-100} duration={500}>Google Ads Campaigns</Link></li>
            <li><Link to="services" smooth={true} offset={-100} duration={500}>Strategy & Management</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <div className="contact-item"><Mail size={16} className="contact-icon" /> hello@justbloom.agency</div>
          <div className="contact-item"><Phone size={16} className="contact-icon" /> +91 98632 33254</div>
          <div className="contact-item"><MapPin size={16} className="contact-icon" /> Bangalore, India</div>
          
          <h4 style={{ marginTop: '24px' }}>Follow Us</h4>
          <div className="footer-socials">
            <a href="#" aria-label="LinkedIn" className="magnetic-social"><SocialIcon type="linkedin" /></a>
            <a href="#" aria-label="X" className="magnetic-social"><SocialIcon type="twitter" /></a>
            <a href="#" aria-label="Instagram" className="magnetic-social"><SocialIcon type="instagram" /></a>
            <a href="#" aria-label="YouTube" className="magnetic-social"><SocialIcon type="youtube" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;