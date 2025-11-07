import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../../../components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

import { ChevronDown } from "lucide-react";

export const DropdownSidebar = ({
  Rangeinside = [],
  outerindex = [],
  Dropdownfunction,
}) => {
  return (
    <div>
      <div className="bg-white cursor-pointer px-2  border rounded-sm items-center ">
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <div className="flex items-center cursor-pointer justify-between w-full">
                  <div className="flex text-[18px] items-center space-x-5 -m-2">
                    {Rangeinside.logo}
                    <p className="text-[18px] ">{Rangeinside.heading} </p>
                  </div>
                  <ChevronDown className="ml-auto text-[18px] -m-2 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </div>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent />
              <div className="grid gap-2 mt-5 ">
                {Rangeinside?.range?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p
                        onClick={() =>
                          Dropdownfunction({
                            outerindex: outerindex,
                            constant: item.constant,
                            inerindex: index,
                          })
                        }
                        className=" px-15 py-2 rounded-sm hover:bg-gray-100 bg-gray-50 "
                      >
                        {item.value}
                      </p>
                      {/* <p className="px-15 py-2 rounded-sm bg-gray-50 ">All</p> */}
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </div>
    </div>
  );
};
