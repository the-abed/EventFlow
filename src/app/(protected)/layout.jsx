// app/(protected)/layout.jsx
import Navbar from "../components/Navbar";
import AuthGuard from "./AuthGuard";

export default function ProtectedLayout({ children }) {
  return (
    <div>
      <Navbar />
      <AuthGuard>
        <main>{children}</main>
      </AuthGuard>
    </div>
  );
}
