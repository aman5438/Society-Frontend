'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import FileUpload from '../ui/FileUpload';
import { useRef, useState, useEffect } from 'react';
import SocietySelect from '@/components/form/SocietySelect';
import { FlatSelect } from './FlatSelect';
import { SignupFormData } from '@/types';
import { AxiosError } from 'axios';

export default function SignupForm() {
  const { register, handleSubmit, watch } = useForm<SignupFormData>();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [fileError, setFileError] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  // Track file input changes using event listener
  useEffect(() => {
    const input = fileRef.current;

    const handleFileChange = () => {
      const hasFile = !!fileRef.current?.files?.length;
      setFileUploaded(hasFile);
    };

    if (input) {
      input.addEventListener('change', handleFileChange);
    }

    return () => {
      if (input) {
        input.removeEventListener('change', handleFileChange);
      }
    };
  }, []);

  const society = watch('society');
  const fullname = watch('fullname');
  const email = watch('email');
  const password = watch('password');
  const phone = watch('phone');
  const flat = watch('flat');
  const role = watch('role');

  const selectedSocietyId = Number(society);

  const isFormValid =
    society && fullname && email && password && phone && flat && role && fileUploaded;

  const onSubmit = async (data: SignupFormData) => {
    if (!fileRef.current?.files?.length) {
      setFileError(true);
      return;
    }
    setFileError(false);

    const formData = new FormData();
    formData.append('societyId', String(parseInt(data.society)));
    formData.append('name', data.fullname);
    formData.append('password', data.password);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('flatNumber', String(parseInt(data.flat)));
    formData.append('role', data.role.toUpperCase());

    if (fileRef.current?.files?.[0]) {
      formData.append('document', fileRef.current.files[0]);
    }

    try {
      await api.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Signup successful! Please login.');
      router.push('/login');
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const serverMsg = axiosError.response?.data?.message;
      alert(serverMsg || 'Signup failed. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md"
      encType="multipart/form-data"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>

      <SocietySelect name="society" register={register} />
      <Input register={register} name="fullname" placeholder="Full Name" />
      <Input register={register} name="email" placeholder="Email" type="email" />
      <Input register={register} name="password" placeholder="Password" type="password" />
      <Input register={register} name="phone" placeholder="Phone" />
      <FlatSelect name="flat" register={register} societyId={selectedSocietyId} />

      <Select
        register={register}
        name="role"
        options={[
          { label: 'FLAT_OWNER', value: 'FLAT_OWNER' },
          { label: 'TENANT', value: 'TENANT' },
        ]}
      />

      <FileUpload
        name="document"
        label="Upload Document"
        accept=".pdf,.doc,.docx,.jpg,.png"
        inputRef={fileRef}
      />
      {fileError && (
        <p className="text-red-500 text-sm mt-1">Document is required</p>
      )}

      <Button label="Sign Up" disabled={!isFormValid} />
    </form>
  );
}
