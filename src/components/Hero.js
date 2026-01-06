import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/files/An-Lee-CV.pdf';
    link.download = 'An-Lee-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-white pt-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Hi, I'm An Lee
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-4">
          Software Developer & Problem Solver
        </p>
        <p className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          From auditing numbers to building software, I love exploring different paths 
          and turning experiences into skills that create real impact.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => scrollToSection('about')}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            About Me
          </button>
          <button 
            onClick={handleDownloadCV}
            className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;