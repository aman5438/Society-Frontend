import SignupRequestCard from './SignupRequestCard';
import { SignupRequest } from '@/types';


interface SignupRequestListProps {
  requests: SignupRequest[];
  handleApprove: (id: string | number) => void;
  handleReject: (id: string | number) => void;
}

export default function SignupRequestList({ requests, handleApprove, handleReject }: SignupRequestListProps) {
  if (requests.length === 0) {
    return (
      <div className="border p-6 text-center rounded shadow bg-gray-50 text-gray-700">
        <h2 className="text-xl font-semibold">No Signup Requests</h2>
        <p className="text-sm mt-1">There are currently no pending signup requests.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((req) => (
        <SignupRequestCard
          key={req.id}
          name={req.user.name}
          email={req.user.email}
          flatNumber={req.flatNumber}
          role={req.role}
          documents={req.documents.map((file: { url?: string; name: string } | File) => ({
            url: ('url' in file && file.url) ? file.url : (file instanceof File ? URL.createObjectURL(file) : ''),
            originalName: ('name' in file && file.name) ? file.name : (file instanceof File ? file.name : ''),
          }))}
          onApprove={() => handleApprove(req.id)}
          onReject={() => handleReject(req.id)}
        />
      ))}
    </div>
  );
}
