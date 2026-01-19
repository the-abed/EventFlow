// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AuthProvider from './components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NextEvents',
  description: 'Event Management with Next.js & NextAuth.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning is added here to ignore 
          browser extension attributes like 'data-gr-ext-installed' 
      */}
      <body 
        className={`${inter.className} min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Navbar />
          <main className="grow w-11/12 mx-auto">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}