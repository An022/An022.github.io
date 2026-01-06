import React, { useState } from 'react';
import { BriefcaseIcon, AcademicCapIcon, SparklesIcon, ServerIcon } from '@heroicons/react/24/outline';

const JourneyMap = () => {
  const [activePhase, setActivePhase] = useState(null);

  const journeyData = [
    {
      year: '2015–2021',
      phase: 'PwC Taiwan',
      focus: 'Digitalizing audit processes',
      coreSkill: 'Excel VBA, data validation, risk modeling',
      story: 'Led Digital Pilot Team to reduce audit processing time by 35%',
      color: 'blue',
      icon: BriefcaseIcon
    },
    {
      year: '2021–2023',
      phase: 'NYU Courant',
      focus: 'System design & data engineering foundation',
      coreSkill: 'Python, SQL, Algorithms',
      story: 'Built strong foundation in computer science fundamentals',
      color: 'purple',
      icon: AcademicCapIcon
    },
    {
      year: '2023–2024',
      phase: 'The Mimir',
      focus: 'AI-based product development',
      coreSkill: 'Vue.js, Tailwind, LangChain, AWS',
      story: 'Built language learning platform serving 4,500+ users',
      color: 'green',
      icon: SparklesIcon
    },
    {
      year: '2024–Present',
      phase: 'BOC US',
      focus: 'Financial data automation & service reliability',
      coreSkill: 'FastAPI, Airflow, Sentry, Docker',
      story: 'Migrated ETL pipelines processing 30K+ records daily',
      color: 'orange',
      icon: ServerIcon
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        border: 'border-blue-500',
        text: 'text-blue-700',
        ring: 'ring-blue-400',
        dot: 'bg-blue-500'
      },
      purple: {
        bg: 'bg-purple-100',
        border: 'border-purple-500',
        text: 'text-purple-700',
        ring: 'ring-purple-400',
        dot: 'bg-purple-500'
      },
      green: {
        bg: 'bg-green-100',
        border: 'border-green-500',
        text: 'text-green-700',
        ring: 'ring-green-400',
        dot: 'bg-green-500'
      },
      orange: {
        bg: 'bg-orange-100',
        border: 'border-orange-500',
        text: 'text-orange-700',
        ring: 'ring-orange-400',
        dot: 'bg-orange-500'
      }
    };
    return colors[color];
  };

  return (
    <section id="journey" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Journey Map: From Audit to Engineering
          </h2>
          <p className="text-lg text-gray-600">
            An interactive timeline of my technical evolution
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2"></div>
          
          {/* Timeline Nodes */}
          <div className="relative flex justify-between items-center">
            {journeyData.map((item, index) => {
              const colors = getColorClasses(item.color);
              const isActive = activePhase === index;
              
              return (
                <div 
                  key={index}
                  className="relative flex flex-col items-center"
                  style={{ width: '25%' }}
                >
                  {/* Node Circle */}
                  <div 
                    className="relative cursor-pointer group"
                    onMouseEnter={() => setActivePhase(index)}
                    onMouseLeave={() => setActivePhase(null)}
                  >
                    {/* Ripple Effect */}
                    <div className={`absolute inset-0 ${colors.dot} rounded-full animate-ping opacity-20 ${isActive ? 'block' : 'hidden'}`}></div>
                    
                    {/* Main Circle */}
                    <div className={`relative w-16 h-16 ${colors.dot} rounded-full flex items-center justify-center transform transition-all duration-300 ${isActive ? 'scale-125 shadow-lg' : 'group-hover:scale-110'}`}>
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>

                    {/* Info Card */}
                    <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl border-2 ${colors.border} p-4 z-10 transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                      <p className="text-xs text-gray-500 font-semibold mb-2">{item.year}</p>
                      <h3 className={`text-lg font-bold ${colors.text} mb-2`}>{item.phase}</h3>
                      <p className="text-sm text-gray-700 mb-2 font-medium">{item.focus}</p>
                      <div className={`text-xs ${colors.bg} ${colors.text} rounded px-2 py-1 mb-2`}>
                        {item.coreSkill}
                      </div>
                      <p className="text-xs text-gray-600 italic">{item.story}</p>
                    </div>
                  </div>

                  {/* Year Label */}
                  <div className="mt-32 text-center">
                    <p className="text-sm font-semibold text-gray-700">{item.year}</p>
                    <p className={`text-lg font-bold ${colors.text} mt-1`}>{item.phase}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {journeyData.map((item, index) => {
            const colors = getColorClasses(item.color);
            const IconComponent = item.icon;
            
            return (
              <div key={index} className={`bg-white border-2 ${colors.border} rounded-lg p-6 shadow-lg`}>
                <div className="flex items-start gap-4">
                  <div className={`${colors.dot} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-semibold mb-1">{item.year}</p>
                    <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{item.phase}</h3>
                    <p className="text-sm text-gray-700 mb-3 font-medium">{item.focus}</p>
                    <div className={`text-xs ${colors.bg} ${colors.text} rounded px-3 py-2 mb-3 inline-block`}>
                      {item.coreSkill}
                    </div>
                    <p className="text-sm text-gray-600 italic">{item.story}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyMap;

