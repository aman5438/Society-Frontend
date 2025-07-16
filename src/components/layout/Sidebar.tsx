'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

export default function Sidebar() {
  const [role, setRole] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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

  const navLinks = [
    {
      label: 'Dashboard',
      href: role === 'SOCIETY_ADMIN' ? '/admin' : '/owner',
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      label: 'Edit Profile',
      href: '/edit-profile',
      icon: <UserIcon className="w-5 h-5" />,
    },
  ];

  if (!role || role !== 'SOCIETY_ADMIN') return null;

  return (
    <>
      {/* === Mobile Top Nav === */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm sticky top-0 z-30">
        <h1 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
          <HomeIcon className="w-5 h-5 text-gray-500" />
          SocietyApp
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Sidebar">
          {isOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* === Sidebar === */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white z-40 border-r shadow-sm
          transform transition-transform duration-200 ease-in-out
          flex-col justify-between
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:flex
        `}
      >
        {/* Top: Logo + Nav */}
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
            <HomeIcon className="w-6 h-6 mr-2 text-gray-500" />
            SocietyApp
          </h2>

          <nav className="flex flex-col gap-4 text-gray-700 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:text-indigo-600"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t">
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline flex items-center gap-2"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
