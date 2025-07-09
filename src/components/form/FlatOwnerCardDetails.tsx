import HomeIcon from "@heroicons/react/24/solid/esm/HomeIcon";

type Props = {
  flatNumber: string;
  type?: string;
  status: string;
  societyName: string;
  societyCode: string;
};

export default function FlatDetailsCard({
  flatNumber,
  type,
  status,
  societyName,
  societyCode,
}: Props) {
  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700 flex items-center">
        <HomeIcon className="w-5 h-5 mr-2 text-gray-500" />
        Flat Details
      </h2>

      <div className="text-gray-800 space-y-2">
        <p><strong>Flat Number:</strong> {flatNumber}</p>
        <p><strong>Type:</strong> {type || 'N/A'}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Society Name:</strong> {societyName}</p>
        <p><strong>Society Code:</strong> {societyCode}</p>
      </div>
    </div>
  );
}
