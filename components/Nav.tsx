import Link from "next/link";
import Head from "next/head";
interface NavProps {
  pageTitle?: string;
}
export default function Nav({ pageTitle }: NavProps) {
  return (
    <div className="absolute top-0 flex justify-between w-screen p-8 overflow-x-hidden bg-transparent">
      <Head>
        <title>{pageTitle ? pageTitle : "TalkBack"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-xl font-bold">TalkBack</h2>
      <div className="flex justify-around">
        <div className="mx-2">
          <Link href="/">Home</Link>
        </div>
        <div className="mx-2">
          <Link href="/features">Features</Link>
        </div>
        <div className="mx-2">
          <Link href="/pricing">Pricing</Link>
        </div>
        <div className="mx-2">
          <Link href="/install">Install</Link>
        </div>
      </div>
    </div>
  );
}
