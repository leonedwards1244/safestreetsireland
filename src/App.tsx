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

export default function App() {
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
