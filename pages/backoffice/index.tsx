import Layout from "@/components/Layout/Layout";
import DashboardComponent from "@/components/BackOffice/Dashboard";
import React from "react";

export default function Dashboard() {
  return (
    <Layout pageTitle="Dashbaord">
      <DashboardComponent />
    </Layout>
  );
}
