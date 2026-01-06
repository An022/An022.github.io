import React from 'react';

const AboutPage = () => {
  const experiences = [
    {
      title: "Software Development",
      description: "Building modern web applications with React, JavaScript, and various technologies."
    },
    {
      title: "Problem Solving",
      description: "Analytical mindset from auditing background, applied to creative technical solutions."
    },
    {
      title: "Continuous Learning",
      description: "Always exploring new technologies and methodologies to improve my craft."
    }
  ];

  const education = [
    {
      degree: "Master of Information Technology",
      school: "University of Melbourne",
      period: "2023 - 2024",
      description: "Specialized in software development and web technologies"
    },
    {
      degree: "Bachelor of Commerce",
      school: "National Taiwan University",
      period: "2015 - 2019",
      description: "Major in Accounting"
    }
  ];

  const workExperience = [
    {
      title: "Auditor",
      company: "PwC Taiwan",
      period: "2019 - 2023",
      description: "Financial auditing and analysis for major corporations"
    }
  ];

  const skills = [
    "React", "JavaScript", "TypeScript", "TailwindCSS", 
    "Node.js", "HTML/CSS", "Git", "Python", 
    "SQL", "RESTful APIs", "Problem Solving", "Agile/Scrum"
  ];

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/files/An-Lee-CV.pdf';
    link.download = 'An-Lee-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          About Me
        </h2>
        <p className="text-lg text-gray-600 mb-16 text-center max-w-2xl mx-auto">
          A journey from numbers to code, driven by curiosity and passion for creating meaningful solutions.
        </p>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
              <p className="text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Education</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{edu.degree}</h4>
                <p className="text-gray-700 font-medium mb-1">{edu.school}</p>
                <p className="text-sm text-gray-500 mb-2">{edu.period}</p>
                <p className="text-gray-600 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Work Experience</h3>
          <div className="max-w-3xl mx-auto">
            {workExperience.map((work, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{work.title}</h4>
                <p className="text-gray-700 font-medium mb-1">{work.company}</p>
                <p className="text-sm text-gray-500 mb-3">{work.period}</p>
                <p className="text-gray-600">{work.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Skills & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Download CV Button */}
        <div className="text-center">
          <button 
            onClick={handleDownloadCV}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full CV
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
