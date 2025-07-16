'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import FlatDetailsCard from '@/components/form/FlatOwnerCardDetails';
import { Flat } from '@/types';

export default function OwnerDashboard() {
  const [loading, setLoading] = useState(true);
  const [canViewDetails, setCanViewDetails] = useState(false);
  const [flat, setFlat] = useState<Flat | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await api.get('/owner/flat-status');
        const { isApproved, isOccupied, flat } = res.data;
        setCanViewDetails(isApproved && isOccupied);
        setFlat(flat);
      } catch (err) {
        console.error('Error fetching status:', err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  if (!canViewDetails) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-yellow-50">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-md border border-yellow-300 text-yellow-800">
            <h2 className="text-xl font-semibold mb-2">🚧 Request Pending</h2>
            <p className="text-sm">
              Your signup request is still under review. You will be granted access once it&rsquo;s <strong>approved</strong> and your flat is marked as <strong>Occupied</strong>.
            </p>
          </div>
        </div>
      </>
    );
  }

  // Inside component return
  if (!flat) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <FlatDetailsCard
          flatNumber={flat.flatNumber}
          type={flat.type}
          status={flat.status}
          societyName={flat.society.name}
          societyCode={flat.society.societyCode}
        />
      </div>
    </div>
  );
}
