import SignInButton from "./SignInButton";

export default function LoginModal() {
  return (
    <>
      <div className="absolute z-10 items-center justify-center w-screen h-screen">
        <div className="w-full h-full bg-gray-300 opacity-40" />
      </div>
      <div className="absolute z-20 flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center justify-center w-11/12 px-8 py-8 bg-white rounded shadow-lg md:w-2/3 lg:w-1/3 dark:bg-gray-600 dark:text-white">
          <div className="w-full mx-auto">
            <h1 className="my-2 text-2xl font-bold">
              Welcome to your talkback dashboard 🥳
            </h1>
            <p className="mb-4">
              You're almost there! Sign in and we'll set things up.
            </p>
            <SignInButton />
          </div>
        </div>
      </div>
    </>
  );
}
