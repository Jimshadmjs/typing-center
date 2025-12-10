// import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {Gallery , handleUpload} from "../features/gallery/Gallery";
import ImageUploader from "../components/ImageUploader";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

export default function GalleryPage() {
//   const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Gallery</h2>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#8A1538",
            color: "#FFFFFF",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </header>

      <ImageUploader onUpload={handleUpload} />

      <Gallery />
    </div>
  );
}
