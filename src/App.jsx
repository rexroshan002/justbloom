import { HashRouter, Routes, Route } from "react-router-dom";
import HeaderAndHero from "./components/HeaderAndHero";
import OurServices from "./components/OurServices";
import AboutAndFounders from "./components/AboutAndFounders";
import StatsBanner from "./components/StatsBanner";
import RecentProjects from "./components/RecentProjects";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ServicePage, { ServicesIndex } from "./components/ServicePage";
import SiteMeta from "./components/SiteMeta";

// The homepage sections bundled together
const Home = () => (
  <>
    <SiteMeta />
    <HeaderAndHero />
    <OurServices />
    <StatsBanner />
    <RecentProjects />
    <AboutAndFounders />
    <Footer />
  </>
); //

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* The main URL shows the homepage */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesIndex />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        {/* The /contact URL shows ONLY the form */}
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
