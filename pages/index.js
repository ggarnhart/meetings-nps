import Nav from "../components/Nav";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden text-white bg-indigo-800 landing-hero-image">
      <Nav />
      <div className="flex flex-col justify-center h-full mx-auto w-screen-80">
        <div className="w-full lg:w-1/2">
          <h1 className="my-4 text-4xl font-bold">
            We spend a lot of time in meetings. Let's make the most of it.
          </h1>
          <p className="my-4 text-lg">
            <span className="font-bold">Talkback</span> gives your team tools to
            review meetings in under 30 seconds.
          </p>
          <Link href="/pricing">
            <span className="px-4 py-2 my-4 text-lg transition-all duration-200 ease-in-out bg-indigo-700 rounded cursor-pointer hover:shadow-xl">
              See Features
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
