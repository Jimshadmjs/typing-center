import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/gallery");
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check console.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#8A1538",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#FFFFFF",
      }}
    >
      <h1 style={{ marginBottom: "20px", fontSize: "2rem" }}>Welcome</h1>

      <button
        onClick={handleLogin}
        style={{
          backgroundColor: "#FFFFFF",
          color: "#8A1538",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
