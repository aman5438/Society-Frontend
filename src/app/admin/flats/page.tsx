'use client';

import FlatList from '@/components/form/FlatList';

export default function AdminFlatsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">All Flats</h1>
        <FlatList />
      </main>
    </div>
  );
}
