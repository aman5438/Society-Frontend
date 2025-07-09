import Modal from '@/components/ui/Modal';

type Flat = {
  flatNumber: string | number;
};

type Props = {
  isOpen: boolean;
  flat: Flat | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteFlatModal({ isOpen, flat, onClose, onConfirm }: Props) {
  return (
    <Modal isOpen={isOpen} title="Delete Flat?" onClose={onClose}>
      <p className="mb-4 text-gray-700">
        Are you sure you want to delete <strong>Flat {flat?.flatNumber}</strong>?
      </p>
      <div className="flex justify-end gap-3">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Confirm Delete
        </button>
      </div>
    </Modal>
  );
}
