interface ButtonProps {
  label: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function Button({
  label,
  disabled = false,
  type = 'submit',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 rounded-md font-semibold transition 
        ${disabled
          ? 'bg-indigo-300 text-white cursor-not-allowed'
          : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
    >
      {label}
    </button>
  );
}
