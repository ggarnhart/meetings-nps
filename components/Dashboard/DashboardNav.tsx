import Link from "next/link";
import { useState } from "react";
import { User, Settings, ChevronsRight } from "tabler-icons-react";
export default function DashboardNav() {
  const [open, setIsOpen] = useState(true);

  return (
    <div className="flex flex-row w-screen px-8 pt-4">
      <h4 className="font-bold dark:text-white">talkback.</h4>
    </div>
  );
}
