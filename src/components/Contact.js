import React from 'react';

const Contact = () => {
  const contactMethods = [
    {
      title: 'Email',
      value: 'leeans222@gmail.com',
      link: 'mailto:leeans222@gmail.com'
    },
    {
      title: 'LinkedIn',
      value: 'linkedin.com/in/an222',
      link: 'https://linkedin.com/in/an222'
    },
    {
      title: 'GitHub',
      value: 'github.com/An022',
      link: 'https://github.com/An022'
    }
  ];

  const handleContactClick = (link) => {
    if (link.startsWith('mailto:')) {
      window.location.href = link;
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Feel free to reach out! I'm always open to discussing new opportunities and projects.
          </p>
        </div>
        
        <div className="space-y-4 max-w-md mx-auto">
          {contactMethods.map((method, index) => (
            <button 
              key={index} 
              onClick={() => handleContactClick(method.link)}
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-lg text-left transition-colors group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{method.title}</h3>
                  <p className="text-gray-900 group-hover:text-gray-700">{method.value}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;






