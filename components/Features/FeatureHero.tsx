import InstallButton from "../InstallButton";
import Feature from "../Pricing/Feature";
export default function FeatureHero() {
  return (
    <div className="flex flex-col items-center justify-center w-11/12 mx-auto my-24 md:w-4/5 lg:flex-row lg:h-screen-50 lg:my-0">
      <div className="flex flex-col w-full p-8 my-2 bg-indigo-700 rounded-l lg:my-0 lg:w-6/12 lg:h-5/6">
        <h6 className="mb-2 text-xs tracking-widest">ALPHA RELEASE</h6>
        <h2 className="text-2xl font-bold">features.</h2>
        <div className="flex flex-col my-4">
          <Feature>Anonymous Meeting Ratings</Feature>
          <Feature>Ratings Dashboard</Feature>
          <Feature>
            Comments Box &mdash; <span className="italic">Coming Soon</span>
          </Feature>
          <Feature>Free</Feature>
        </div>
        <InstallButton />
      </div>
      <div className="flex flex-col w-full h-full p-10 bg-indigo-900 rounded lg:w-9/12">
        <h6 className="mb-2 text-xs tracking-widest">THE MINDSET</h6>
        <h2 className="text-2xl font-bold">
          Don't eliminate meetings. Improve them.
        </h2>
        <p className="w-8/12 mt-8 mb-4">
          We spend a lot of time in meetings.{" "}
          <span className="font-bold">talkback</span> is here to help you make
          the most of it.
        </p>
        <p className="w-10/12">
          Teams use talkback to{" "}
          <span className="font-bold">improve their meetings</span> &mdash; not
          eliminate them. By asking key questions on meeting length,
          participation, and impact, talkback is able to help you celebrate the
          wins and talk about the losses. We're here to help you{" "}
          <span className="font-bold">start a conversation</span>. No more, no
          less.
        </p>
        <div className="flex flex-grow">
          <div className="flex flex-col self-end mt-4 lg:items-center lg:mx-auto">
            <p className="my-2">Make the most of your time.</p>
            <InstallButton />
          </div>
        </div>
      </div>
    </div>
  );
}
