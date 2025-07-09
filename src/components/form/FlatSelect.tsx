'use client';
import { useEffect, useState } from 'react';
import Select from '@/components/ui/Select';
import api from '@/lib/axios';
import { UseFormRegister } from 'react-hook-form';
import { SignupFormData, FlatResponse } from '@/types';

type Props = {
  register: UseFormRegister<SignupFormData>;
  name: keyof SignupFormData;
  societyId: number;
};

export function FlatSelect({ name, register, societyId }: Props) {
  const [flats, setFlats] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    if (!societyId) return;

    const fetchFlats = async () => {
      try {
        const res = await api.get(`/flats?societyId=${societyId}`);
        const formatted = (res.data as FlatResponse[]).map((f) => ({
          label: `Flat ${f.flatNumber}`,
          value: f.id,
        }));
        setFlats(formatted);
      } catch (err) {
        console.error('Failed to load flats', err);
      }
    };

    fetchFlats();
  }, [societyId]);

  return (
    <Select
      register={register}
      name={name}
      options={flats}
      placeholder="Select Flat"
    />
  );
}
