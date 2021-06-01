import { supabase, SupabaseMeeting } from "../supabase";
import { v4 as uuidv4 } from "uuid";
import { getMeetingAverageByWeekAsData } from "../supabase/meetings";
export default function Playground() {
  const upsertionTime = async () => {
    const { data, error } = await supabase.from("playground").upsert(
      {
        gid: uuidv4(),
        comment: `Hi there! ${new Date().getTime()}`,
        upsert_test: 4,
      },
      { onConflict: "upsert_test" }
    );

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  const dataByWeek = async () => {
    console.log("testing testing");
    console.log(
      await getMeetingAverageByWeekAsData(
        "asdfljk-basfj-230i4-96e2-asdfkjasd;fljasgioasdjf" // this is purposefully not accurate
      )
    );
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <div
        className="px-4 py-2 text-white bg-indigo-600 rounded cursor-pointer"
        onClick={async () => await upsertionTime()}
      >
        Upsert me :)
      </div>

      <div
        className="px-4 py-2 text-white bg-indigo-600 rounded cursor-pointer"
        onClick={async () => await dataByWeek()}
      >
        DATA BY WEEK
      </div>
    </div>
  );
}
