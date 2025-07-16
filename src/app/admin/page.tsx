'use client';

import { useEffect, useState } from 'react';
import DashboardCard from '@/components/admin/DashboardCard';
import api from '@/lib/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    signupRequests: 0,
    flats: 0,
    societies: 0,
    nocRequests: 0,
    maintenanceRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get('/admin/dashboard-stats');
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        title="Signup Requests"
        count={stats.signupRequests}
        linkText="Review Requests"
        linkUrl="/admin/signup-requests"
      />
      <DashboardCard
        title="Total Flats"
        count={stats.flats}
        linkText="View Flats"
        linkUrl="/admin/flats"
      />
      <DashboardCard
        title="Registered Societies"
        count={stats.societies}
        linkText="View Societies"
        linkUrl="/admin/societies"
      />
      <DashboardCard
        title="NOC Requests"
        count={stats.nocRequests}
        linkText="Review NOC"
        linkUrl="/admin/noc-requests"
      />
      <DashboardCard
        title="Maintenance Requests"
        count={stats.maintenanceRequests}
        linkText="Review Maintenance"
        linkUrl="/admin/maintenance-requests"
      />
    </div>
  );
}
