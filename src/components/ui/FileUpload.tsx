// components/ui/FileUpload.tsx
import React from 'react';

type FileUploadProps = {
  label?: string;
  accept?: string;
  name: string;
 inputRef: React.RefObject<HTMLInputElement | null>;
};

export default function FileUpload({ label = 'Upload File', accept = '*/*', name, inputRef }: FileUploadProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        ref={inputRef}
        accept={accept}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
}
