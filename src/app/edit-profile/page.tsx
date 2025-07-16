'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { AxiosError } from 'axios';
import Sidebar from '@/components/layout/Sidebar';

type ProfileForm = {
  name: string;
  email: string;
  phone: string;
};

export default function EditProfile() {
  const { register, handleSubmit, reset } = useForm<ProfileForm>();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    api
      .get('/admin/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        reset(res.data); // Populate form with existing values
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [reset, router]);

    const onSubmit = async (data: ProfileForm) => {
        try {
            const token = localStorage.getItem('token');
            const res = await api.put('/admin/me', data, {
            headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Profile updated successfully');
            setError('');
            setTimeout(() => {
            router.push('/admin'); // Or '/admin/me'
            }, 1000);
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            setError(axiosError.response?.data?.message || 'Update failed');
            setMessage('');
        }
    };


  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      < Sidebar />
      <h1 className="text-xl font-bold mb-4 text-center">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          name="name"
          register={register}
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
        />
        <Input
          name="email"
          register={register}
          placeholder="Email"
          type="email"
          className="w-full border px-3 py-2 rounded"
        />
        <Input
          name="phone"
          register={register}
          placeholder="Phone"
          className="w-full border px-3 py-2 rounded"
        />
        <Button label="Update Profile" />
        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}
