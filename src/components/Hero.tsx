import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="hero bg-[#8A1538] text-white p-6"
    >
      <div className="flex items-center mb-6">
        {/* Logo: left-aligned, rounded */}
        <img
          src="/src/assets/famous_logo.png"
          alt="Typing Center Logo"
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        <div>
          <h1 className="text-3xl font-bold">FAMOUS SERVICE</h1>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
