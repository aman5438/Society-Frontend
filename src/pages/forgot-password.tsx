import { useForm } from 'react-hook-form';
import api from '@/lib/axios';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Navbar from '@/components/layout/Navbar';
import { AxiosError } from 'axios';

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const [message, setMessage] = useState('');

  const onSubmit = async (data: { email: string }) => {
    try {
      const res = await api.post('/auth/forgot-password', data);
      setMessage(res.data.message || 'Password reset link sent to your email.');
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const serverMsg = axiosError.response?.data?.message;
      setMessage(serverMsg || 'Something went wrong');
    }
  };

  return (
    <>
    <Navbar />
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Forgot Password</h2>
            <Input
            register={register}
            name="email"
            type="email"
            placeholder="Enter your email"
            className="mb-4"
            />
            <Button
            label="Send Reset Link"
            />
            {message && <p className="text-center text-sm text-green-600 mt-4">{message}</p>}
        </form>
        </div>
    </>
  );
}
