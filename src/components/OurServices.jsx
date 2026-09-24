import { ArrowRight } from "lucide-react";
import { servicesData } from "../data/constants";
import { serviceCatalog } from "../data/siteContent";
import { Link } from "react-router-dom";
import "./OurServices.css";

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
          const catalogService = serviceCatalog[index];
          return (
            <article key={catalogService?.slug || service.title} className="service-card bento-glass">
              {service.isMainService && (
                <div className="premium-badge">
                  <span className="badge-dot"></span> Main Service
                </div>
              )}
              <div className={`service-icon-container ${service.colorClass}`}>
                <IconComponent size={28} className="service-svg" />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
              <Link
                to={`/services/${catalogService?.slug}`}
                className="service-link premium-ghost-btn"
              >
                <span>Learn More</span>{" "}
                <ArrowRight size={16} className="kinetic-arrow" />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default OurServices;
