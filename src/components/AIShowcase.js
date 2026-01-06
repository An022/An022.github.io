import React from 'react';
import { AcademicCapIcon, CurrencyDollarIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

const AIShowcase = () => {
  const projects = [
    {
      name: 'The Mimir',
      focus: 'AI-driven language learning platform',
      techStack: ['Vue.js', 'AWS Lambda', 'GPT-4', 'LangChain'],
      impact: '70% faster grading, +40% user engagement',
      color: 'blue',
      icon: AcademicCapIcon
    },
    {
      name: 'BOC Loan ETL',
      focus: 'Financial data pipeline migration',
      techStack: ['FastAPI', 'Airflow', 'Pandas', 'PostgreSQL'],
      impact: '30K+ records automated daily',
      color: 'green',
      icon: CurrencyDollarIcon
    },
    {
      name: 'PwC Audit Automation',
      focus: 'Digital audit workflow',
      techStack: ['VBA', 'Power BI', 'Pandas'],
      impact: '-35% audit cycle time',
      color: 'purple',
      icon: DocumentChartBarIcon
    }
  ];

  const skills = [
    { name: 'Data Logic', value: 95 },
    { name: 'System Design', value: 85 },
    { name: 'Product Thinking', value: 80 },
    { name: 'Automation', value: 90 },
    { name: 'AI Integration', value: 85 }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-700',
        badge: 'bg-green-100 text-green-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-500',
        text: 'text-purple-700',
        badge: 'bg-purple-100 text-purple-700'
      }
    };
    return colors[color];
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Product Showcase
          </h2>
          <p className="text-lg text-gray-600">
            Building intelligent systems from audit to engineering
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Project Cards */}
          <div className="space-y-6">
            {projects.map((project, index) => {
              const colors = getColorClasses(project.color);
              const IconComponent = project.icon;
              
              return (
                <div 
                  key={index}
                  className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-10 h-10 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
                        {project.name}
                      </h3>
                      <p className="text-gray-700 mb-3">{project.focus}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.techStack.map((tech, i) => (
                          <span 
                            key={i}
                            className={`${colors.badge} px-3 py-1 rounded-full text-xs font-medium`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">{project.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Skills Radar - Simplified Bar Chart */}
          <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Technical Evolution
            </h3>
            <p className="text-sm text-gray-600 mb-8 text-center">
              From audit to engineering: Five core capabilities
            </p>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{skill.name}</span>
                    <span className="text-sm font-bold text-gray-900">{skill.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Audit Background</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Engineering Skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;

