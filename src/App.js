import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import JourneyMap from './components/JourneyMap';
import SystemArchitecture from './components/SystemArchitecture';
import AIShowcase from './components/AIShowcase';
import AboutPage from './components/AboutPage';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      <Navigation />
      <Hero />
      <JourneyMap />
      <SystemArchitecture />
      <AIShowcase />
      <AboutPage />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

