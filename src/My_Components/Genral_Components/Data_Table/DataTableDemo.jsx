"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch } from "react-redux";
// showdatacolumns.dropdown({
//     accessorKey: "status",
//     header: "Status",
//     headingdrop: "Change Status",
//     fetchUrl: "https://api.example.com/status-list", // 🔥 Your API endpoint
//     onChange: ({ value, row }) => {
//       dispatch(
//         updatevalue({
//           value,
//           id: row.original.id,
//           field: "status",
//         })
//       );
//     },
//   }),//if search dropdownsearche
export const showdatacolumns = {
  input: ({ accessorKey, header, inputdatatype, inputdatafunction }) => ({
    accessorKey,
    header,
    searchbar: ({ table }) => (
      <Input
        placeholder={`Filter ${accessorKey}...`}
        value={table.getColumn(accessorKey)?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn(accessorKey)?.setFilterValue(event.target.value)
        }
      />
    ),
    cell: ({ row }) => {
      const [value, setValue] = React.useState(row.original[accessorKey]);

      const handleChange = (e) => {
        setValue(e.target.value);
        inputdatafunction({ e, row }); // ✅ pass both event & row
      };

      return (
        <Input
          type={inputdatatype}
          value={value}
          onChange={handleChange}
          placeholder={header}
        />
      );
    },
  }),
  dropdown: ({
    accessorKey,
    header,
    defaultValue,
    options,
    headingdrop,
    onChange,
  }) => ({
    id: accessorKey,
    accessorKey,
    header: () => <div className="text-left ml-6 font-semibold">{header}</div>,
    searchbar: ({ table }) => (
      <div className="text-left ml-5 py-2 w-32">
        <Input
          placeholder={`Filter ${accessorKey}...`}
          value={table.getColumn(accessorKey)?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn(accessorKey)?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      </div>
    ),
    cell: ({ row }) => {
      const [value, setValue] = React.useState(row.original[accessorKey]);

      const handleChange = (val) => {
        setValue(val);
        onChange?.({ value: val, row }); // 🔥 call parent callback with row context
      };

      return (
        <div className="w-32 ml-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center group cursor-pointer">
                <Input value={value} readOnly className="cursor-pointer" />
                <ChevronDown className="text-[18px] -left-7 relative transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-full">
              <DropdownMenuLabel>{headingdrop}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={value}
                onValueChange={handleChange}
              >
                {options.map((item) => (
                  <DropdownMenuRadioItem key={item} value={item}>
                    {item}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }),
  dropdownsearche: ({
    accessorKey,
    header,
    defaultValue = "",
    fetchUrl, // 👈 API or Appwrite endpoint
    headingdrop = "Select Option",
    onChange,
  }) => ({
    id: accessorKey,
    accessorKey,
    header: () => <div className="text-left ml-6 font-semibold">{header}</div>,

    searchbar: ({ table }) => (
      <div className="text-left ml-5 py-2 w-32">
        <Input
          placeholder={`Filter ${accessorKey}...`}
          value={table.getColumn(accessorKey)?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn(accessorKey)?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      </div>
    ),

    cell: ({ row }) => {
      const [value, setValue] = React.useState(
        row.original[accessorKey] || defaultValue
      );
      const [options, setOptions] = React.useState([]);
      const [loading, setLoading] = React.useState(true);
      const [searchTerm, setSearchTerm] = React.useState("");

      // 👇 Fetch dropdown data
      React.useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const res = await fetch(fetchUrl);
            const data = await res.json();

            // adjust if your API returns nested data
            const formatted = Array.isArray(data)
              ? data
              : data?.documents || [];

            setOptions(formatted);
          } catch (err) {
            console.error("Dropdown fetch error:", err);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, [fetchUrl]);

      // 🔍 Filter logic
      const filteredOptions = React.useMemo(() => {
        return options.filter((opt) =>
          (opt.name || opt.value || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }, [options, searchTerm]);

      // Handle select change
      const handleChange = (val) => {
        setValue(val);
        onChange?.({ value: val, row });
      };

      return (
        <div className="w-48 ml-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center group cursor-pointer">
                <Input
                  value={value}
                  readOnly
                  className="cursor-pointer truncate"
                  placeholder={loading ? "Loading..." : "Select..."}
                />
                <ChevronDown className="text-[18px] -left-7 relative transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-full">
              <DropdownMenuLabel>{headingdrop}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* 🔍 Search box inside dropdown */}
              <div className="p-2">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="max-h-48 overflow-y-auto">
                {loading ? (
                  <div className="p-2 text-sm text-gray-500">Loading...</div>
                ) : filteredOptions.length > 0 ? (
                  filteredOptions.map((item) => (
                    <DropdownMenuRadioItem
                      key={item.id || item.name}
                      value={item.name || item.value}
                      onClick={() => handleChange(item.name || item.value)}
                    >
                      {item.name || item.value}
                    </DropdownMenuRadioItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-gray-500">No results</div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }),
  text: ({ accessorKey, header }) => ({
    accessorKey,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {header}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    // ✅ Search bar for this column
    searchbar: ({ table }) => (
      <div className="py-2">
        <Input
          placeholder={`Filter ${accessorKey}...`}
          value={table.getColumn(accessorKey)?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn(accessorKey)?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      </div>
    ),

    // ✅ Cell (editable or static)
    cell: ({ row }) => (
      <div className="lowercase ml-2">{row.getValue(accessorKey)}</div>
    ),
  }),
  checkbox: ({ accessorKey, header }) => ({
    id: accessorKey,
    accessorKey,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const checked = row.original[accessorKey];

      return (
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => {
            dispatch(
              updatevalue({
                id: row.original.id,
                field: accessorKey,
                value,
              })
            );
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),
};

// const check = [
//   showdatacolumns.input({
//     accessorKey: "amount",
//     header: "Amount",
//     inputdatatype: "number",
//     inputdatafunction: ({ e, row }) => {
//       dispatch(updatevalue({ value: e.target.value, index: row.index }));
//     },
//   }),
//   showdatacolumns.dropdown({
//     accessorKey: "status",
//     header: "Panel Position",
//     headingdrop: "Select Panel Position",
//     defaultValue: "Bottom",
//     options: ["success", "failed", "payed"],
//     onChange: ({ value, row }) => {
//       console.log(value, row);
//       // const dispatch = useDispatch(); // ⚠️ use inside component, not here
//       // dispatch(updatevalue({ value, id: row.original.id, field: "position" }));
//     },
//   }),
//   showdatacolumns.text({
//     accessorKey: "status",
//     header: "Status",
//   }),
// ];
// export const columns = [
// {
//   accessorKey: "email",
//   header: ({ column }) => {
//     return (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Email
//         <ArrowUpDown />
//       </Button>
//     );
//   },
//   searchbar: () => (
//     <div className=" ">
//       {" "}
//       <Input
//         placeholder="Filter emails..."
//         // value={table.getColumn("email")?.getFilterValue() ?? ""}
//         onChange={(event) =>
//           table.getColumn("email")?.setFilterValue(event.target.value)
//         }
//         className=""
//       />
//     </div>
//   ),
//   cell: ({ row }) => (
//     <div className="lowercase ml-2">{row.getValue("email")}</div>
//   ),
// },
// {
//   accessorKey: "amount",
//   header: () => <div className="text-left ml-2">Amount</div>,
//   searchbar: () => (
//     <div className=" ">
//       <Input
//         placeholder="Filter emails..."
//         // value={table.getColumn("email")?.getFilterValue() ?? ""}
//         onChange={(event) =>
//           table.getColumn("email")?.setFilterValue(event.target.value)
//         }
//         className=""
//       />
//     </div>
//   ),
//   cell: ({ row }) => {
//     const amount = parseFloat(row.getValue("amount"));
//     // Format the amount as a dollar amount
//     const formatted = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);
//     return <div className="text-left font-medium ml-1">{formatted}</div>;
//   },
// },
// {
//   id: "actions",
//   accessorKey: "Select",
//   header: () => <div className="text-left  ml-6">Select</div>,
//   searchbar: () => (
//     <div className="text-left ml-5 py-2 w-32 ">
//       {" "}
//       <Input
//         placeholder="Filter emails..."
//         // value={table.getColumn("email")?.getFilterValue() ?? ""}
//         onChange={(event) =>
//           table.getColumn("email")?.setFilterValue(event.target.value)
//         }
//         className="max-w-sm"
//       />
//     </div>
//   ),
//   cell: ({ row }) => {
//     const [position, setPosition] = React.useState("bottom");
//     return (
//       <>
//         <div className="w-32 ml-5 ">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <div className=" flex items-center ">
//                 <Input type="number" placeholder={position} />
//                 <ChevronDown className="text-[18px] -left-7 relative transition-transform group-data-[state=open]/collapsible:rotate-180" />
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-full">
//               <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuRadioGroup
//                 value={position}
//                 onValueChange={setPosition}
//               >
//                 <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
//                 <DropdownMenuRadioItem value="bottom">
//                   Bottom
//                 </DropdownMenuRadioItem>
//                 <DropdownMenuRadioItem value="right">
//                   Right
//                 </DropdownMenuRadioItem>
//               </DropdownMenuRadioGroup>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </>
//     );
//   },
// },
// {
//   id: "actions",
//   accessorKey: "Select",
//   header: () => <div className="text-left  ml-6">Select</div>,
//   searchbar: () => (
//     <div className="text-left ml-5 py-2 w-32 ">
//       {" "}
//       <Input
//         placeholder="Filter emails..."
//         // value={table.getColumn("email")?.getFilterValue() ?? ""}
//         onChange={(event) =>
//           table.getColumn("email")?.setFilterValue(event.target.value)
//         }
//         className="max-w-sm"
//       />
//     </div>
//   ),
//   cell: ({ row }) => {
//     const [position, setPosition] = React.useState("bottom");
//     return (
//       <>
//         <div className="w-32 ml-5 ">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <div className=" flex items-center ">
//                 <Input type="number" placeholder={position} />
//                 <ChevronDown className="text-[18px] -left-7 relative transition-transform group-data-[state=open]/collapsible:rotate-180" />
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-full">
//               <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuRadioGroup
//                 value={position}
//                 onValueChange={setPosition}
//               >
//                 <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
//                 <DropdownMenuRadioItem value="bottom">
//                   Bottom
//                 </DropdownMenuRadioItem>
//                 <DropdownMenuRadioItem value="right">
//                   Right
//                 </DropdownMenuRadioItem>
//               </DropdownMenuRadioGroup>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </>
//     );
//   },
// },
// ];

export function DataTableDemo({ columndata, dataloded }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: dataloded,
    columns: columndata,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((searchbar) => {
                  return (
                    <TableHead key={searchbar.id}>
                      {searchbar.isPlaceholder
                        ? null
                        : flexRender(
                            searchbar.column.columnDef.searchbar({ table }),
                            searchbar.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    // console.log(cell);
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* this is futter side */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
