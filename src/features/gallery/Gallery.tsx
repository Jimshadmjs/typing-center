import React from "react";

type ImageUploaderProps = {
  onUpload: (url: string) => Promise<void>;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;


    const uploadedUrl = "https://example.com/your-image.jpg";

    await onUpload(uploadedUrl);
  };

  return (
    <div>
      <input type="file" onChange={handleSelectFile} />
    </div>
  );
};

export default ImageUploader;
