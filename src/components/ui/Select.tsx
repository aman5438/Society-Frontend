import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  options: Option[];
  placeholder?: string;
}

export default function Select<T extends FieldValues>({ register, name, options, placeholder = 'Select Option' }: SelectProps<T>) {
  return (
    <div className="mb-6">
      <select
        {...register(name)}
        className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled selected className="text-gray-400">
          {placeholder}
        </option>
        {options.map((opt: Option) => (
          <option key={opt.value} value={opt.value} className="text-gray-700">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

