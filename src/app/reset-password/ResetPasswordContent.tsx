"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { AxiosError } from 'axios';

type ResetForm = {
  newPassword: string;
};

export default function ResetPasswordContent() {
  const { register, handleSubmit } = useForm<ResetForm>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const queryToken = searchParams ? searchParams.get('token') : null;

    if (queryToken) {
      setToken(queryToken);
      localStorage.setItem('reset_token', queryToken);
      router.replace('/reset-password');
    } else {
      const storedToken = localStorage.getItem('reset_token');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [router, searchParams]);

  const onSubmit = async (data: ResetForm) => {
    try {
      const res = await api.post('/auth/reset-password', {
        token,
        newPassword: data.newPassword,
      });
      setMessage(res.data.message || 'Password reset successful');
      setTimeout(() => router.push('/'), 3000);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-800">Reset Your Password</h2>

        <Input
          register={register}
          name="newPassword"
          type="password"
          placeholder="New Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <Button label="Reset Password" />
        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}
