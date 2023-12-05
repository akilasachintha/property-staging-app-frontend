import {FC} from "react";
import {IconType} from "react-icons";
import {Link} from "react-router-dom";

interface DashboardStatCardProps {
    icon: IconType;
    title: string;
    count: string;
    navigateTo?: string;
}

const DashboardStatCard: FC<DashboardStatCardProps> = ({icon, title, count, navigateTo}) => {
    const IconComponent = icon;

    return (
        <Link to={navigateTo || '/'}
              className="flex pt-3 flex-col items-center bg-white text-primaryBlack p-2 rounded shadow-lg hover:bg-gray-50 transition-colors duration-200">
            <IconComponent className="text-primaryGold text-3xl mb-2" />
            <span className="text-lg mb-1">{title}</span>
            <span className="text-lg">{count}</span>
        </Link>
    );
};

export default DashboardStatCard;
