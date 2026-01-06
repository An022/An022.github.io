import React from 'react';

const SprintVelocity = () => {
  const sprintData = [
    { sprint: 'Sprint 1', points: 8, completed: 8 },
    { sprint: 'Sprint 2', points: 12, completed: 10 },
    { sprint: 'Sprint 3', points: 10, completed: 10 },
    { sprint: 'Sprint 4', points: 15, completed: 12 },
    { sprint: 'Sprint 5', points: 13, completed: 13 },
  ];

  const averageVelocity = sprintData.reduce((sum, sprint) => sum + sprint.completed, 0) / sprintData.length;

  return (
    <section id="sprint-velocity" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Sprint Velocity</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track team performance and sprint completion rates
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Sprint History</h3>
            <div className="space-y-4">
              {sprintData.map((sprint, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{sprint.sprint}</span>
                    <span className="text-sm text-gray-300">
                      {sprint.completed}/{sprint.points} points
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(sprint.completed / sprint.points) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-sm text-gray-300">
                      {Math.round((sprint.completed / sprint.points) * 100)}% complete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-700 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Team Metrics</h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {averageVelocity.toFixed(1)}
                </div>
                <div className="text-gray-300">Average Velocity (points/sprint)</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {sprintData.filter(s => s.completed === s.points).length}
                  </div>
                  <div className="text-sm text-gray-300">Perfect Sprints</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {sprintData.reduce((sum, s) => sum + s.completed, 0)}
                  </div>
                  <div className="text-sm text-gray-300">Total Points Completed</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-600">
                <div className="text-sm text-gray-300 text-center">
                  <span className="font-medium">Next Sprint Forecast:</span><br />
                  Based on average velocity, plan for ~{Math.round(averageVelocity)} points
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SprintVelocity;






