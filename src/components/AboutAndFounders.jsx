import React from 'react';
import { Lightbulb, ShieldCheck, RefreshCcw } from 'lucide-react';
import './AboutAndFounders.css';

import josephImg from '../assets/joseph.webp';
import williamImg from '../assets/william.webp';
/* NEW: Import Ahshve's profile image */
import roshanImg from '../assets/roshan.webp';

const AboutAndFounders = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-grid">
        {/* --- Left Column: About Text --- */}
        <div className="about-left">
          <div className="premium-badge">
            <span className="badge-dot"></span> About JustBloom
          </div>
          <h2 className="about-title">
            We Don't Just Market,<br />We Help Brands <span className="text-gradient">Bloom.</span>
          </h2>
          <p className="about-desc">
            JustBloom is an elite digital marketing agency helping businesses scale through scroll-stopping content, weaponized advertising, and data-driven precision.
          </p>
          
          <div className="about-features">
            <div className="feature-item interactive-row">
              <div className="feature-icon-box"><Lightbulb size={22} /></div>
              <div className="feature-text">
                <h4>Creative Thinking</h4>
                <p>Unique, high-fidelity ideas that shatter the mold.</p>
              </div>
            </div>
            <div className="feature-item interactive-row">
              <div className="feature-icon-box"><ShieldCheck size={22} /></div>
              <div className="feature-text">
                <h4>Result Driven</h4>
                <p>Every single campaign is mathematically built to convert.</p>
              </div>
            </div>
            <div className="feature-item interactive-row">
              <div className="feature-icon-box"><RefreshCcw size={22} /></div>
              <div className="feature-text">
                <h4>Transparent Process</h4>
                <p>Crystal clear communication. No black boxes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Column: Founders --- */}
        <div className="about-right">
          <div className="founders-header-row">
            <div>
              <div className="premium-badge">
                <span className="badge-dot blue-dot"></span> Leadership
              </div>
              {/* Updated heading to include all 3 founders */}
              <h3 className="founders-title">Joseph, William & Roshan</h3>
              <p className="founders-desc">
                Three passionate minds with one ruthless vision — to engineer explosive growth for brands.
              </p>
            </div>
            
            <div className="founder-socials">
              <a href="#" aria-label="LinkedIn" className="magnetic-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="magnetic-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          <div className="about-ambient-glow"></div>
          <div className="founders-cards">
            <div className="founder-card glass-panel">
              <div className="founder-image-wrapper">
                <img src={josephImg} alt="Joseph - Co-Founder of JustBloom" />
              </div>
              <div className="founder-info">
                <div className="founder-name">Joseph</div>
                <div className="founder-role">Co-Founder</div>
                <div className="founder-badge pulse-badge">Visionary</div>
              </div>
            </div>
            
            <div className="founder-card glass-panel">
              <div className="founder-image-wrapper">
                <img src={williamImg} alt="William - Co-Founder of JustBloom" />
              </div>
              <div className="founder-info">
                <div className="founder-name">William</div>
                <div className="founder-role">Co-Founder</div>
                <div className="founder-badge pulse-badge">Strategist</div>
              </div>
            </div>

            {/* NEW: Ahshve Roshan's Profile */}
            <div className="founder-card glass-panel">
              <div className="founder-image-wrapper">
                <img src={roshanImg} alt="Ahshve Roshan - CTO of JustBloom" />
              </div>
              <div className="founder-info">
                <div className="founder-name">Roshan</div>
                <div className="founder-role">CTO</div>
                <div className="founder-badge pulse-badge" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>Architect</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAndFounders;