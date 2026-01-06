import React from 'react';

const UserStories = () => {
  const stories = [
    {
      icon: 'fas fa-chart-line',
      title: 'As an Auditor',
      description: 'I want to analyze financial data and identify risks so that I can ensure compliance and optimize business processes.',
      criteria: '6+ years experience'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'As a Student',
      description: 'I want to learn computer science fundamentals so that I can transition into software engineering.',
      criteria: 'MS Computer Science'
    },
    {
      icon: 'fas fa-code',
      title: 'As a Developer',
      description: 'I want to build scalable applications so that I can solve real-world problems with technology.',
      criteria: '3+ years experience'
    }
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">User Stories</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-secondary p-8 rounded-2xl border border-accent">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <i className={`${story.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{story.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {story.description}
              </p>
              <div className="flex items-center text-sm text-accent font-semibold">
                <i className="fas fa-check-circle mr-2"></i>
                Acceptance Criteria: {story.criteria}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserStories;

