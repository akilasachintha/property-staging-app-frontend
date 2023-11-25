import React, {FC} from 'react';
import EnquiryList from "../../components/EnquiryList";
import DashboardStat from "../../components/DashboardStat";

const DashboardHomePage: FC = () => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <DashboardStat />
            <EnquiryList rowsCount={6} />
        </div>
    )
}

export default DashboardHomePage;
