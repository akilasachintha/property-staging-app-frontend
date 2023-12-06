import React, {FC} from 'react';
import EnquiryList from "../../components/EnquiryList";
import DashboardStat from "../../components/DashboardStat";
import {useAuthContext} from "../../context/AuthContext";
import InvoiceList from "../../components/InvoicesList";

const DashboardHomePage: FC = () => {
    const {userRole} = useAuthContext();

    return (
        <div className="flex flex-col items-center space-y-4">
            {
                userRole === 'Admin' && (
                    <DashboardStat />
                )
            }
            <EnquiryList rowsCount={6}/>
            <InvoiceList rowsCount={6}/>
        </div>
    )
}

export default DashboardHomePage;
