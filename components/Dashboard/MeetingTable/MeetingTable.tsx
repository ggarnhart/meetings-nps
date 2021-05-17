// gets all the meetings.
// allows for deleting(?) and viewing more information. Maybe like who rated, but not who rated what.
import { useState } from "react";
import { Square, SquareCheck, SquareMinus } from "tabler-icons-react";
import TableRow from "./TableRow";
import { MeetingsAndRatings } from "../../../supabase/meetings";

interface MeetingTableProps {
  className?: string;
  title?: string;
  data: Array<MeetingsAndRatings>;
}
export default function MeetingTable({
  title,
  className,
  data,
}: MeetingTableProps) {
  const [selectedState, setSelectedState] = useState(0); // 0: none, 1: some, 2: all
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleSelection = () => {
    if (selectedRows.length !== data.length) {
      selectAllRows();
    } else {
      setSelectedRows([]);
    }
  };

  const selectAllRows = () => {
    let rows = [];
    data.forEach((meeting) => {
      rows.push(meeting.gid);
    });
    setSelectedRows(rows);
  };

  const toggleRowSelection = (gid) => {
    if (selectedRows.includes(gid)) {
      let otherRows = selectedRows.filter((i) => i !== gid);
      setSelectedRows(otherRows);
    } else {
      let rows = selectedRows.slice();
      rows.push(gid);
      setSelectedRows(rows);
    }
  };

  return (
    <div
      className={`flex flex-col w-full mx-auto mt-4 overflow-auto ${className}`}
    >
      <h3 className="mb-2 text-lg font-bold dark:text-white">
        {title ? title : "Meetings"}
      </h3>
      <table className="w-full overflow-x-scroll bg-white rounded table-auto dark:bg-gray-800 dark:text-white">
        <thead>
          <tr className="py-6 font-bold">
            <th className="p-3">
              {selectedRows.length === 0 && (
                <Square
                  className="cursor-pointer"
                  onClick={() => toggleSelection()}
                />
              )}
              {selectedRows.length > 0 && selectedRows.length < data.length && (
                <SquareMinus
                  className="cursor-pointer"
                  onClick={() => toggleSelection()}
                />
              )}
              {selectedRows.length === data.length && (
                <SquareCheck
                  className="cursor-pointer"
                  onClick={() => toggleSelection()}
                />
              )}
            </th>
            <th className="p-3">Meeting Title</th>
            <th className="p-3">Average Rating</th>
            <th className="p-3">Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((meeting) => {
            return (
              <TableRow
                selected={selectedRows.includes(meeting.gid)}
                toggleRowSelection={() => toggleRowSelection(meeting.gid)}
                title={meeting.name ? meeting.name : ""}
                date={new Date(meeting.date_created)}
                gid={meeting.gid}
                averageRating={
                  meeting.averageRating
                    ? Math.floor(meeting.averageRating * 100) / 100
                    : NaN
                }
                key={meeting.gid}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
