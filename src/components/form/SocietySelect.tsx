'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import Select from '@/components/ui/Select';
import { UseFormRegister } from 'react-hook-form';
import { SignupFormData, SocietyResponse } from '@/types';


type Props = {
  register: UseFormRegister<SignupFormData>;
  name: keyof SignupFormData;
};

export default function SocietySelect({ name, register }: Props) {
  const [societies, setSocieties] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const res = await api.get('/societies');
        const formatted = (res.data as SocietyResponse[]).flatMap((s) =>
          s.subSocieties.map((sub) => ({
            label: `${sub.name} (${s.societyCode})`,
            value: s.id,
          }))
        );
        setSocieties(formatted);
      } catch (err) {
        console.error('Failed to load societies', err);
      }
    };
    fetchSocieties();
  }, []);

  return (
    <Select
      register={register}
      name={name}
      options={societies}
      placeholder="Select Society"
    />
  );
}
