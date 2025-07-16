'use client';

import { useEffect, useState } from 'react';
import SignupRequestList from '@/components/form/SignupRequestList';
import { SignupRequest } from '@/types';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function SignupRequestsPage() {
  const [requests, setRequests] = useState<SignupRequest[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = token ? JSON.parse(atob(token.split('.')[1]))?.role : '';
    if (role !== 'SOCIETY_ADMIN') router.push('/unauthorized');

    const fetchRequests = async () => {
      const res = await api.get('/admin/signup-requests');
      setRequests(res.data);
    };
    fetchRequests();
  }, [router]);

  const handleApprove = (id: string | number) => {
    api.post(`/admin/signup-requests/${id}/approve`).then(() => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    });
  };

  const handleReject = (id: string | number) => {
    api.post(`/admin/signup-requests/${id}/reject`).then(() => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto p-6">
            <SignupRequestList
                requests={requests}
                handleApprove={handleApprove}
                handleReject={handleReject}
            />
        </main>
    </div>
  );
}
