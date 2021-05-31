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
import MeetingTable from "./MeetingTable/MeetingTable";
import { supabase, supabaseTables } from "../../supabase";
import { useWindowWidth } from "@react-hook/window-size";
import { useAuth, useMetadata } from "../../AppContext";

type PlotData = {
  x: string | number;
  y: number;
};

export default function DashboardArea() {
  const { teamMember } = useAuth();

  const [averageMeetingRatingPerWeekData, setAverageMeetingRatingPerWeekData] =
    useState(Array<PlotData>());
  const [averageRatingPerWeekData, setAverageRatingPerWeekData] = useState(
    Array<PlotData>()
  );
  const windowWidth = useWindowWidth();
  const [graphSideLength, setGraphSideLength] = useState(0);

  let today = new Date();
  let todayUtility = new Date();
  let fourWeeksAgo = new Date(
    todayUtility.setDate(todayUtility.getDate() - 28)
  );
  const [startDate, setStartDate] = useState(fourWeeksAgo);
  const [endDate, setEndDate] = useState(today);
  const [meetingCount, setMeetingCount] = useState(-1);
  const [ratingCount, setRatingCount] = useState(-1);
  const [ratingAverage, setRatingAverage] = useState(-1);
  const [meetingTableData, setMeetingTableData] = useState(Array<any>());

  useEffect(() => {
    if (windowWidth <= 768) {
      setGraphSideLength(windowWidth / 1.2);
    } else {
      setGraphSideLength(windowWidth / 2.5);
    }
  }, [windowWidth]);

  const meetingSubscription = supabase
    .from(supabaseTables.meetings)
    .on("*", (payload) => meetingTableUpdate())
    .subscribe();

  const ratingSubscription = supabase
    .from(supabaseTables.ratings)
    .on("*", (payload) => ratingTableUpdates())
    .subscribe();

  const meetingTableUpdate = async () => {
    setAverageMeetingRatingPerWeekData(
      await getMeetingAverageByWeekAsData(
        "1e90b9ec-d437-4763-8939-b2933bebf32e"
      )
    );
    setMeetingCount(
      await getMeetingsCount("1e90b9ec-d437-4763-8939-b2933bebf32e")
    );
    setMeetingTableData(
      await getMeetingsByTeam("1e90b9ec-d437-4763-8939-b2933bebf32e")
    );
  };

  const ratingTableUpdates = async () => {
    setAverageRatingPerWeekData(
      await getRatingAverageByWeek("1e90b9ec-d437-4763-8939-b2933bebf32e")
    );
    let ratingCountAndAverage = await getRatingsCountAndAverage(
      "1e90b9ec-d437-4763-8939-b2933bebf32e"
    );
    setRatingCount(ratingCountAndAverage.count);
    setRatingAverage(ratingCountAndAverage.average);
    setMeetingTableData(
      await getMeetingsByTeam("1e90b9ec-d437-4763-8939-b2933bebf32e")
    );
  };

  useEffect(() => {
    const fetchGraphData = async () => {
      setAverageMeetingRatingPerWeekData(
        await getMeetingAverageByWeekAsData(
          "1e90b9ec-d437-4763-8939-b2933bebf32e"
        )
      );
      setAverageRatingPerWeekData(
        await getRatingAverageByWeek("1e90b9ec-d437-4763-8939-b2933bebf32e")
      );
      setMeetingCount(
        await getMeetingsCount("1e90b9ec-d437-4763-8939-b2933bebf32e")
      );
      let ratingCountAndAverage = await getRatingsCountAndAverage(
        "1e90b9ec-d437-4763-8939-b2933bebf32e"
      );
      setRatingCount(ratingCountAndAverage.count);
      setRatingAverage(ratingCountAndAverage.average);
      setMeetingTableData(
        await getMeetingsByTeam("1e90b9ec-d437-4763-8939-b2933bebf32e")
      );
    };
    fetchGraphData();
  }, []);

  return (
    <div className="flex flex-col w-full px-4 py-6">
      <DashboardFilterBar
        companyName="Placeholder"
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className="flex flex-col md:flex-row">
        <QuickStat title="Total Meetings" loading={meetingCount === -1}>
          {meetingCount}
        </QuickStat>
        <QuickStat
          title="Average Rating All Time"
          loading={ratingAverage === -1}
        >
          {Math.floor(ratingAverage * 100) / 100}
        </QuickStat>
        <QuickStat title="Total Ratings" loading={ratingCount === -1}>
          {ratingCount}
        </QuickStat>
      </div>
      {/* Graphs */}
      <div className="flex flex-col mx-auto md:flex-row">
        {averageMeetingRatingPerWeekData &&
          averageMeetingRatingPerWeekData.length > 0 && (
            <>
              <div className="px-4 pt-4 mx-1 my-4 bg-white rounded dark:bg-gray-800 dark:text-white">
                <h3 className="text-center">
                  Average <span className="font-bold">Meeting Ratings</span> by
                  Week
                </h3>
                <XYPlot
                  className="my-4 bg-transparent"
                  height={graphSideLength / 2}
                  width={graphSideLength}
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
            <div className="px-4 pt-4 mx-1 my-4 bg-white rounded dark:bg-gray-800 dark:text-white">
              <h3 className="text-center">
                Average <span className="font-bold">Rating</span> by Week
              </h3>
              <XYPlot
                className="my-4 bg-transparent"
                height={graphSideLength / 2}
                width={graphSideLength}
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
      {meetingTableData.length > 0 && <MeetingTable data={meetingTableData} />}
    </div>
  );
}
