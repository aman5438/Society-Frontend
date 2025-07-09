export default function Button({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
    >
      {label}
    </button>
  );
}
