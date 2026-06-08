import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MissionVisionValues from './components/MissionVisionValues';
import TheProblem from './components/TheProblem';
import ImpactBanner from './components/ImpactBanner';
import GetInvolved from './components/GetInvolved';
import Stories from './components/Stories';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { SuccessPage } from './pages/SuccessPage';

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <MissionVisionValues />
      <TheProblem />
      <ImpactBanner />
      <GetInvolved />
      <Stories />
      <Newsletter />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
