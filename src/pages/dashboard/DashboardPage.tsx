import React, {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import SideBar from "../../components/SideBar";
import NavigationBar from "../../components/NavigationBar";
import EnquiryForm from "../../components/EnquiryForm";
import {useEnquiryContext} from "../../context/EnquiryContext";
import {useAuthContext} from "../../context/AuthContext";
import DeleteModal from "../../components/DeleteConfirmModal";

export default function DashboardPage() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {isInquiryFormOpen, isDeleteModalOpen, onCloseEnquiry, getEnquires, getDashboardItems} = useEnquiryContext();
    const {userRole} = useAuthContext();
    const {isLoggedIn} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn){
          navigate('/');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        getEnquires && getEnquires().catch((error) => console.log(error.message));
    }, []);

    useEffect(() => {
        if(userRole === 'Admin'){
            getDashboardItems && getDashboardItems().catch((error) => console.log(error.message));
        }
    }, [userRole]);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {
                isInquiryFormOpen && (
                    <EnquiryForm onClose={onCloseEnquiry}/>
                )
            }
            {
                isDeleteModalOpen && (
                    <DeleteModal/>
                )
            }
            <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className="flex flex-col flex-1 w-full overflow-auto">
                <NavigationBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                <main className="px-6 pt-4 pb-4 flex-grow overflow-auto rounded-lg scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
