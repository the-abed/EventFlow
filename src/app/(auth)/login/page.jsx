import { Suspense } from "react";
import LoginContent from "./LoginContent";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto mt-20 p-6 text-center">Loading...</div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
