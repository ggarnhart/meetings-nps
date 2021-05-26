import Image from "next/image";
import BackButton from "../components/Dashboard/BackButton";

export default function User() {
  return (
    <div>
      <BackButton />
      <div className="flex items-center justify-center w-screen min-h-screen bg-gray-200 ">
        <div className="w-2/12" />
        <div className="flex flex-col w-4/12 p-12 text-right">
          Hi there! My name is greg, I make{" "}
          <span className="font-bold">talkback.</span> The user page has not
          been implemented yet. I'd love to hear what you'd like from it.
          <p>
            <a
              className="underline cursor-pointer "
              href="mailto:greg.garnhart12@gmail.com"
            >
              Shoot me an email!
            </a>{" "}
            I'd love to chat.
          </p>
        </div>
        <div className="w-6/12 p-12">
          <Image src="/images/CoffeeGreg.svg" width="300px" height="451px" />
        </div>
      </div>
    </div>
  );
}
