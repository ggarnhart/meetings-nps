import Link from "next/link";
import { Square, SquareCheck, ArrowUpRightCircle } from "tabler-icons-react";
import moment from "moment";

interface TableRowProps {
  selected: boolean;
  averageRating: number;
  title?: string;
  date: Date;
  gid: any;
  toggleRowSelection: any;
}
export default function TableRow({
  selected,
  averageRating,
  title,
  date,
  gid,
  toggleRowSelection,
}: TableRowProps) {
  return (
    <tr
      className={`border-t dark:border-gray-700 ${
        selected ? "dark:bg-gray-600 bg-indigo-50" : ""
      }`}
    >
      <td className="p-3 text-center">
        {selected ? (
          <SquareCheck
            className="cursor-pointer"
            onClick={() => toggleRowSelection(gid)}
          />
        ) : (
          <Square
            className="cursor-pointer"
            onClick={() => toggleRowSelection(gid)}
          />
        )}
      </td>
      <td className="p-3 text-center">{title}</td>
      <td className="p-3 text-center">
        {isNaN(averageRating) ? "No Ratings Yet" : averageRating}
      </td>
      <td className="p-3 text-center">{moment(date).format("MMM Do, YYYY")}</td>
      <td className="p-3 text-center">
        <Link href={`/m/${gid}`}>
          <ArrowUpRightCircle className="cursor-pointer" />
        </Link>
      </td>
    </tr>
  );
}
