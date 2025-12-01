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
          </Routes>
          
          <Footer />
        </div>
      </SmoothScrollWrapper>
    </Router>
  )
}

export default App;