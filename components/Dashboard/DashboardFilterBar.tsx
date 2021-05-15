import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DashboardFilterBarInterface {
  companyName: string;
  startDate: Date;
  endDate: Date;
  setStartDate: any;
  setEndDate: any;
}
export default function DashboardFilterBar({
  companyName,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DashboardFilterBarInterface) {
  return (
    <div className="flex flex-col w-full px-4 py-2 mb-4 text-white bg-indigo-600 rounded-md md:items-center md:justify-between md:flex-row text-md">
      <h2 className="mx-1 mb-2 font-bold md:mb-0">{companyName}</h2>
      <div className="flex flex-row items-center">
        <DatePicker
          className="w-40 px-2 py-1 mx-1 text-center text-white bg-indigo-800 rounded"
          onChange={(date) => setStartDate(date)}
          selected={startDate}
        />
        <span className="text-indigo-300">&mdash;</span>
        <DatePicker
          className="w-40 px-2 py-1 mx-1 text-center text-white bg-indigo-800 rounded"
          onChange={(date) => setEndDate(date)}
          selected={endDate}
          calendarClassName="mr-10"
        />
      </div>
    </div>
  );
}
