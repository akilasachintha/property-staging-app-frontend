import EnquiryList from "../../components/EnquiryList";
import Breadcrumb from "../../components/BreadCrumb";
import EnquiryForm from "../../components/EnquiryForm";
import React from "react";
import {useDashboardContext} from "../../context/DashboardContext";

export default function DashboardEnquiryPage() {
    return (
        <div>
            <Breadcrumb/>
            <EnquiryList rowsCount={20}/>
        </div>
    )
}
