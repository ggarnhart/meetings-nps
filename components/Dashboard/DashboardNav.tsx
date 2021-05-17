import Link from "next/link";
import { useState } from "react";
import { User, Settings, ChevronsRight } from "tabler-icons-react";
export default function DashboardNav() {
  const [open, setIsOpen] = useState(true);

  return (
    <>
      {open && (
        <div className="flex flex-col w-full shadow-inner bg-indigo-50 md:w-1/6 dark:bg-gray-800 dark:text-white">
          <div className="py-4 pl-6">
            <div className="mb-8 font-bold">talkback.</div>
            {/* example of the selected page. we can use useRouter*/}
            <Link href="/dashboard">
              <div
                className={`cursor-pointer my-2 rounded-l-full pl-5 py-2 bg-indigo-200 text-indigo-700`}
              >
                Dashboard
              </div>
            </Link>
            <Link href="/page-2">
              <div className={`cursor-pointer my-2 pl-5 py-2 `}>Page 2</div>
            </Link>
          </div>
          <div className="flex flex-row flex-grow h-full">
            <div className="flex items-center self-end justify-around w-full h-8 px-4 py-6 text-indigo-300">
              <Link href="/admin">
                <User size={28} className="cursor-pointer" />
              </Link>
              <Link href="/settings">
                <Settings size={28} className="cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      )}
      {!open && (
        <div className="absolute left-0 transition-all duration-200 ease-in-out bg-white top-4">
          <ChevronsRight
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}
    </>
  );
}
