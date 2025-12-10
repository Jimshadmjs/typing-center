import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
  imageUrl?: string;
  onEnquire: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, price, imageUrl, onEnquire }) => {
  return (
    <div className="service-card border rounded shadow p-4 flex flex-col items-center">
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-2 rounded" />}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      {price && <p className="font-bold mb-2">{price}</p>}
      <button
        onClick={onEnquire}
        className="bg-[#8A1538] text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Enquire
      </button>
    </div>
  );
};

export default ServiceCard;
