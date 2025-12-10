import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import GalleryPage from "./pages/GalleryPage";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/gallery"
          element={
            <PrivateRoute>
              <GalleryPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/gallery" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
