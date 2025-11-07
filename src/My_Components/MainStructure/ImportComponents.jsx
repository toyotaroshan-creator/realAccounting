import { dashborad } from "../../Pages/Dashborad/dashborad";
//all
import { DashbordAll } from "../../Pages/Files/All/Dashbord/DashbordAll";
import { DetailsAll } from "../../Pages/Files/All/Details/DetailsAll";
import { ShowAll } from "../../Pages/Files/All/Show/ShowAll";
//linsting
import { OutlitListing } from "../../Pages/Files/Listing/dashbord/OutlitListing";
import { ShowListing } from "../../Pages/Files/Listing/show/ShowListing";
import { DetailsListing } from "../../Pages/Files/Listing/Details/DetailsListing";
import { CreateListing } from "../../Pages/Files/Listing/Create/CreateListing";
//offer

import { DetailsOffer } from "../../Pages/Files/Offer/Details/DetailsOffer";
import { CreateOffer } from "../../Pages/Files/Offer/Create/CreateOffer";
import { DashboradOffer } from "../../Pages/Files/Offer/dashborad/DashboradOffer";
//transaction

import { DetailsTransaction } from "../../Pages/Files/Transaction/Details/DetailsTransaction";
import { DashboradTransaction } from "../../Pages/Files/Transaction/dashborad/DashboradTransaction";
//Agents
import { DashboradAgents } from "../../Pages/Contacts/Agents/dashborad/dashboradAgents";
import { DetailsAgents } from "../../Pages/Contacts/Agents/Details/DetailsAgents";
import { ShowAgents } from "../../Pages/Contacts/Agents/Show/ShowAgents";
//Brokerages
import { DetailsBrokerages } from "../../Pages/Contacts/Brokerages/Details/DetailsBrokerages";
//Clients
import { DetailsClients } from "../../Pages/Contacts/Clients/Details/DetailsClients";
import { ShowClients } from "../../Pages/Contacts/Clients/Show/ShowClients";
import { DashboradClients } from "../../Pages/Contacts/Clients/dashborad/dashboradClients";
//Lawyers
import { DetailsLawyers } from "../../Pages/Contacts/Lawyers/Details/DetailsLawyers";
import { ShowLawyers } from "../../Pages/Contacts/Lawyers/Show/ShowLawyers";
import { DashboradLawyers } from "../../Pages/Contacts/Lawyers/dashborad/DashboradLawyers";
import { AppSidebar } from "../Sidebar/AppSidebar";
import { Navebar } from "../NaveBar/Navebar";
import { Routecomponents } from "./Routecomponents";
import { Breadcrumbgeneral } from "../Genral_Components/Breadcrumb/Breadcrumbgeneral";
import { ShowTransaction } from "../../Pages/Files/Transaction/Show/ShowTransaction";
//import { DashboradBrokerag } from "../../Pages/Contacts/Brokerages/dashborad/DashboradBrokerag";
export const links = {
  dashborad: dashborad,
  AppSidebar: AppSidebar,
  Navebar: Navebar,
  Routecomponents: Routecomponents,
  Breadcrumbgeneral: Breadcrumbgeneral,
  //all
  DashbordAll: DashbordAll,
  DetailsAll: DetailsAll,
  ShowAll: ShowAll,
  //linsting
  CreateListing: CreateListing,
  OutlitListing: OutlitListing,
  ShowListing: ShowListing,
  DetailsListing: DetailsListing,
  //offer
  DashboradOffer: DashboradOffer,
  // ShowOffer: ShowOffer,
  DetailsOffer: DetailsOffer,
  CreateOffer: CreateOffer,
  //transaction
  DashboradTransaction: DashboradTransaction,
  ShowTransaction: ShowTransaction,
  DetailsTransaction: DetailsTransaction,
  //agetns
  // DashboradAgents: DashboradAgents,
  DetailsAgents: DetailsAgents,
  ShowAgents: ShowAgents,
  //Brokerages
  // DashboradBrokerag: DashboradBrokerag,
  DetailsBrokerages: DetailsBrokerages,
  // ShowBrokerages: ShowBrokerages,
  //Clients
  // DashboradClients: DashboradClients,
  DetailsClients: DetailsClients,
  ShowClients: ShowClients,
  //Lawyers
  // DashboradLawyers: DashboradLawyers,
  DetailsLawyers: DetailsLawyers,
  ShowLawyers: ShowLawyers,
};
