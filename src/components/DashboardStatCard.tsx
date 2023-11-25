import {FC} from "react";
import {IconType} from "react-icons";

interface DashboardStatCardProps {
    icon: IconType;
    title: string;
    count: string;
}

const DashboardStatCard: FC<DashboardStatCardProps> = ({ icon, title, count }) => {
    const IconComponent = icon;

    return (
        <div className="flex pt-3 flex-col items-center bg-white text-primaryBlack p-2 rounded shadow-lg hover:bg-gray-50 transition-colors duration-200">
            <IconComponent className="text-primaryGold text-3xl mb-2" />
            <span className="text-lg mb-1">{title}</span>
            <span className="text-lg">{count}</span>
        </div>
    );
};

export default DashboardStatCard;
