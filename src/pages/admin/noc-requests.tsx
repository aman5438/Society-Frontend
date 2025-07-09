// pages/admin/noc-requests.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import NocRequestCard from '@/components/admin/NocRequestCard';

export default function NOCRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">NOC Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NocRequestCard title="Request 1" />
          <NocRequestCard title="Request 2" />
          <NocRequestCard title="Request 3" />
          {/* Add more NOC request cards as needed */}
        </div>
      </main>
    </div>
  );
}
