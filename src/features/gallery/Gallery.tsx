import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import ImageUploader from "../../components/ImageUploader";
import { addDocWithTimestamp } from "../../services/firestore.service";
import type { ImageDoc } from "../../types/ImageDoc";

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageDoc[]>([]);

  useEffect(() => {
    const q = query(collection(db, "images"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<ImageDoc, "id" | "createdAt">),
        createdAt: d.data().createdAt?.toDate(),
      }));
      setImages(data);
    });

    return () => unsub();
  }, []);

  const handleUpload = async (url: string) => {
    await addDocWithTimestamp("images", { url });
  };

  return (
    <div>
      <ImageUploader onUpload={handleUpload} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt="uploaded"
            className="w-full h-48 object-cover rounded-lg shadow-sm"
          />
        ))}
      </div>
    </div>
  );
};
