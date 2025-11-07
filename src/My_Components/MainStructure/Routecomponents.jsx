import React from "react";
import { Routes, Route } from "react-router-dom";
import { links } from "./ImportComponents";

// ✅ Helper to auto-create nested routes
const createModuleRoutes = (name, Parent, Show, Details, Create) => ({
  path: `/${name.toLowerCase()}`,
  component: Parent,
  children: [
    { path: `${name.toLowerCase()}show`, component: Show },
    { path: `${name.toLowerCase()}details`, component: Details },
    { path: `${name.toLowerCase()}Create`, component: Create },
  ],
});

export const Routecomponents = () => {
  const routeConfig = [
    { path: "/", component: links.dashborad },
    createModuleRoutes(
      "All",
      links.DashbordAll,
      links.ShowAll,
      links.DetailsAll
    ),
    createModuleRoutes(
      "Listing",
      links.OutlitListing,
      links.ShowListing,
      links.DetailsListing,
      links.CreateListing
    ),
    createModuleRoutes(
      "Offers",
      links.DashboradOffer,
      links.ShowOffer,
      links.DetailsOffer,
      links.CreateOffer
    ),
    createModuleRoutes(
      "Transactions",
      links.DetailsTransaction,
      links.ShowTransaction,
      links.DashboradTransaction
    ),
    createModuleRoutes(
      "Agents",
      links.DetailsAgents,
      links.ShowAgents,
      links.DashboradAgents
    ),
    createModuleRoutes(
      "Brokerages",
      links.DetailsBrokerages,
      links.ShowBrokerages,
      links.DashboradBrokerges
    ),
    createModuleRoutes(
      "Clients",
      links.DetailsClients,
      links.ShowClients,
      links.DashboradClients
    ),
    createModuleRoutes(
      "Lawyers",
      links.DetailsLawyers,
      links.ShowLawyers,
      links.DashboradLawyers
    ),
  ];

  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route key={index} path={route.path} element={<route.component />}>
        {route.children && renderRoutes(route.children)}
      </Route>
    ));

  return <Routes>{renderRoutes(routeConfig)}</Routes>;
};
