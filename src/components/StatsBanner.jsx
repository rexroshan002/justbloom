import React from 'react';
import { statsData } from '../data/constants';
import './StatsBanner.css';

const StatsBanner = () => {
  return (
    <section className="stats-section">
      <div className="stats-container dark-glass-pill">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="stat-item">
              <div className="stat-icon-box">
                <IconComponent size={24} className="stat-icon" />
              </div>
              <div className="stat-number text-gradient-light">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsBanner;