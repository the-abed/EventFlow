"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // initialize from localStorage (lazy so it doesn't set state during render on server)
  const [isAuth, setIsAuth] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  });
  const router = useRouter();

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token") setIsAuth(!!e.newValue);
    };

    const onAuthChanged = () => {
      const t =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      setIsAuth(!!t);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, []);

  function handleLogout() {
    if (typeof window !== "undefined") localStorage.removeItem("token");
    setIsAuth(false);
    // notify other listeners
    try {
      window.dispatchEvent(new Event("authChanged"));
    } catch (e) {}
    router.push("/");
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
   {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/EventFlowLogo.png"        // 🔥 your logo file
            alt="EventFlow Logo"
            width={60}             // you can change size
            height={60}
            className="object-contain"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            EventFlow
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-white font-semibold">
          <li>
            <Link className="hover:text-accent transition" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-accent transition" href="/event">
             All Events
            </Link>
          </li>

          {!isAuth ? (
            <>
              <li>
                <Link className="hover:text-accent transition" href="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent transition" href="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="hover:text-accent transition"
                  href="/manage-event"
                >
                  Manage Events
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-accent transition"
                  href="/add-event"
                >
                  Add Event
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-accent transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-96 w-full transition-all duration-300  bg-black/50 backdrop-blur-xl rounded-b-xl overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 " : "max-h-0 opacity-0"
        }`}
      >
        <ul className="bg-black/10 backdrop-blur-xl px-4 py-4 flex flex-col gap-4 font-semibold text-white shadow-lg border-t border-white/40 ">
          <li>
            <Link onClick={() => setIsOpen(false)} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={() => setIsOpen(false)} href="/event">
              All Events
            </Link>
          </li>

          {!isAuth ? (
            <>
              <li>
                <Link onClick={() => setIsOpen(false)} href="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link onClick={() => setIsOpen(false)} href="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link onClick={() => setIsOpen(false)} href="/manage-event">
                  Manage Events
                </Link>
              </li>
              <li>
                <Link onClick={() => setIsOpen(false)} href="/add-event">
                  Add Event
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="text-left"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
