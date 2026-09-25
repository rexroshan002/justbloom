import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { projectsData } from "../data/constants";
import "./RecentProjects.css";

const fallbackProjectImage =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=450&fit=crop&auto=format";

const RecentProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const itemsPerPage = 3;

  const top10Projects = projectsData.slice(0, 10);
  const filters = useMemo(
    () => ["All", ...new Set(top10Projects.map((project) => project.badge))],
    [top10Projects],
  );
  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? top10Projects
        : top10Projects.filter((project) => project.badge === activeFilter),
    [activeFilter, top10Projects],
  );

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - itemsPerPage);
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < filteredProjects.length) {
      setCurrentIndex(
        Math.min(
          currentIndex + itemsPerPage,
          filteredProjects.length - itemsPerPage,
        ),
      );
    }
  };

  const visibleProjects = filteredProjects.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  const displayedProjects = showAll ? filteredProjects : visibleProjects;

  return (
    <section id="portfolio" className="projects-section">
      <div className="projects-header">
        <div className="projects-header-left">
          <div className="premium-badge">
            <span className="badge-dot"></span> Our Work
          </div>
          <h2 className="projects-title">
            Recent <span className="text-gradient">Projects</span>
          </h2>
          <p className="projects-desc">
            Real results for real brands. Witness the growth.
          </p>
          <div className="project-filters" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentIndex(0);
                  setShowAll(false);
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-header-right">
          {/* Dynamic Button toggles the grid */}
          <button
            className={`btn-view-all premium-ghost-btn ${showAll ? "active-collapse" : ""}`}
            onClick={() => {
              if (showAll) setCurrentIndex(0);
              setShowAll(!showAll);
            }}
          >
            <span>{showAll ? "Show fewer" : `View all ${filteredProjects.length}`}</span>
            {showAll ? (
              <X size={16} />
            ) : (
              <ArrowRight size={16} className="kinetic-arrow" />
            )}
          </button>

          {/* Hide Carousel Arrows when expanded */}
          {!showAll && (
            <div className="projects-arrows">
              <button
                className={`glass-nav-btn ${currentIndex === 0 ? "disabled" : ""}`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={`glass-nav-btn ${currentIndex + itemsPerPage >= filteredProjects.length ? "disabled" : ""}`}
                onClick={handleNext}
                disabled={currentIndex + itemsPerPage >= filteredProjects.length}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="projects-grid">
        {displayedProjects.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            className="project-card editorial-card animate-stagger"
            style={{
              animationDelay: `${index * 0.05}s`,
            }} /* Rapid staggered entrance */
          >
            <div className="project-image-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                onError={(event) => {
                  if (event.currentTarget.src !== fallbackProjectImage) {
                    event.currentTarget.src = fallbackProjectImage;
                  }
                }}
              />
              <div className="project-overlay"></div>
            </div>

            <div className="project-badge ethereal-badge">{project.badge}</div>

            <div className="project-info">
              <div className="info-content">
                <h4>{project.title}</h4>
                <p>{project.desc}</p>
                <button
                  className="project-link"
                  type="button"
                  aria-label={`View case study for ${project.title}`}
                  onClick={() => setSelectedProject(project)}
                >
                  View Case Study{" "}
                  <ArrowRight size={14} className="kinetic-arrow" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="project-modal-close"
              type="button"
              aria-label="Close project details"
              onClick={() => setSelectedProject(null)}
            >
              <X size={20} />
            </button>
            <img
              src={selectedProject.image}
              alt=""
              onError={(event) => {
                if (event.currentTarget.src !== fallbackProjectImage) {
                  event.currentTarget.src = fallbackProjectImage;
                }
              }}
            />
            <div className="project-modal-content">
              <span className="modal-kicker">{selectedProject.badge}</span>
              <h3 id="project-modal-title">{selectedProject.title}</h3>
              <p>{selectedProject.desc}</p>
              <div className="modal-result">
                <strong>Campaign focus</strong>
                <span>Strategy, creative execution and measurable growth.</span>
              </div>
              <button className="premium-ghost-btn" type="button" onClick={() => setSelectedProject(null)}>
                Back to projects <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentProjects;
