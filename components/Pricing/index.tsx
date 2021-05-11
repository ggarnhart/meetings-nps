import Feature from "./Feature";

export default function PricingHero() {
  return (
    <div className="flex flex-col items-center justify-center w-full my-4 lg:h-screen-80 lg:flex-row">
      <div className="flex flex-col items-center w-full px-8 py-10 bg-indigo-600 rounded-l lg:w-3/12 lg:h-5/6">
        <h1 className="text-2xl text-center">Free</h1>
        <Feature>Meeting Ratings</Feature>
        <Feature>Dashboard</Feature>
        <Feature>Weekly Report</Feature>
        <Feature>5 Unique Users</Feature>
        <Feature>20 Meetings per Week</Feature>
        <div className="flex flex-row flex-grow w-full">
          <div className="self-end w-5/6 py-3 mx-auto text-xl text-center bg-indigo-400 rounded cursor-pointer">
            Get Started
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-full px-8 py-10 bg-indigo-500 rounded lg:w-4/12 lg:h-full">
        <h1 className="text-3xl font-bold text-center">Startup</h1>
        <p className="italic text-center">Most Popular!</p>

        <Feature>Unlimited Weekly Meetings</Feature>
        <Feature>Meeting Ratings</Feature>
        <Feature>Slack Extension</Feature>
        <Feature>Dashboard</Feature>
        <Feature>Weekly Report</Feature>
        <Feature>100 Unique Users</Feature>
        <Feature>30 Day Free Trial</Feature>
        <Feature>Detailed Follow Up Questions</Feature>
        <Feature>Open-Ended Feedback Fields</Feature>
        <Feature>
          <span>
            Calendar Integration &mdash;{" "}
            <span className="italic">Coming Soon</span>
          </span>
        </Feature>
        <div className="flex flex-row flex-grow w-full">
          <div className="self-end w-5/6 py-3 mx-auto text-xl font-bold text-center bg-indigo-300 rounded shadow-lg cursor-pointer">
            Start Free Trial
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full px-8 py-10 bg-indigo-600 rounded-r lg:w-3/12 lg:h-5/6">
        <h1 className="text-2xl text-center">Professional</h1>

        <Feature>Unlimited Weekly Meetings</Feature>
        <Feature>Meeting Ratings</Feature>
        <Feature>Slack Extension</Feature>
        <Feature>Dashboard</Feature>
        <Feature>Weekly Report</Feature>
        <Feature>No User Limit</Feature>
        <Feature>30 Day Free Trial</Feature>
        <Feature>Detailed Follow Up Questions</Feature>
        <Feature>Open-Ended Feedback Fields</Feature>
        <div className="flex flex-row flex-grow w-full">
          <div className="self-end w-5/6 py-3 mx-auto text-xl text-center bg-indigo-400 rounded cursor-not-allowed">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}
