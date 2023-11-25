import DashboardStatCard from "./DashboardStatCard";
import React from "react";
import {useAuthContext} from "../context/AuthContext";
import {FaCheckCircle, FaFileInvoice, FaRegQuestionCircle, FaUserTie} from "react-icons/fa";
import {IconType} from "react-icons";
import {useDashboardContext} from "../context/DashboardContext";

interface IData {
    id: string;
    icon: IconType;
    title: string;
    count: string;
}

export default function DashboardStat() {
    const {userRole} = useAuthContext();
    const {dashboardItems} = useDashboardContext();

    const data: IData[] = [
        { id: '1', icon: FaUserTie, title: 'Agents', count: dashboardItems.usersCount },
        { id: '2', icon: FaRegQuestionCircle, title: 'Enquiries', count: dashboardItems.enquiresCount },
        { id: '3', icon: FaFileInvoice, title: 'Invoices', count: dashboardItems.invoicesCount },
        { id: '4', icon: FaCheckCircle, title: 'Completed Enquiries', count: dashboardItems.completedEnquiresCount },
    ];

    return(
        <>
            {
                userRole === 'Admin' && (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
                        {data.map((item, index) => (
                            <DashboardStatCard key={index} icon={item.icon} title={item.title} count={item.count} />
                        ))}
                    </div>
                )
            }
        </>
    );
}