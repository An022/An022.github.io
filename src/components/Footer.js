import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center text-gray-600">
          <p className="text-sm">
            © {new Date().getFullYear()} An Lee. Built with React & TailwindCSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






