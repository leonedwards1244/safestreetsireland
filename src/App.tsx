import { useState } from 'react';
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
import SupportedBy from './components/SupportedBy';
import Footer from './components/Footer';
import { SuccessPage } from './pages/SuccessPage';
import { CancelPage } from './pages/CancelPage';
import YouthResourcesPage from './pages/resources/YouthResourcesPage';
import FamilySupportPage from './pages/resources/FamilySupportPage';
import EducationalMaterialsPage from './pages/resources/EducationalMaterialsPage';
import ResearchDataPage from './pages/resources/ResearchDataPage';
import NewsUpdatesPage from './pages/resources/NewsUpdatesPage';
import { Modal, type ModalType } from './components/ActionModals';

function LandingPage() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const openDonate = () => setActiveModal('donate');

  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.png')" }}
      />
      <div className="fixed inset-0 -z-10 bg-black/50" />

      <div className="relative z-10 min-h-screen">
        <Navbar onOpenDonate={openDonate} />
        <Hero onOpenDonate={openDonate} />
        <About />
        <MissionVisionValues />
        <TheProblem />
        <ImpactBanner />
        <GetInvolved activeModal={activeModal} onOpenModal={setActiveModal} onCloseModal={() => setActiveModal(null)} />
        <Stories />
        <Newsletter />
        <SupportedBy />
        <Footer />
      </div>

      {activeModal && (
        <Modal type={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/thank-you" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/resources/youth" element={<YouthResourcesPage />} />
        <Route path="/resources/family" element={<FamilySupportPage />} />
        <Route path="/resources/educational" element={<EducationalMaterialsPage />} />
        <Route path="/resources/research" element={<ResearchDataPage />} />
        <Route path="/resources/news" element={<NewsUpdatesPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
