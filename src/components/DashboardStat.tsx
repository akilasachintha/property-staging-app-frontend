import DashboardStatCard from "./DashboardStatCard";
import React from "react";
import {useAuthContext} from "../context/AuthContext";
import {FaCheckCircle, FaFileInvoice, FaRegQuestionCircle, FaUserTie} from "react-icons/fa";
import {IconType} from "react-icons";
import {useEnquiryContext} from "../context/EnquiryContext";

interface IData {
    id: string;
    icon: IconType;
    title: string;
    count: string;
    navigateTo?: string;
}

export default function DashboardStat() {
    const {userRole} = useAuthContext();
    const {dashboardItems} = useEnquiryContext();

    const data: IData[] = [
        {id: '1', icon: FaUserTie, title: 'Agents', count: dashboardItems.usersCount, navigateTo: '/agent'},
        {id: '2', icon: FaRegQuestionCircle, title: 'Enquiries', count: dashboardItems.enquiresCount, navigateTo: '/enquiry'},
        {id: '3', icon: FaFileInvoice, title: 'Invoices', count: dashboardItems.invoicesCount, navigateTo: '/invoice'},
        { id: '4', icon: FaCheckCircle, title: 'Completed Enquiries', count: dashboardItems.completedEnquiresCount, navigateTo: '/enquiry'},
    ];

    return(
        <>
            {
                userRole === 'Admin' && (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
                        {data.map((item, index) => (
                            <DashboardStatCard key={index} icon={item.icon} title={item.title} count={item.count}
                                               navigateTo={item.navigateTo}/>
                        ))}
                    </div>
                )
            }
        </>
    );
}