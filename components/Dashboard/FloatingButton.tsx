import { User, Settings, ChevronsRight } from "tabler-icons-react";
import Link from "next/link";
export default function FloatingButton() {
  return (
    <Link href="/user">
      <div className="fixed flex items-center justify-center w-12 h-12 transition-all ease-in-out bg-white rounded-full shadow-lg cursor-pointer dark:bg-gray-600 dark:text-white dark:hover:bg-indigo-500 dark:hover:text-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 bottom-4 right-6 hover:shadow-xl">
        <User />
      </div>
    </Link>
  );
}
