import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {useAxiosContext} from "./AxiosContext";
import {useToastContext} from "./ToastContext";
import {useAuthContext} from "./AuthContext";

export type EnquiryType = {
    clientName: string;
    propertyAddress: string;
    createdDate: string;
    id: string;
}

export type DashboardContextType = {
    enquiryList: EnquiryType[];
    createEnquiry: (
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        propertyAddress: string,
        specialNotes: string,
        agentDetails: string,
        propertyImages: File[]
    ) => Promise<boolean | undefined>;
    dashboardItems: DashboardItemType;
    isInquiryFormOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    getEnquires?: () => Promise<EnquiryType[]>;
    getDashboardItems?: () => Promise<DashboardItemType>;
};

type DashboardProviderProps = {
    children: ReactNode;
};

type DashboardItemType = {
    enquiresCount: string;
    usersCount: string;
    completedEnquiresCount: string;
    invoicesCount: string;
};

export const DashboardContext = createContext<DashboardContextType>({
    enquiryList: [],
    createEnquiry: () => Promise.resolve(false),
    dashboardItems: {
        enquiresCount: '',
        usersCount: '',
        completedEnquiresCount: '',
        invoicesCount: '',
    },
    isInquiryFormOpen: false,
    onClose: () => {},
    onOpen: () => {},
    getEnquires: () => Promise.resolve([]),
    getDashboardItems: () => Promise.resolve({
        enquiresCount: '',
        usersCount: '',
        completedEnquiresCount: '',
        invoicesCount: '',
    }),
});

export const DashboardProvider : FC<DashboardProviderProps> = ({ children }) => {
    const [enquiryList, setEnquiryList] = useState<EnquiryType[]>([]);
    const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);
    const [dashboardItems, setDashboardItems] = useState<DashboardItemType>({
        enquiresCount: '',
        usersCount: '',
        completedEnquiresCount: '',
        invoicesCount: '',
    });

    const axiosInstance = useAxiosContext();
    const { showMessage } = useToastContext();
    const {userRole} = useAuthContext();

    const getEnquires = async () => {
        try {
            const response = await axiosInstance.get('/enquires');

            if (response && response.data && response.data.data !== null) {
                const enquiries = response.data.data.map((enquiry: EnquiryType) => ({
                    clientName: enquiry.clientName,
                    propertyAddress: enquiry.propertyAddress,
                    createdDate: enquiry.createdDate,
                    id: enquiry.id,
                }));

                setEnquiryList(enquiries);
                return enquiries;
            }
        } catch (error: any) {
            console.log(error.message);
            return [];
        }
    }

    const createEnquiry = async (
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        propertyAddress: string,
        specialNotes: string,
        agentDetails: string,
        propertyImages: File[]
    ) => {
        try {
            if (axiosInstance) {
                const formData = new FormData();
                formData.append('clientName', clientName);
                formData.append('clientEmail', clientEmail);
                formData.append('clientPhoneNumber', clientPhone);
                formData.append('propertyAddress', propertyAddress);
                formData.append('specialNotes', specialNotes);

                if(userRole === 'Admin'){
                    formData.append('agentDetails', agentDetails);
                }

                propertyImages.forEach((image) => formData.append('propertyImages', image));

                const response = await axiosInstance.post('/enquiry', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response && response.data && response.data.data !== null) {
                    showMessage('Enquiry sent successfully.', 'success');
                    const updatedEnquiryList = await getEnquires();
                    const updatedDashboardItems = await getDashboardItems();
                    setDashboardItems(updatedDashboardItems);
                    setEnquiryList(updatedEnquiryList);

                    return true;
                }

                return false;
            }
        } catch (error: any) {
            showMessage('Failed to send enquiry.', 'error');
            return false;
        }
    }

    const getDashboardItems = async () => {
        try {
            const response = await axiosInstance.get('/dashboard');

            if (response && response.data && response.data.data !== null) {
                const dashboardItems = response.data.data;
                console.log(dashboardItems);
                setDashboardItems(dashboardItems);
                return dashboardItems;
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const onClose = () => {
        setIsInquiryFormOpen(false);
    }

    const onOpen = () => {
        setIsInquiryFormOpen(true);
    }

    return (
        <DashboardContext.Provider value={{ enquiryList, createEnquiry, dashboardItems, isInquiryFormOpen, onOpen, onClose, getEnquires, getDashboardItems}}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);