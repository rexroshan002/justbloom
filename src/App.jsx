import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderAndHero from "./components/HeaderAndHero";
import OurServices from "./components/OurServices";
import AboutAndFounders from "./components/AboutAndFounders";
import StatsBanner from "./components/StatsBanner";
import RecentProjects from "./components/RecentProjects";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

// The homepage sections bundled together
const Home = () => (
  <>
    <HeaderAndHero />
    <AboutAndFounders />
    <OurServices />
    <StatsBanner />
    <RecentProjects />
    <Footer />
  </>
); // <--- THIS WAS MISSING IN YOUR FILE

function App() {
  return (
    <Router>
      {" "}
      {/* <--- Removed basename for Netlify */}
      <Routes>
        {/* The main URL shows the homepage */}
        <Route path="/" element={<Home />} />
        {/* The /contact URL shows ONLY the form */}
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
