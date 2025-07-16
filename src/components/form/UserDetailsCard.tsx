type Props = {
  name: string;
  email: string;
  phone: string;
};

export default function UserDetailsCard({
  name,
  email,
  phone,
}: Props) {
  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md border border-gray-200 rounded-lg p-6">
         <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">👤 Tenant Details</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
        </div>
    </div>
  );
}
