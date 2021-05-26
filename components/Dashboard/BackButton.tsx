import { useRouter } from "next/router";
import { ArrowNarrowLeft } from "tabler-icons-react";
export default function BackButton() {
  const router = useRouter();
  return (
    <div
      className="absolute flex items-center justify-center w-12 h-12 p-2 transition-all ease-in-out bg-gray-200 rounded-full shadow cursor-pointer top-4 left-6 hover:shadow-lg dark:text-white dark:bg-gray-800"
      onClick={() => router.back()}
    >
      <ArrowNarrowLeft />
    </div>
  );
}
