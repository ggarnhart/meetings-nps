import QuickStat from "./QuickStat";

export default function DashboardArea() {
  return (
    <div className="flex flex-col w-full px-4 py-6">
      {/* Dashboard Command Bar. Maybe move to own component when there is actual functionality? */}
      <div className="flex w-full px-4 py-2 mb-4 text-white bg-indigo-600 rounded-md text-md">
        <h2 className="">Your Company Name</h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <QuickStat />
        <QuickStat />
        <QuickStat />
      </div>
    </div>
  );
}
