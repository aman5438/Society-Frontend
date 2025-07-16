'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import Navbar from '@/components/layout/Navbar';
import FlatDetailsCard from '@/components/form/FlatOwnerCardDetails';
import UserDetailsCard from '@/components/form/UserDetailsCard';
import { Flat, TenantUser } from '@/types';

export default function TenantDashboard() {
  const [loading, setLoading] = useState(true);
  const [canViewDetails, setCanViewDetails] = useState(false);
  const [flat, setFlat] = useState<Flat | null>(null);
  const [tenantUser, setTenantUser] = useState<TenantUser | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await api.get('/tenant/tenant-all');
        const { isApproved, isOccupied, flat, tenant_user } = res.data;

        setCanViewDetails(isApproved && isOccupied);
        setFlat(flat); 
        setTenantUser(tenant_user);
      } catch (err) {
        console.error('Error fetching tenant data:', err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </>
    );
  }

  if (!canViewDetails || !flat) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-yellow-50">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-md border border-yellow-300 text-yellow-800">
            <h2 className="text-xl font-semibold mb-2">🚧 Request Pending</h2>
            <p className="text-sm">
              Your signup request is still under review. You will be granted access once it&apos;s <strong>approved</strong> and your flat is marked as <strong>Occupied</strong>.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-8 text-gray-800">Tenant Dashboard</h1>

        <section className="mb-6">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Flat Details</h2>
            <FlatDetailsCard
              flatNumber={flat.flatNumber}
              type={flat.type}
              status={flat.status}
              societyName={flat.society.name}
              societyCode={flat.society.societyCode}
            />
          </div>
        </section>

        <section>
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Tenant Details</h2>
            {tenantUser && (
              <UserDetailsCard
                name={tenantUser.name}
                email={tenantUser.email}
                phone={tenantUser.phone}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
