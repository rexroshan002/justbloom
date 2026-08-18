import React from 'react';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/constants';
import './OurServices.css';

const OurServices = () => {
  return (
    <section id="services" className="services-section">
      {/* Absolute Ambient Background Glow */}
      <div className="ambient-glow"></div>

      <div className="services-header">
        <div className="premium-badge mx-auto">
          <span className="badge-dot"></span> What We Do
        </div>
        <h2 className="services-title">
          Our Premium <span className="text-gradient">Services</span>
        </h2>
      </div>

      <div className="services-grid">
        {servicesData.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div key={index} className="service-card bento-glass">
              <div className={`service-icon-container ${service.colorClass}`}>
                <IconComponent size={28} className="service-svg" />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
              <a href="#" onClick={(e) => e.preventDefault()} className="service-link premium-ghost-btn">
                <span>Learn More</span> <ArrowRight size={16} className="kinetic-arrow" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurServices;