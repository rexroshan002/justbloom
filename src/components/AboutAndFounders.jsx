import { Lightbulb, ShieldCheck, RefreshCcw } from "lucide-react";
import "./AboutAndFounders.css";

import josephImg from "../assets/joseph.webp";
import williamImg from "../assets/william.webp";
/* NEW: Import Ahshve's profile image */
import roshanImg from "../assets/roshan.webp";

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
            We Don't Just Market,
            <br />
            We Help Brands <span className="text-gradient">Bloom.</span>
          </h2>
          <p className="about-desc">
            JustBloom is an elite digital marketing agency helping businesses
            scale through scroll-stopping content, weaponized advertising, and
            data-driven precision.
          </p>

          <div className="about-features">
            <div className="feature-item interactive-row">
              <div className="feature-icon-box">
                <Lightbulb size={22} />
              </div>
              <div className="feature-text">
                <h4>Creative Thinking</h4>
                <p>Unique, high-fidelity ideas that shatter the mold.</p>
              </div>
            </div>
            <div className="feature-item interactive-row">
              <div className="feature-icon-box">
                <ShieldCheck size={22} />
              </div>
              <div className="feature-text">
                <h4>Result Driven</h4>
                <p>Every single campaign is mathematically built to convert.</p>
              </div>
            </div>
            <div className="feature-item interactive-row">
              <div className="feature-icon-box">
                <RefreshCcw size={22} />
              </div>
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
                Three passionate minds with one ruthless vision — to engineer
                explosive growth for brands.
              </p>
            </div>

          </div>

          <div className="about-ambient-glow"></div>
          <div className="founders-cards">
            <div className="founder-card glass-panel">
              <div className="founder-image-wrapper">
                <img src={josephImg} alt="Joseph, JustBloom Co-Founder and CEO" width="720" height="1600" loading="lazy" decoding="async" />
              </div>
              <div className="founder-info">
                <div className="founder-name">Joseph</div>
                <div className="founder-role">Co-Founder &amp; CEO</div>
                <div className="founder-badge pulse-badge">Visionary</div>
              </div>
            </div>

            <div className="founder-card glass-panel">
              <div className="founder-image-wrapper">
                <img src={williamImg} alt="William, JustBloom Co-Founder and Managing Director" width="896" height="1200" loading="lazy" decoding="async" />
              </div>
              <div className="founder-info">
                <div className="founder-name">William</div>
                <div className="founder-role">Co-Founder &amp; MD</div>
                <div className="founder-badge pulse-badge">Strategist</div>
              </div>
            </div>

            {/* NEW: Ahshve Roshan's Profile */}
            <div className="founder-card glass-panel">
              <div className="founder-image-wrapper">
                <img src={roshanImg} alt="Roshan, JustBloom Chief Technology Officer" width="1086" height="1448" loading="lazy" decoding="async" />
              </div>
              <div className="founder-info">
                <div className="founder-name">Roshan</div>
                <div className="founder-role">CTO</div>
                <div
                  className="founder-badge pulse-badge"
                  style={{
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  Architect
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAndFounders;
