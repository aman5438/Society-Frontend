'use client';

import '@/styles/globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <body className="bg-gray-50">
        {isAdminRoute && <Sidebar />}
        <main className={`${isAdminRoute ? 'md:ml-64' : ''} p-4 min-h-screen`}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
