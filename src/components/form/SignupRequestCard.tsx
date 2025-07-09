import { HomeIcon, EnvelopeIcon, UserIcon} from '@heroicons/react/24/solid';

type Props = {
  name: string;
  email: string;
  flatNumber: string;
  role: string;
  documents: File[];
  onApprove: () => void;
  onReject: () => void;
};

export default function SignupRequestCard({
  name,
  email,
  flatNumber,
  role,
  documents,
  onApprove,
  onReject,
}: Props) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-3 border border-gray-200 max-w-sm w-full mx-auto">
      <div className="text-lg font-semibold text-gray-800">{name}</div>

      <p className="text-sm text-gray-600 flex items-center">
        <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-500" />
        {email}
      </p>

      <p className="text-sm text-gray-600 flex items-center">
        <HomeIcon className="w-4 h-4 mr-2 text-gray-500" />
        Flat: {flatNumber}
      </p>

      <p className="text-sm text-gray-600 flex items-center">
        <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
        Role: {role}
      </p>

      {documents?.length > 0 && (
        <div className="text-sm text-gray-500">
          📎 {documents.length} document{documents.length > 1 ? 's' : ''}
        </div>
      )}

      <div className="flex gap-4 mt-4">
        <button
          onClick={onApprove}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={onReject}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
