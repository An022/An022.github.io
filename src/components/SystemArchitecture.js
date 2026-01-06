import React from 'react';
import { CircleStackIcon, BoltIcon, MagnifyingGlassIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const SystemArchitecture = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Building Systems That Think
          </h2>
          <p className="text-lg text-gray-600">
            Financial data automation architecture at BOC US
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Source Systems */}
            <div className="flex-shrink-0">
              <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-2">
                  <CircleStackIcon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Source Systems</h3>
                <p className="text-sm text-gray-600">5+ diverse databases</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 transform md:rotate-0 rotate-90">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            {/* ETL Pipeline */}
            <div className="flex-1">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <div className="flex justify-center mb-2">
                  <BoltIcon className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-center">ETL Pipeline</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">FastAPI</span>
                    <span className="text-gray-600">REST endpoints</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">Airflow</span>
                    <span className="text-gray-600">Orchestration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">Pandas</span>
                    <span className="text-gray-600">Data transformation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 transform md:rotate-0 rotate-90">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            {/* Monitoring */}
            <div className="flex-shrink-0">
              <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-2">
                  <MagnifyingGlassIcon className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Error Tracking</h3>
                <p className="text-sm text-gray-600">Sentry monitoring</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 transform md:rotate-0 rotate-90">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            {/* Output */}
            <div className="flex-shrink-0">
              <div className="bg-orange-50 border-2 border-orange-500 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-2">
                  <ChartBarIcon className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Dashboard</h3>
                <p className="text-sm text-gray-600">Loan operations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Impacts */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Automated 30K+ Records</h4>
                <p className="text-sm text-gray-600">Re-architected nightly ETL pipelines to process loan records daily</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">60% Faster Debugging</h4>
                <p className="text-sm text-gray-600">Introduced centralized monitoring with Sentry for error tracking</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Reliable Analytics</h4>
                <p className="text-sm text-gray-600">Ensured downstream analytics for risk and reporting teams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemArchitecture;

