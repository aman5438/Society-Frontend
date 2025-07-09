import React from 'react';

interface SubSociety {
  id: number;
  name: string;
}

interface SocietyCardProps {
  name: string;
  societyCode: string;
  subSocieties: SubSociety[];
}

export default function SocietyCard({ name, societyCode, subSocieties }: SocietyCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all">
      <h2 className="text-lg font-semibold text-indigo-700">{name}</h2>
      <p className="text-sm text-gray-500 mb-2">Code: {societyCode}</p>

      <div>
        <h3 className="font-medium text-gray-800">Sub Societies:</h3>
        {subSocieties.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 mt-1">
            {subSocieties.map((sub) => (
              <li key={sub.id}>{sub.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No sub societies</p>
        )}
      </div>
    </div>
  );
}
