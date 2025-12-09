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

const ImageUploader = () => {
  const [imageURL, setImageURL] = useState<string>("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);
    setImageURL(url);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />

      {imageURL && (
        <img src={imageURL} alt="uploaded" style={{ width: "200px" }} />
      )}
    </div>
  );
};

export default ImageUploader;
