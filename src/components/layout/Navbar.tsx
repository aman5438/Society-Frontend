'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeIcon from '@heroicons/react/24/solid/esm/HomeIcon';

export default function Navbar() {
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setRole(payload.role);
      } catch {
        setRole('');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link href="/" className="flex items-center text-xl font-bold text-indigo-700 hover:text-indigo-900">
      <HomeIcon className="w-5 h-5 mr-2 text-gray-500" />
       SocietyApp
      </Link>

    <div className="space-x-4">
      {role === 'SOCIETY_ADMIN' || role === 'FLAT_OWNER' || role === 'TENANT' ? (
        <>
          <Link
            href={
              role === 'SOCIETY_ADMIN'
                ? '/admin'
                : role === 'FLAT_OWNER'
                ? '/owner'
                : '/tenant'
            }
            className="text-gray-700 hover:text-indigo-600"
          >
            Dashboard
          </Link>
          <button onClick={handleLogout} className="text-red-600 hover:underline">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/signup" className="text-gray-700 hover:text-indigo-600">
            Signup
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
        </>
      )}
    </div>
    </nav>
  );
}
