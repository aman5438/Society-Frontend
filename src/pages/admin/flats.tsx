'use client';

import { useEffect, useState } from 'react';
import FlatList from '@/components/form/FlatList';
import api from '@/lib/axios';
import Navbar from '@/components/layout/Navbar';

export default function AdminFlatsPage() {
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    const fetchFlats = async () => {
      const res = await api.get('/admin/flats');
      setFlats(res.data);
    };
    
    fetchFlats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">All Flats</h1>
        <FlatList flats={flats} />
      </main>
    </div>
  );
}
