interface QuickStatInterface {
  title: string;
  subtitle?: string;
  children: any;
}
export default function QuickStat({
  title,
  subtitle,
  children,
}: QuickStatInterface) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full m-1 bg-white rounded-sm dark:bg-indigo-800 dark:text-white">
      <h2 className="font-bold text-md">{title}</h2>
      {children}
    </div>
  );
}
