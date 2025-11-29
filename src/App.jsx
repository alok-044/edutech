import React from 'react'
import Hero from './components/Hero'
import GetStarted from './components/GetStarted' // Updated Import
import Navbar from './components/Navbar'
import HowItWorks from './components/HowItWorks'
import WhatIsEdify from './components/WhatIsEdify'
import Footer from './components/Footer'
import FloatingImage from './components/FloatingImage'
import About from './components/About'
import Features from './components/Features'
import Contact from './components/Contact'
import SmoothScrollWrapper from './components/ui/SmoothScrollWrapper'

const App = () => {
  return (
    <SmoothScrollWrapper>
      <div className="w-full overflow-hidden bg-black">
        <Navbar />
        <Hero />
        <GetStarted />
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