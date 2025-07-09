export default function ComingSoonCard({ title }: { title: string }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-center items-center text-center border-2 border-dashed border-gray-300 hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm">Coming Soon 🚧</p>
    </div>
  );
}
