import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import { collectionRef } from "../services/firestore.service";
import { getDocs } from "firebase/firestore";

interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
  imageUrl?: string;
}

const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snapshot = await getDocs(collectionRef("services"));
        const servicesData: Service[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Service, "id">),
        }));
        setServices(servicesData);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleEnquire = (serviceTitle: string) => {
    window.location.href = `mailto:typingcenter@example.com?subject=Enquiry: ${encodeURIComponent(
      serviceTitle
    )}`;
  };

  return (
    <main>
      <Hero />
      <section className="services grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No services available.</p>
        ) : (
          services.map(service => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              price={service.price}
              imageUrl={service.imageUrl}
              onEnquire={() => handleEnquire(service.title)}
            />
          ))
        )}
      </section>
      <section className="contact p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p>Email: typingcenter@example.com</p>
        <p>Phone: +974 1234 5678</p>
        <div className="map mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.123456!2d51.531!3d25.285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c123456789%3A0xabcdef123456!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
