import { useEffect, useState } from "react";
import {
  getMeetingsByTeam,
  getMeetingAverageByWeekAsData,
  getRatingAverageByWeek,
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
  useEffect(() => {
    // const dbInfo = async () => {
    //   console.log(
    //     await getMeetingsByTeam("1e90b9ec-d437-4763-8939-b2933bebf32e")
    //   );
    // };
    // dbInfo();

    const fetchGraphData = async () => {
      setAverageMeetingRatingPerWeekData(await getMeetingAverageByWeekAsData());
      setAverageRatingPerWeekData(await getRatingAverageByWeek());
    };
    fetchGraphData();
  }, []);

  const fetchData = async () => {
    console.log(averageMeetingRatingPerWeekData);
  };
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
      {/* Graphs */}
      <div className="flex flex-col md:flex-row">
        {averageMeetingRatingPerWeekData &&
          averageMeetingRatingPerWeekData.length > 0 && (
            <>
              <div className="px-4 pt-4 mx-1 my-4 bg-white rounded dark:bg-indigo-900 dark:text-white">
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
            <div className="px-4 pt-4 mx-1 my-4 bg-white rounded dark:bg-indigo-900 dark:text-white">
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
      <button className="p-4 my-2 bg-indigo-50" onClick={() => fetchData()}>
        get data
      </button>
    </div>
  );
}
