// import type { ReactNode } from "react";

// export interface TableColumn<T> {
//   key: string;
//   title: string;
//   type?: string;
//   render?: (row: T, index: number) => ReactNode;
//   className?: string;
//   width?: string;
// }

// interface DataTableProps<T> {
//   columns: TableColumn<T>[];
//   data: T[];
//   emptyText?: string;
// }

// export default function DataTable<T>({
//   columns,
//   data,
//   emptyText = "គ្មានទិន្នន័យ",
// }: DataTableProps<T>) {
//   // console.log("DataTable render", { data, columns });
//   return (
//     <div className="bg-white rounded-xl shadow">
//       {/* Mobile Scroll Wrapper */}
//       <div className="w-full overflow-x-auto">
//         <table className="min-w-full border-collapse">
//           {/* Header - Hide on very small screens */}
//           <thead className="hidden sm:table-header-group">
//             <tr className="bg-gray-100 text-left font-moul text-sm lg:text-base">
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   className="px-4 py-3 border-b whitespace-nowrap"
//                 >
//                   {col.title}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {data.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   className="px-4 py-6 text-center text-gray-400"
//                 >
//                   {emptyText}
//                 </td>
//               </tr>
//             ) : (
//               data.map((row, index) => (
//                 <tr
//                   key={index}
//                   className="
//                     border-b
//                     font-battambang
//                     text-sm sm:text-base
//                     hover:bg-gray-50
//                     block sm:table-row
//                     mb-4 sm:mb-0
//                   "
//                 >
//                   {columns.map((col) => (
//                     <td
//                       key={col.key}
//                       className="
//                         px-4 py-2
//                         align-top
//                         block sm:table-cell
//                       "
//                     >
//                       {/* Mobile Label */}
//                       <div className="sm:hidden text-xs font-semibold text-gray-500 mb-1">
//                         {col.title}
//                       </div>

//                       <div className="wrap-break-words">
//                         {col.render ? (
//                           col.render(row, index)
//                         ) : col.type === "badge_list" ? (
//                           <div className="flex flex-wrap gap-1">
//                             {(row as any)[col.key]?.map((item: any) => (
//                               <span
//                                 key={item.id}
//                                 className="px-2 py-1 text-xs bg-gray-200 rounded-md"
//                               >
//                                 {item.source_type}
//                               </span>
//                             ))}
//                           </div>
//                         ) : (
//                           (row as any)[col.key]
//                         )}
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="text-sm text-gray-500 px-4 py-2">
//         Showing {data.length} records
//       </div>
//     </div>
//   );
// }
import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  title: string;
  type?: string;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
  width?: string;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyText?: string;
}

export default function DataTable<T>({
  columns,
  data,
  emptyText = "គ្មានទិន្នន័យ",
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow">
      {/* Mobile Scroll Wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse">
          {/* Header */}
          <thead className="hidden sm:table-header-group">
            <tr className="bg-gray-100 text-left font-moul text-sm lg:text-base">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 border-b whitespace-nowrap"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="
                    border-b
                    font-battambang
                    text-sm sm:text-base
                    hover:bg-gray-50
                    block sm:table-row
                    mb-4 sm:mb-0
                  "
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="
                        px-4 py-2
                        align-top
                        block sm:table-cell
                      "
                    >
                      {/* Mobile Label */}
                      <div className="sm:hidden text-xs font-semibold text-gray-500 mb-1">
                        {col.title}
                      </div>

                      {/* Content */}
                      <div className="break-words">
                        {col.render
                          ? col.render(row, index)
                          : (row as any)[col.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500 px-4 py-2">
        Showing {data.length} records
      </div>
    </div>
  );
}
