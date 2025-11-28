import React from 'react'
import Hero from './components/Hero'
import SyntheticHero from './components/GetStarted'
import Navbar from './components/Navbar'
import HowItWorks from './components/HowItWorks'
import WhatIsEdify from './components/WhatIsEdify'
import Footer from './components/Footer'
import FloatingImage from './components/FloatingImage'
import About from './components/About'
import Features from './components/Features'
import Contact from './components/Contact'
import SmoothScrollWrapper from './components/ui/SmoothScrollWrapper' // Import the wrapper

const App = () => {
  return (
    <SmoothScrollWrapper>
      {/* Added overflow-hidden here to ensure no double scrollbars appear 
         before Lenis takes over.
      */}
      <div className="w-full overflow-hidden bg-black">
        <Navbar />
        <Hero />
        <SyntheticHero />
        <HowItWorks />
        <WhatIsEdify />
        <About />
        <Features />
        <FloatingImage />
        <Contact />
        <Footer />
      </div>
    </SmoothScrollWrapper>
  )
}

export default App