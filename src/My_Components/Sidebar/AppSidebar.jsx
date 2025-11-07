import { Sidebar, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarHeader } from "../../components/ui/sidebar";
import { DropdownSidebar } from "../Genral_Components/Dropdown/DropdownSidebar";
import { CiCalculator1, CiFileOn, CiStickyNote } from "react-icons/ci";
import { VscFiles } from "react-icons/vsc";
import { TbReportAnalytics, TbReportSearch } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { IoIosContact } from "react-icons/io";
import { SiContactlesspayment } from "react-icons/si";
import { FaFileSignature, FaRegAddressBook, FaRegUser } from "react-icons/fa6";
import { MdContentPasteSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const Rangeoutside = [
    {
      range: [
        { value: "All", constant: "All" },
        { value: "Listing", constant: "Listing" },
        { value: "Offers", constant: "Offers" },
        { value: "Transactions", constant: "Transactions" },
      ],
      logo: <CiFileOn />,
      heading: "Files",
    }, //file
    {
      range: [
        { value: "Brokerages", constant: "Brokerages" },
        { value: "Agents", constant: "Agents" },
        { value: "Clients", constant: "Clients" },
        { value: "Lawyers", constant: "Lawyers" },
      ],
      logo: <IoIosContact />,
      heading: "Contacts",
    }, //contact
    {
      range: [
        { value: "Invoices", constant: "Invoices" },
        { value: "Statements", constant: "Statements" },
        { value: "Trusts", constant: "Trusts" },
        { value: "Trusts Liability", constant: "TrustsLiability" },
        { value: "Payments", constant: "Payments" },
        { value: "Products", constant: "Products" },
      ],
      logo: <CiStickyNote />,
      heading: "Invoicing",
    }, //invoice
    {
      range: [
        { value: "Direct deposit", constant: "Direct deposit" },
        { value: "RAP", constant: "RAP" },
        { value: "Recurring Payments", constant: "RecurringPayments" },
        { value: "Payments Requests", constant: "PaymentsRequests" },
      ],
      logo: <SiContactlesspayment />,
      heading: "Online Payment",
    }, //online payment
    {
      range: [],
      logo: <CiCalculator1 />,
      heading: "Accounting",
    }, //Accounting
    {
      range: [
        { value: "Agents", constant: "Agents" },
        { value: "Listings", constant: "Listings" },
        { value: "Transaction", constant: "Transaction" },
        { value: "Trusts", constant: "Trusts" },
      ],
      logo: <FaRegAddressBook />,
      heading: "Ledgers",
    }, //Ledgers
    {
      range: [{ value: "Packages", constant: "Packages" }],
      logo: <FaFileSignature />,
      heading: "Esign",
    }, //esign
    {
      range: [
        { value: "Create User", constant: "CreateUser" },
        { value: "Show User", constant: "ShowUser" },
      ],
      logo: <FaRegUser />,
      heading: "Authsystem",
    }, //Authsystem
    {
      range: [
        { value: "Polices", constant: "Polices" },
        { value: "Control Procedures", constant: "ControlProcedures" },
        { value: "Clients Assessments", constant: "ClientsAssessments" },
        { value: "Fund Receipts", constant: "FundReceipts" },
        { value: "Brokerage Assessments", constant: "BrokerageAssessments" },
        { value: "Compliance Trainings", constant: "ComplianceTrainings" },
      ],
      logo: <MdContentPasteSearch />,
      heading: "Fintrac",
    }, //Fintrac
    {
      range: [
        { value: "Listings", constant: "Listings" },
        { value: "Transactions", constant: "Transactions" },
        { value: "Sales", constant: "Sales" },
      ],
      logo: <TbReportAnalytics />,
      heading: "Reports",
    }, //Setting
    {
      range: [
        { value: "Email Templates", constant: "EmailTemplates" },
        { value: "Inoivces", constant: "Inoivces" },
        { value: "Payments", constant: "Payments" },
        { value: "Ledgers", constant: "Ledgers" },
        { value: "Required documents", constant: "Required documents" },
        { value: "Notifications", constant: "Notifications" },
        { value: "eForm Admin", constant: "eFormAdmin" },
        { value: "Clauses", constant: "Clauses" },
        { value: "eForm Templates", constant: "eFormTemplates" },
        { value: "Trusts", constant: "Trusts" },
      ],
      logo: <CiSettings />,
      heading: "Settings",
    }, //Reports
    {
      range: [{ value: "Help", constant: "Help" }],
      logo: (
        <div className="text-[1.6rem]">
          <VscFiles />
        </div>
      ),
      heading: "About",
    }, //About
  ];
  const navelink = useNavigate();
  const Dropdownfunction = (constant) => {
    console.log(constant);
    navelink(`${constant.constant}/${constant.constant}Show`);
  };
  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="top-16 max-h-[calc(97vh-2.5rem)] overflow-y-auto"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="grid gap-4 mt-5">
              {Rangeoutside.map((item, index) => {
                return (
                  <div key={index}>
                    <DropdownSidebar
                      Dropdownfunction={Dropdownfunction}
                      Rangeinside={item}
                      outerindex={index}
                    />
                  </div>
                );
              })}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  );
}
