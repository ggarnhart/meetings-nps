import Feature from "./Feature";
import Image from "next/image";

export default function FeatureList() {
  return (
    <div className="flex">
      <div className="flex flex-col w-full h-full lg:w-1/2 lg:h-screen-80">
        <Feature title="Easy Check-Ins" className="my-8">
          Improving your meetings shouldn’t take week-long seminars. Our
          automated data collection takes under 30 seconds.
        </Feature>
        <Feature title="Meaningful Feedback" className="my-8">
          Knowing how to improve shouldn't take an executive team. We'll send
          you a report every week with how your team thinks they are doing,
          right to your inbox.
        </Feature>
        <Feature title="Make History Together" className="my-8">
          Take a peek at your team's dashboard to see a historical overview of
          all of your logged meetings.
        </Feature>
      </div>
      <div className="flex flex-col w-full h-full lg:w-1/2 grid-background-image">
        <Image src="/images/FeatureSet.svg" height={378} width={420} />
      </div>
    </div>
  );
}
