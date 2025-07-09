type FlatProps = {
  flatNumber: string;
  type?: string;
  status: string;
  ownerName?: string;
  tenantName?: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function FlatCard({ flatNumber, type, status, ownerName, tenantName, onEdit, onDelete }: FlatProps) {
  const isOccupied = status.toLowerCase() === 'occupied';
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-indigo-700 mb-2">Flat: {flatNumber}</h2>
      <p className="text-gray-600">Type: {type || 'N/A'}</p>
      <p className="text-gray-600">Status: {status}</p>
      <p className="text-gray-600">Owner: {ownerName || 'N/A'}</p>
      <p className="text-gray-600">Tenant: {tenantName || 'N/A'}</p>

      { isOccupied && (
        <div className="mt-4">
          <button onClick={onEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
          <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </div>
      )}
    </div>
  );
}
