import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScrollWrapper from './components/ui/SmoothScrollWrapper'

// Import existing Home components
import Hero from './components/Hero'
import GetStarted from './components/GetStarted'
import HowItWorks from './components/HowItWorks'
import WhatIsEdify from './components/WhatIsEdify'
import About from './components/About'
import Features from './components/Features'
import FloatingImage from './components/FloatingImage'
import Contact from './components/Contact'

// Import Pages
import AIInterview from './pages/AIInterview'
import AIResume from './pages/AIResume'
import ImproveATSScore from './pages/ImproveATSScore';
import CreateResume from './pages/CreateResume';
import AIMeeting from './pages/AIMeeting';
import AIPath from './pages/AIPath';
import CreateLearningPath from './pages/CreateLearningPath';
import AIAdvisor from './pages/AIAdvisor';
import AICourse from './courses/AICourse';
import SignIn from './pages/SignIn'; // Import SignIn
import SignUp from './pages/SignUp'; // Import SignUp
import Dashboard from './pages/Dashboard';
import CourseDetails from './courses/CourseDetails';
import QuizPage from './courses/QuizPage';
import Certificate from './courses/Certificate';
import EventsPage from './pages/EventsPage';
import Pricing from './pages/Pricing';
import ChatPage from './pages/ChatPage';
import ContactPage from './pages/ContactPage';
import ARLearning from './ar-learning/ARLearning';
import LaunchWebAR from './ar-learning/LaunchWebAR';
import HumanAnatomy from './ar-learning/HumanAnatomy';
import SolarSystem from './ar-learning/SolarSystem';
import PhysicsLab from './ar-learning/PhysicsLab';
import MolecularChemistry from './ar-learning/MolecularChemistry';
import AncientHistory from './ar-learning/AncientHistory';
import CircuitBuilder from './ar-learning/CircuitBuilder';
import MorphingDemo from './card/MorphingDemo';
import LearnMore from './pages/LearnMore';
// Home Component
const Home = () => (
  <>
    <Hero />
    <GetStarted />
    
   
    <HowItWorks />
    <WhatIsEdify />
    <About />
    <Features />
    <FloatingImage />
    <Contact />
  </>
);

const App = () => {
  return (
    <Router>
      <SmoothScrollWrapper>
        <div className="w-full overflow-hidden bg-black">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Auth Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Feature Routes */}
            <Route path="/ai-interview" element={<AIInterview />} />
            <Route path="/ai-resume" element={<AIResume />} />
            <Route path="/ai-resume/ats-score" element={<ImproveATSScore />} />
            <Route path="/ai-resume/create" element={<CreateResume />} />
            <Route path="/ai-meeting" element={<AIMeeting />} />
            <Route path="/ai-path" element={<AIPath />} />
            <Route path="/ai-path/create" element={<CreateLearningPath />} />
            <Route path="/ai-advisor" element={<AIAdvisor />} />
            <Route path="/ai-course" element={<AICourse />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-course/:id" element={<CourseDetails />} />
            <Route path="/ai-course/:id/quiz" element={<QuizPage />} />
            <Route path="/ai-course/:id/certificate" element={<Certificate />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ar-learning" element={<ARLearning />} />
            <Route path="/ar-learning/anatomy" element={<HumanAnatomy />} />
            <Route path="/ar-learning/solar-system" element={<SolarSystem />} />
            <Route path="/ar-learning/launch" element={<LaunchWebAR />} />
            <Route path="/ar-learning/physics" element={<PhysicsLab />} />
            <Route path="/ar-learning/chemistry" element={<MolecularChemistry />} />
            <Route path="/ar-learning/history" element={<AncientHistory />} />
            <Route path="/ar-learning/circuits" element={<CircuitBuilder />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path='/explore' element={<MorphingDemo/>} />
          </Routes>
          
          <Footer />
        </div>
      </SmoothScrollWrapper>
    </Router>
  )
}

export default App;