import { useEffect, useState } from "react";
import {
  getMeetingsByTeam,
  getMeetingAverageByWeekAsData,
  getRatingAverageByWeek,
  getMeetingsCount,
  getRatingsCountAndAverage,
} from "../../supabase/meetings";
import QuickStat from "./QuickStat";
import {
  XYPlot,
  HorizontalGridlines,
  VerticalBarSeries,
  XAxis,
  YAxis,
} from "react-vis";
import "react-vis/dist/style.css";
import DashboardFilterBar from "./DashboardFilterBar";
import DatePicker from "react-datepicker";

type PlotData = {
  x: string | number;
  y: number;
};

export default function DashboardArea() {
  const [averageMeetingRatingPerWeekData, setAverageMeetingRatingPerWeekData] =
    useState(Array<PlotData>());
  const [averageRatingPerWeekData, setAverageRatingPerWeekData] = useState(
    Array<PlotData>()
  );

  let today = new Date();
  let todayUtility = new Date();
  let fourWeeksAgo = new Date(
    todayUtility.setDate(todayUtility.getDate() - 28)
  );
  const [startDate, setStartDate] = useState(fourWeeksAgo);
  const [endDate, setEndDate] = useState(today);
  const [meetingCount, setMeetingCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [ratingAverage, setRatingAverage] = useState(0);

  useEffect(() => {
    const fetchGraphData = async () => {
      setAverageMeetingRatingPerWeekData(await getMeetingAverageByWeekAsData());
      setAverageRatingPerWeekData(await getRatingAverageByWeek());
      setMeetingCount(await getMeetingsCount());
      let ratingCountAndAverage = await getRatingsCountAndAverage();
      setRatingCount(ratingCountAndAverage.count);
      setRatingAverage(ratingCountAndAverage.average);
    };
    fetchGraphData();
  }, []);

  const fetchData = async () => {
    console.log(averageMeetingRatingPerWeekData);
  };
  return (
    <div className="flex flex-col w-full px-4 py-6 dark:bg-indigo-900">
      {/* Dashboard Command Bar. Maybe move to own component when there is actual functionality? */}
      <DashboardFilterBar
        companyName="Placeholder"
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className="flex flex-col md:flex-row">
        <QuickStat title="Total Meetings">{meetingCount}</QuickStat>
        <QuickStat title="Average Rating All Time">
          {Math.floor(ratingAverage * 100) / 100}
        </QuickStat>
        <QuickStat title="Total Ratings">{ratingCount}</QuickStat>
      </div>
      {/* Graphs */}
      <div className="flex flex-col md:flex-row">
        {averageMeetingRatingPerWeekData &&
          averageMeetingRatingPerWeekData.length > 0 && (
            <>
              <div className="px-4 pt-4 mx-1 my-4 bg-white rounded dark:bg-indigo-800 dark:text-white">
                <h3 className="text-center">
                  Average <span className="font-bold">Meeting Ratings</span> by
                  Week
                </h3>
                <XYPlot
                  className="my-4 bg-transparent"
                  height={300}
                  width={300}
                  color="#6366F1"
                  xType="ordinal"
                  yDomain={[0, 10]}
                >
                  <XAxis />
                  <YAxis />
                  <VerticalBarSeries
                    data={averageMeetingRatingPerWeekData}
                    barWidth={0.8}
                  />
                </XYPlot>
              </div>
            </>
          )}
        {averageRatingPerWeekData && averageRatingPerWeekData.length > 0 && (
          <>
            <div className="px-4 pt-4 mx-1 my-4 bg-white rounded dark:bg-indigo-800 dark:text-white">
              <h3 className="text-center">
                Average <span className="font-bold">Rating</span> by Week
              </h3>
              <XYPlot
                className="my-4 bg-transparent"
                height={300}
                width={300}
                color="#6366F1"
                xType="ordinal"
                yDomain={[0, 10]}
              >
                <XAxis />
                <YAxis />
                <VerticalBarSeries
                  data={averageRatingPerWeekData}
                  barWidth={0.8}
                />
              </XYPlot>
            </div>
          </>
        )}
      </div>
      <button
        className="p-4 my-2 bg-indigo-50 dark:bg-indigo-600 dark:text-white"
        onClick={() => fetchData()}
      >
        get data
      </button>
    </div>
  );
}
