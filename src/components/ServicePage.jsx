import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SiteMeta from "./SiteMeta";
import { getServiceBySlug, serviceCatalog } from "../data/siteContent";
import "./ServicePage.css";

const ServicePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = service.icon;
  const relatedServices = service.relatedSlugs
    .map(getServiceBySlug)
    .filter(Boolean);

  return (
    <main className="service-page">
      <SiteMeta
        title={service.title}
        description={service.description}
        type="article"
        service={service}
      />
      <section className="service-hero">
        <Link to="/services" className="service-back-link">
          <ArrowLeft size={16} /> Back to services
        </Link>
        <div className={`service-icon-container ${service.colorClass}`}>
          <Icon size={32} className="service-svg" />
        </div>
        <div className="premium-badge">
          <span className="badge-dot"></span> JustBloom service
        </div>
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <button className="submit-btn" onClick={() => navigate("/contact")}>
          Discuss your goals <ArrowRight size={16} />
        </button>
      </section>

      <section className="service-detail-grid" aria-labelledby="service-outcomes">
        <div>
          <div className="premium-badge">
            <span className="badge-dot"></span> What you get
          </div>
          <h2 id="service-outcomes">Built to move your brand forward.</h2>
        </div>
        <ul>
          {service.outcomes.map((outcome) => (
            <li key={outcome}>
              <CheckCircle size={18} /> {outcome}
            </li>
          ))}
        </ul>
      </section>

      <section className="service-related" aria-labelledby="related-services">
        <div className="premium-badge">
          <span className="badge-dot"></span> Complete the system
        </div>
        <h2 id="related-services">Services that work better together.</h2>
        <div className="service-related-grid">
          {relatedServices.map((related) => (
            <Link to={`/services/${related.slug}`} className="service-related-card" key={related.slug}>
              <span>{related.title}</span>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export const ServicesIndex = () => (
  <main className="service-page">
    <SiteMeta title="Services" />
    <section className="service-hero">
      <div className="premium-badge">
        <span className="badge-dot"></span> Our services
      </div>
      <h1>One growth partner. Every capability.</h1>
      <p>Explore the services that help ambitious brands move from attention to action.</p>
      <div className="service-related-grid">
        {serviceCatalog.map((service) => (
          <Link to={`/services/${service.slug}`} className="service-related-card" key={service.slug}>
            <span>{service.title}</span>
            <ArrowRight size={16} />
          </Link>
        ))}
      </div>
    </section>
  </main>
);

export default ServicePage;
