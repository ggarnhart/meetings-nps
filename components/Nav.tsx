import Link from "next/link";
import Head from "next/head";
interface NavProps {
  pageTitle?: string;
}
export default function Nav({ pageTitle }: NavProps) {
  return (
    <div className="absolute top-0 flex justify-between w-screen p-8 overflow-x-auto bg-white dark:bg-gray-800">
      <Head>
        <title>{pageTitle ? pageTitle : "Meetings NPS"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-xl font-bold">Meetings NPS</h2>
      <div className="flex justify-around">
        <div className="mx-2">
          <Link href="/">Home</Link>
        </div>
        <div className="mx-2">
          <Link href="/meetings">Meetings</Link>
        </div>
        <div className="mx-2">
          <Link href="/account">Account</Link>
        </div>
        <div className="mx-2">
          <Link href="/install">Install</Link>
        </div>
      </div>
    </div>
  );
}
