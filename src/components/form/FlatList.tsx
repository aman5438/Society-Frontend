import { useEffect, useState } from 'react';
import FlatCard from './FlatCard';
import EditFlatModal from '../flat/EditFlatModal';
import DeleteFlatModal from '../flat/DeleteFlatModal';
import api from '@/lib/axios';

type Flat = {
  id: number;
  flatNumber: string;
  type?: string;
  status: string;
  owner?: { name: string };
  tenant?: { name: string };
};

export default function FlatList() {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);
  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);

  const fetchFlats = async () => {
    const res = await api.get('/admin/flats');
    setFlats(res.data);
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  const openEditModal = (flat: Flat) => {
    setSelectedFlat(flat);
    setModalType('edit');
  };

  const openDeleteModal = (flat: Flat) => {
    setSelectedFlat(flat);
    setModalType('delete');
  };

  const closeModal = () => {
    setSelectedFlat(null);
    setModalType(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/flats/${selectedFlat?.id}`);
      await fetchFlats();
      closeModal();
    } catch {
      alert('Failed to delete flat');
    }
  };

  return (
    <>
    {flats.length === 0 ? (
      <div className="bg-white p-6 rounded-lg shadow-md text-center col-span-full">
        <h2 className="text-lg font-semibold text-gray-700">No Flats Found</h2>
        <p className="text-gray-500 mt-2">You haven&apos;t added any flats yet.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {flats.map((flat) => (
          <FlatCard
            key={flat.id}
            flatNumber={flat.flatNumber}
            type={flat.type}
            status={flat.status}
            ownerName={flat.owner?.name}
            tenantName={flat.tenant?.name}
            onEdit={() => openEditModal(flat)}
            onDelete={() => openDeleteModal(flat)}
          />
        ))}
      </div>
    )}

      <EditFlatModal
        isOpen={modalType === 'edit'}
        flat={selectedFlat}
        onClose={closeModal}
        onUpdated={fetchFlats}
      />

      <DeleteFlatModal
        isOpen={modalType === 'delete'}
        flat={selectedFlat}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </>
  );
}
