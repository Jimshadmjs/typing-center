import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import ImageUploader from "../../components/ImageUploader";
import type { ImageDoc } from "../../types/ImageDoc";
import {auth} from "../../services/firebase"

const imagesCollection = collection(db, "images");


export const handleUpload = async (url: string) => {
  if (!auth.currentUser) throw new Error("User must be logged in.");
  await addDoc(imagesCollection, {
    url,
    ownerId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  });
};

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageDoc[]>([]);

  useEffect(() => {
  const q = query(imagesCollection, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data: ImageDoc[] = snapshot.docs.map((d) => {
      const raw = d.data();

      return {
        id: d.id,
        url: raw.url,
        ownerId: raw.ownerId,
        createdAt: raw.createdAt?.toDate?.() ?? new Date(0),
      };
    });

    setImages(data);
  });

  return () => unsubscribe();
}, []);


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
