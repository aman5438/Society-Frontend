import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  className?: string;
};

export default function Input<T extends FieldValues>({
  register,
  name,
  type = 'text',
  placeholder,
  className = '',
}: InputProps<T>) {
  return (
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className={`border border-gray-300 p-3 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
