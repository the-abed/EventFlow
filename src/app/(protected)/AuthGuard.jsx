"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }) {
  const checkedRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    const token = localStorage.getItem("token");
    if (!token) {
      const redirectTo = encodeURIComponent(pathname || "/");
      router.replace(`/login?from=${redirectTo}`);
    }
  }, [router, pathname]);

  return <>{children}</>;
}
