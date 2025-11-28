// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css'; // Your main stylesheet (e.g., Tailwind)



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
      <body className={ "min-h-screen flex flex-col"}>
        <AuthProvider>
          <Navbar />
          <main className="grow w-11/12 mx-auto">{children}</main>
         <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}