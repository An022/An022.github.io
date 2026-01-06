import React from 'react';

const SprintRetrospective = () => {
  const retrospectiveData = [
    {
      title: 'What Went Well',
      icon: 'fas fa-thumbs-up',
      iconBg: 'bg-accent',
      items: [
        'Successfully migrated ETL pipeline to Python',
        'Improved API security and performance',
        'Great team collaboration and communication'
      ],
      iconClass: 'fas fa-check-circle',
      iconColor: 'text-accent'
    },
    {
      title: 'What Could Be Improved',
      icon: 'fas fa-exclamation-triangle',
      iconBg: 'bg-accent',
      items: [
        'Need better documentation for new processes',
        'More automated testing coverage',
        'Faster deployment pipeline setup'
      ],
      iconClass: 'fas fa-arrow-up',
      iconColor: 'text-accent'
    },
    {
      title: 'Action Items',
      icon: 'fas fa-tasks',
      iconBg: 'bg-accent',
      items: [
        'Create comprehensive API documentation',
        'Implement CI/CD pipeline improvements',
        'Schedule knowledge sharing sessions'
      ],
      iconClass: 'fas fa-play',
      iconColor: 'text-accent'
    }
  ];

  return (
    <section id="retrospective" className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Sprint Retrospective</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {retrospectiveData.map((section, index) => (
            <div key={index} className="bg-primary p-8 rounded-2xl shadow-lg border border-accent">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${section.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${section.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <i className={`${section.iconClass} ${section.iconColor} mr-3 mt-1`}></i>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SprintRetrospective;







