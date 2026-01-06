import React from 'react';

const SprintBacklog = () => {
  return (
    <section id="sprint-backlog" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Sprint Backlog</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Current sprint tasks and user stories in progress
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold">In Progress</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-sm font-medium">User Story #1</p>
                <p className="text-gray-300 text-sm">Implement responsive navigation</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-sm font-medium">User Story #2</p>
                <p className="text-gray-300 text-sm">Add contact form validation</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold">To Do</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-sm font-medium">User Story #3</p>
                <p className="text-gray-300 text-sm">Optimize images for web</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-sm font-medium">User Story #4</p>
                <p className="text-gray-300 text-sm">Add loading animations</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold">Done</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-sm font-medium">User Story #5</p>
                <p className="text-gray-300 text-sm">Setup project structure</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-sm font-medium">User Story #6</p>
                <p className="text-gray-300 text-sm">Configure Tailwind CSS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SprintBacklog;






