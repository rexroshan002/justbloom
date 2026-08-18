import React from 'react';
import HeaderAndHero from './components/HeaderAndHero';
import OurServices from './components/OurServices';
import AboutAndFounders from './components/AboutAndFounders';
import StatsBanner from './components/StatsBanner';
import RecentProjects from './components/RecentProjects';
import Footer from './components/Footer'; 
function App() {
  return (
    <>
      <HeaderAndHero />
      <AboutAndFounders />
      <OurServices />
      <StatsBanner />
      <RecentProjects />
      <Footer /> 
    </>
  );
}

export default App;