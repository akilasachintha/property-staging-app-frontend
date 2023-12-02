import EnquiryList from "../../components/EnquiryList";
import Breadcrumb from "../../components/baseComponents/BreadCrumb";
import React from "react";

export default function DashboardEnquiryPage() {
    return (
        <div>
            <Breadcrumb/>
            <EnquiryList rowsCount={20}/>
        </div>
    )
}
