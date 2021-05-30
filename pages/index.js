import Nav from "../components/Nav";
import Link from "next/link";
import Image from "next/image";
import InstallButton from "../components/InstallButton";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden text-white bg-indigo-800 landing-hero-image">
      <Nav />
      <div className="flex flex-col items-center justify-center h-full mx-auto md:flex-row xl:flex-row w-screen-80">
        <div className="flex flex-col w-full xl:w-1/3">
          <h1 className="my-4 text-4xl font-bold">
            We spend a lot of time in meetings. Let's make the most of it.
          </h1>
          <p className="mt-4 mb-6 text-lg">
            <span className="font-bold">Talkback</span> gives your team tools to
            review meetings in under 30 seconds.
          </p>

          <div className="flex items-center">
            <Link href="/features">
              <span className="px-4 py-2 my-6 mr-2 text-lg transition-all duration-200 ease-in-out bg-indigo-700 rounded-lg cursor-pointer hover:shadow-xl">
                See Features
              </span>
            </Link>
            <InstallButton />
          </div>
        </div>
        <div className="flex-col hidden w-full overflow-x-hidden xl:flex pl-36 lg:w-2/3">
          <Image
            className="-mr-48"
            src="/images/ChatPreviews.png"
            width="838"
            height="397"
          />
        </div>
      </div>
    </div>
  );
}
