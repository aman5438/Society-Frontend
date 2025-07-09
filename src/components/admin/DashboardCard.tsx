type Props = {
  title: string;
  count: number;
  linkText: string;
  linkUrl: string;
};

export default function DashboardCard({ title, count, linkText, linkUrl }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold my-4">{count}</p>
      <a href={linkUrl} className="text-indigo-600 font-medium hover:underline">
        {linkText}
      </a>
    </div>
  );
}
