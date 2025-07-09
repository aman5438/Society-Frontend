import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useForm } from 'react-hook-form';
import api from '@/lib/axios';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

type Flat = {
  id: number;
  flatNumber: string;
  type?: string;
  status: string;
};

type Props = {
  isOpen: boolean;
  flat: Flat | null;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditFlatModal({ isOpen, flat, onClose, onUpdated }: Props) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      type: '',
      status: '',
    },
  });

  useEffect(() => {
    if (flat) {
      reset({
        type: flat.type || '',
        status: flat.status || '',
      });
    }
  }, [flat, reset]);

  const onSubmit = async (data: { type: string; status: string }) => {
    try {
      await api.put(`/admin/flats/${flat?.id}`, data);
      onUpdated();
      onClose();
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const serverMsg = axiosError.response?.data?.message;
      alert(serverMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Edit Flat" onClose={onClose}>
      {flat && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="mb-2 text-sm text-gray-600 font-medium">Flat Number</p>
          <input
            value={flat.flatNumber}
            disabled
            className="border border-gray-300 p-3 w-full rounded-md mb-4 bg-gray-100 text-gray-600"
          />

          <Input register={register} name="type" placeholder="Flat Type" />
          <Select
            register={register}
            name="status"
            options={[
              { label: 'OCCUPIED', value: 'OCCUPIED' },
              { label: 'VACANT', value: 'VACANT' },
            ]}
          />

          <Button label="Save Changes" />
        </form>
      )}
    </Modal>
  );
}
