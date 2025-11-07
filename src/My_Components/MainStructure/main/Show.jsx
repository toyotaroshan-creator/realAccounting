import React from "react";
import { Button } from "../../../components/ui/button";
import {
  DataTableDemo,
  showdatacolumns,
} from "../../Genral_Components/Data_Table/DataTableDemo";
import { useDispatch } from "react-redux";
import { updatevalue } from "../../../redux/slice/getvalueReducer";

export const Show = () => {
  const dispatch = useDispatch();
  const ShowObject = {
    Heading: () => {
      return (
        <>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Listing Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage all your property listings in one place
            </p>
          </div>
        </>
      );
    },
    Button: () => {
      return (
        <>
          <Button>Listing Create</Button>
        </>
      );
    },
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <ShowObject.Heading />
        <ShowObject.Button />
      </div>
      <div className="mt-5">
        <DataTableDemo
          dataloded={[
            {
              id: "5kma53ae",
              amount: 874,
              status: "success",
              email: "Silas22@example.com",
              check: true,
            },
            {
              id: "bhqecj4p",
              amount: 721,
              status: "failed",
              email: "carmella@example.com",
              check: true,
            },
            {
              id: "bhqecj4p",
              amount: 721,
              status: "payed",
              email: "carmella@example.com",
              check: true,
            },
          ]}
          columndata={[
            showdatacolumns.input({
              accessorKey: "amount",
              header: "Amount",
              inputdatatype: "number",
              inputdatafunction: ({ e, row }) => {
                dispatch(
                  updatevalue({ value: e.target.value, index: row.index })
                );
              },
            }),
            // showdatacolumns.dropdown({
            //   accessorKey: "status",
            //   header: "Panel Position",
            //   headingdrop: "Select Panel Position",
            //   defaultValue: "Bottom",
            //   options: ["success", "failed", "payed"],
            //   onChange: ({ value, row }) => {
            //     console.log(value, row);
            //     // const dispatch = useDispatch(); // ⚠️ use inside component, not here
            //     // dispatch(updatevalue({ value, id: row.original.id, field: "position" }));
            //   },
            // }),
            showdatacolumns.text({
              accessorKey: "status",
              header: "Status",
            }),
          ]}
        />
      </div>
    </div>
  );
};
