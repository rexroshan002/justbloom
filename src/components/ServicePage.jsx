import { ArrowLeft, ArrowRight, CheckCircle, Home, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SiteMeta from "./SiteMeta";
import { getServiceBySlug, serviceCatalog } from "../data/siteContent";
import "./ServicePage.css";

const serviceFilterMap = {
  Creative: ["shooting-production", "editing-post-production", "brand-promotion"],
  Growth: ["meta-ads-campaigns", "google-ads-campaigns", "strategy-management"],
};

const ServicePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;
  const relatedServices = service.relatedSlugs.map(getServiceBySlug).filter(Boolean);

  return (
    <main className="service-page">
      <SiteMeta title={service.title} description={service.description} type="article" service={service} />
      <div className="service-topbar">
        <Link to="/" className="service-home-link"><Home size={16} /> JustBloom</Link>
        <Link to="/services" className="service-back-link"><ArrowLeft size={16} /> All services</Link>
      </div>
      <section className="service-hero service-hero-detail">
        <div className="service-hero-copy">
          <div className={`service-icon-container ${service.colorClass}`}><Icon size={32} className="service-svg" /></div>
          <div className="premium-badge"><span className="badge-dot"></span> JustBloom service</div>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="service-hero-actions">
            <button className="submit-btn" onClick={() => navigate("/contact")}>
              Discuss your goals <ArrowRight size={16} />
            </button>
            <Link to="/" className="service-text-link">Explore the homepage <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="service-hero-aside"><Sparkles size={18} /><span>Built around your next growth milestone.</span></div>
      </section>

      <section className="service-detail-grid" aria-labelledby="service-outcomes">
        <div>
          <div className="premium-badge"><span className="badge-dot"></span> What you get</div>
          <h2 id="service-outcomes">Built to move your brand forward.</h2>
        </div>
        <ul>
          {service.outcomes.map((outcome) => <li key={outcome}><CheckCircle size={18} /> {outcome}</li>)}
        </ul>
      </section>

      <section className="service-related" aria-labelledby="related-services">
        <div className="premium-badge"><span className="badge-dot"></span> Complete the system</div>
        <h2 id="related-services">Services that work better together.</h2>
        <div className="service-related-grid">
          {relatedServices.map((related) => (
            <Link to={`/services/${related.slug}`} className="service-related-card" key={related.slug}>
              <span>{related.title}</span><ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export const ServicesIndex = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filters = ["All", "Core", "Creative", "Growth"];
  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return serviceCatalog.filter((service) => {
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Core" && service.isMainService) ||
        serviceFilterMap[activeFilter]?.includes(service.slug);
      const matchesQuery =
        !normalizedQuery ||
        `${service.title} ${service.shortDescription}`.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <main className="service-page services-index-page">
      <SiteMeta title="Services" />
      <div className="service-topbar">
        <Link to="/" className="service-home-link"><Home size={16} /> JustBloom</Link>
        <Link to="/" className="service-back-link"><ArrowLeft size={16} /> Back home</Link>
      </div>
      <section className="service-hero services-index-hero">
        <div className="premium-badge"><span className="badge-dot"></span> Our services</div>
        <h1>Turn attention into <span className="service-gradient-text">momentum.</span></h1>
        <p>Choose the capability that solves today’s challenge, or combine services into a growth system built around your next milestone.</p>
        <div className="service-index-intro">
          <span><strong>09</strong> capabilities</span>
          <span><strong>03</strong> core services</span>
          <span><strong>01</strong> accountable partner</span>
        </div>
      </section>
      <section className="service-catalog" aria-label="Service catalog">
        <div className="service-catalog-heading">
          <div><span className="catalog-kicker">The JustBloom system</span><h2>Find your next move.</h2></div>
          <p>Start focused. Scale intelligently. Every service is designed to connect with the next.</p>
        </div>
        <div className="service-catalog-controls">
          <div className="service-filter-tabs" role="group" aria-label="Filter services">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "Core" ? "Core services" : filter}
              </button>
            ))}
          </div>
          <label className="service-search">
            <span className="sr-only">Search services</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search capabilities"
            />
            <span aria-hidden="true">⌕</span>
          </label>
        </div>
        <div className="service-results-meta" aria-live="polite">
          <span>{filteredServices.length} {filteredServices.length === 1 ? "capability" : "capabilities"} shown</span>
          {(activeFilter !== "All" || query) && (
            <button type="button" onClick={() => { setActiveFilter("All"); setQuery(""); }}>Clear filters</button>
          )}
        </div>
        <div className="service-catalog-grid">
          {filteredServices.map((service) => {
            const index = serviceCatalog.findIndex((item) => item.slug === service.slug);
            const Icon = service.icon;
            return (
              <Link to={`/services/${service.slug}`} className={`service-catalog-card ${service.isMainService ? "is-featured" : ""}`} key={service.slug}>
                <div className="catalog-card-top">
                  <div className={`service-icon-container ${service.colorClass}`}><Icon size={24} className="service-svg" /></div>
                  <span className="catalog-number">0{index + 1}</span>
                </div>
                {service.isMainService && <span className="catalog-badge">Core capability</span>}
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <ul className="catalog-outcomes">
                  {service.outcomes.slice(0, 2).map((outcome) => <li key={outcome}><CheckCircle size={14} /> {outcome}</li>)}
                </ul>
                <span className="catalog-link">Explore service <ArrowRight size={16} /></span>
              </Link>
            );
          })}
        </div>
        {filteredServices.length === 0 && (
          <div className="service-empty-state">
            <Sparkles size={22} />
            <h3>No capability matches that search.</h3>
            <p>Try a broader term or explore all of the JustBloom system.</p>
            <button type="button" onClick={() => { setActiveFilter("All"); setQuery(""); }}>Show all services</button>
          </div>
        )}
      </section>
      <section className="service-process">
        <div className="service-process-heading">
          <span className="catalog-kicker">How it works</span>
          <h2>Simple by design. Serious about outcomes.</h2>
        </div>
        <div className="service-process-steps">
          <div><span>01</span><h3>Align</h3><p>We clarify the opportunity, audience, and outcome that matters.</p></div>
          <div><span>02</span><h3>Build</h3><p>We connect the right creative, channel, and execution plan.</p></div>
          <div><span>03</span><h3>Improve</h3><p>We learn from performance and keep the system moving forward.</p></div>
        </div>
      </section>
      <section className="service-index-cta">
        <div><span className="catalog-kicker">Not sure where to begin?</span><h2>Let’s map the right growth path together.</h2></div>
        <Link to="/contact" className="submit-btn">Start a conversation <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
};

export default ServicePage;
