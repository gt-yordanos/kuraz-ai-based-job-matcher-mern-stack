// AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">About Us</h1>
        <p className="text-gray-600 mb-6">
          Kuraz Tech is a leading company in software development, graphic design, and online learning. Our mission is to empower businesses and individuals through innovative technology solutions and creative design.
        </p>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <img src="path/to/company-photo1.jpg" alt="Our Team" className="rounded-lg" />
            <h2 className="text-xl font-semibold text-blue-600 mt-4">Our Team</h2>
            <p className="text-gray-500 mt-2">We are a diverse team of professionals with a passion for technology and creativity.</p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <img src="path/to/company-photo2.jpg" alt="Our Vision" className="rounded-lg" />
            <h2 className="text-xl font-semibold text-blue-600 mt-4">Our Vision</h2>
            <p className="text-gray-500 mt-2">To be a global leader in technology and design, delivering high-quality solutions to our clients.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
