'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import SocietyCard from '@/components/admin/SocietyCard';
import api from '@/lib/axios';

interface SubSociety {
  id: number;
  name: string;
}

interface Society {
  id: number;
  name: string;
  societyCode: string;
  subSocieties: SubSociety[];
}

export default function AdminSocieties() {
  const [societies, setSocieties] = useState<Society[]>([]);

  useEffect(() => {
    const fetchSocieties = async () => {
      const res = await api.get('/admin/societies');
      setSocieties(res.data);
    };
    fetchSocieties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Registered Societies</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {societies.map((society) => (
            <SocietyCard
              key={society.id}
              name={society.name}
              societyCode={society.societyCode}
              subSocieties={society.subSocieties}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
