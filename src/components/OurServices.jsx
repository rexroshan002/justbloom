import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { servicesData } from "../data/constants";
import { serviceCatalog } from "../data/siteContent";
import { Link } from "react-router-dom";
import "./OurServices.css";

const OurServices = () => {
  const [view, setView] = useState("core");
  const visibleServices = useMemo(
    () =>
      servicesData.filter(
        (service) => view === "all" || service.isMainService,
      ),
    [view],
  );

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
        <p className="services-intro">
          Start with the capabilities built to move your brand forward, then
          add the specialists that complete your growth system.
        </p>
        <div className="services-switcher" role="group" aria-label="Filter services">
          <button
            className={view === "core" ? "is-active" : ""}
            onClick={() => setView("core")}
            type="button"
          >
            Core services <span>{servicesData.filter((service) => service.isMainService).length}</span>
          </button>
          <button
            className={view === "all" ? "is-active" : ""}
            onClick={() => setView("all")}
            type="button"
          >
            All capabilities <span>{servicesData.length}</span>
          </button>
        </div>
      </div>

      <div className="services-grid" key={view}>
        {visibleServices.map((service) => {
          const IconComponent = service.icon;
          const catalogService = serviceCatalog.find(
            (catalogItem) => catalogItem.title === service.title,
          );
          return (
            <article
              key={catalogService?.slug || service.title}
              className={`service-card bento-glass ${service.isMainService ? "is-core" : ""}`}
            >
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
                to={catalogService ? `/services/${catalogService.slug}` : "/services"}
                className="service-link premium-ghost-btn"
                aria-label={`Explore ${service.title}`}
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
