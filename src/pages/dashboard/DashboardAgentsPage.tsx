import Breadcrumb from "../../components/baseComponents/BreadCrumb";
import React from "react";
import AgentsList from "../../components/AgentsList";

export default function DashboardAgentsPage() {
    return (
        <div>
          <Breadcrumb/>
          <AgentsList rowsCount={20}/>
        </div>
    );
}