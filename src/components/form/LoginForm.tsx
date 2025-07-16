'use client';

import { useForm } from 'react-hook-form';
import { useRouter }  from 'next/navigation';
import Button from '../ui/Button';
import api from '@/lib/axios';
import Input from '../ui/Input';
import { LoginFormData } from '@/types';
import { AxiosError } from 'axios';

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post('/auth/login', data);
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      const { role } = JSON.parse(atob(token.split('.')[1]));
      switch (role) {
        case 'SOCIETY_ADMIN':
          router.push('/admin');
          break;
        case 'FLAT_OWNER':
          router.push('/owner');
          break;
        case 'TENANT':
          router.push('/tenant');
          break;
        default:
          alert('Unknown role');
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const serverMsg = axiosError.response?.data?.message;
      alert(serverMsg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
        <Input register={register} name="email" type="email"  placeholder="Email" className="mb-4" />
        <Input register={register} name="password" type="password" placeholder="Password" className="mb-6" />
        <div className="flex justify-end">
          <p
            className="text-sm text-blue-600 hover:underline cursor-pointer pb-2"
            onClick={() => router.push('/forgot-password')}
          >
            Forgot Password?
          </p>
        </div>
        <Button label="Login"/>
      </form>
    </div>
  );
}
