import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projectsData } from '../data/constants';
import './RecentProjects.css';

const RecentProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false); // NEW: Toggle state
  const itemsPerPage = 3;

  const top10Projects = projectsData.slice(0, 10);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - itemsPerPage);
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < top10Projects.length) {
      setCurrentIndex(Math.min(currentIndex + itemsPerPage, top10Projects.length - itemsPerPage));
    }
  };

  const visibleProjects = top10Projects.slice(currentIndex, currentIndex + itemsPerPage);
  
  // Decide which array to map over based on state
  const displayedProjects = showAll ? top10Projects : visibleProjects;

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
          <p className="projects-desc">Real results for real brands. Witness the growth.</p>
        </div>

        <div className="projects-header-right">
          {/* Dynamic Button toggles the grid */}
          <button 
            className={`btn-view-all premium-ghost-btn ${showAll ? 'active-collapse' : ''}`} 
            onClick={() => {
              if (showAll) setCurrentIndex(0);
              setShowAll(!showAll);
            }}
          >
            <span>{showAll ? 'Collapse Gallery' : 'Top 10 Projects'}</span> 
            {showAll ? <X size={16} /> : <ArrowRight size={16} className="kinetic-arrow" />}
          </button>
          
          {/* Hide Carousel Arrows when expanded */}
          {!showAll && (
            <div className="projects-arrows">
              <button 
                className={`glass-nav-btn ${currentIndex === 0 ? 'disabled' : ''}`} 
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className={`glass-nav-btn ${currentIndex + itemsPerPage >= top10Projects.length ? 'disabled' : ''}`} 
                onClick={handleNext}
                disabled={currentIndex + itemsPerPage >= top10Projects.length}
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
            style={{ animationDelay: `${index * 0.05}s` }} /* Rapid staggered entrance */
          >
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay"></div>
            </div>
            
            <div className="project-badge ethereal-badge">{project.badge}</div>
            
            <div className="project-info">
              <div className="info-content">
                <h4>{project.title}</h4>
                <p>{project.desc}</p>
                <button className="project-link" onClick={(e) => { e.preventDefault(); alert("Case study coming soon!"); }}>
                  View Case Study <ArrowRight size={14} className="kinetic-arrow" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;