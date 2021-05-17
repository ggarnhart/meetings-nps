import Spinner from "../Spinner";

interface QuickStatInterface {
  title: string;
  subtitle?: string;
  children: any;
  loading?: boolean;
}
export default function QuickStat({
  title,
  subtitle,
  children,
  loading,
}: QuickStatInterface) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full m-1 bg-white rounded-sm dark:bg-gray-800 dark:text-white">
      <h2 className="font-bold text-md">{title}</h2>
      {loading && (
        <div className="w-8 h-8 text-indigo-800">
          <Spinner />
        </div>
      )}
      {!loading && children}
    </div>
  );
}
