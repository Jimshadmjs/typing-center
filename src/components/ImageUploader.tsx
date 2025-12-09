// import type React from "react"
// import { uploadImageUnsigned } from "../services/cloudinary.service"
// import { useState } from "react"

// const ImageUploader: React.FC<{onUpload : (url:string) => void}> = ({onUpload}) => {
//     const [loading , setLoading] = useState(false)
//     const handle = async (e:React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]
//         if(!file) return
//         setLoading(true)
//         const res = await uploadImageUnsigned(file)
//         onUpload(res.secure_url)
//         setLoading(false)
//     }
//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handle} />
//       {loading && <div>Uploading...</div>}
//     </div>
//   )
// }

// export default ImageUploader





import { useState } from "react";
import { uploadToCloudinary } from "../services/cloudinary";

interface ImageUploaderProps {
  onUpload: (url: string) => Promise<void>;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [previewURL, setPreviewURL] = useState<string>("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Upload to Cloudinary (your function)
    const url = await uploadToCloudinary(file);

    // 2. Preview locally
    setPreviewURL(url);

    // 3. Notify parent component
    await onUpload(url);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />

      {previewURL && (
        <img src={previewURL} alt="uploaded" style={{ width: "200px" }} />
      )}
    </div>
  );
}

