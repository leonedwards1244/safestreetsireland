import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TheProblem from './components/TheProblem';
import MissionVisionValues from './components/MissionVisionValues';
import ImpactBanner from './components/ImpactBanner';
import Events from './components/Events';
import Stories from './components/Stories';
import GetInvolved from './components/GetInvolved';
import SupportedBy from './components/SupportedBy';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { Modal, type ModalType } from './components/ActionModals';
import { SuccessPage } from './pages/SuccessPage';
import { CancelPage } from './pages/CancelPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import EducationalMaterialsPage from './pages/resources/EducationalMaterialsPage';
import FamilySupportPage from './pages/resources/FamilySupportPage';
import NewsUpdatesPage from './pages/resources/NewsUpdatesPage';
import ResearchDataPage from './pages/resources/ResearchDataPage';
import YouthResourcesPage from './pages/resources/YouthResourcesPage';

function HomePage() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const fundraiselyRef = useRef<HTMLButtonElement>(null);

  // Clicking any Donate button on the site fires the hidden Fundraisely trigger
  const handleDonate = () => {
    fundraiselyRef.current?.click();
  };

  // Route 'donate' to Fundraisely; all other modal types open normally
  const handleOpenModal = (type: ModalType) => {
    if (type === 'donate') {
      handleDonate();
    } else {
      setActiveModal(type);
    }
  };

  return (
    <>
      <Navbar onOpenDonate={handleDonate} />
      <Hero onOpenDonate={handleDonate} />
      <About />
      <TheProblem />
      <MissionVisionValues />
      <ImpactBanner />
      <Events />
      <Stories />
      <GetInvolved
        activeModal={activeModal}
        onOpenModal={handleOpenModal}
        onCloseModal={() => setActiveModal(null)}
      />
      <SupportedBy />
      <Newsletter />
      <Footer />

      {/* Non-donate modals (volunteer / partner / chapter) */}
      {activeModal && activeModal !== 'donate' && (
        <Modal type={activeModal} onClose={() => setActiveModal(null)} />
      )}

      {/* Hidden Fundraisely trigger — the script listens for clicks on [data-fundraisely-donate] */}
      <button
        ref={fundraiselyRef}
        type="button"
        data-fundraisely-donate=""
        data-club-id="8fe572df-ef63-4559-9816-d084ad85c314"
        data-title="Donate"
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resources/educational-materials" element={<EducationalMaterialsPage />} />
        <Route path="/resources/family-support" element={<FamilySupportPage />} />
        <Route path="/resources/news-updates" element={<NewsUpdatesPage />} />
        <Route path="/resources/research-data" element={<ResearchDataPage />} />
        <Route path="/resources/youth-resources" element={<YouthResourcesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
