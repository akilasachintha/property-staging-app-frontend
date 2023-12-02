import {createContext, FC, ReactNode, useContext, useState} from "react";
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
        agentId: string,
        propertyImages: File[]
    ) => Promise<boolean | undefined>;
    updateEnquiry: (
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        propertyAddress: string,
        specialNotes: string,
        agentId: string,
        propertyImages: File[]
    ) => Promise<boolean | undefined>;
    dashboardItems: DashboardItemType;
    isInquiryFormOpen: boolean;
    isDeleteModalOpen: boolean;
    onCloseEnquiry: () => void;
    onOpenEnquiry: () => void;
    getEnquires?: () => Promise<EnquiryType[]>;
    getDashboardItems?: () => Promise<DashboardItemType>;
    onConfirmDelete?: (id: string | undefined) => void;
    onCloseDeleteModal?: () => void;
    onOpenDeleteModal?: () => void;
    selectedEnquiry?: EnquiryType | null;
    setSelectedEnquiry?: (enquiry: EnquiryType | null) => void;
    setIsEditEnquiry?: (value: boolean) => void;
    isEditEnquiry?: boolean;
    getEnquiry?: (id: string) => Promise<any | null>;
    selectedEnquiryApi?: any | null;
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

export const EnquiryContext = createContext<DashboardContextType>({
    enquiryList: [],
    createEnquiry: () => Promise.resolve(false),
    updateEnquiry: () => Promise.resolve(false),
    getEnquiry: () => Promise.resolve(null),
    dashboardItems: {
        enquiresCount: '',
        usersCount: '',
        completedEnquiresCount: '',
        invoicesCount: '',
    },
    isInquiryFormOpen: false,
    onCloseEnquiry: () => {},
    onOpenEnquiry: () => {},
    getEnquires: () => Promise.resolve([]),
    getDashboardItems: () => Promise.resolve({
        enquiresCount: '',
        usersCount: '',
        completedEnquiresCount: '',
        invoicesCount: '',
    }),
    isDeleteModalOpen: false,
    onConfirmDelete: () => {},
    onCloseDeleteModal: () => {},
    onOpenDeleteModal: () => {},
    selectedEnquiry: null,
    setSelectedEnquiry: () => {},
    setIsEditEnquiry: () => {},
    isEditEnquiry: false,
    selectedEnquiryApi: null,
});

export const DashboardProvider : FC<DashboardProviderProps> = ({ children }) => {
    const [enquiryList, setEnquiryList] = useState<EnquiryType[]>([]);
    const [isEditEnquiry, setIsEditEnquiry] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryType | null>(null);
    const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEnquiryApi, setSelectedEnquiryApi] = useState<any | null>(null);
    const [dashboardItems, setDashboardItems] = useState<DashboardItemType>({
        enquiresCount: '',
        usersCount: '',
        completedEnquiresCount: '',
        invoicesCount: '',
    });

    const axiosInstance = useAxiosContext();
    const { showMessage } = useToastContext();
    const {userRole} = useAuthContext();

    const getEnquiry = async (id: string) => {
        try {
            if(!id) return null;

            const response = await axiosInstance.get(`/enquiry/${id}`);
            if (response && response.data && response.data.data !== null) {
                console.log("result" + response.data.data);
                setSelectedEnquiryApi(response.data.data);
            }
        } catch (error: any) {
            console.log(error.message);
            selectedEnquiry && setSelectedEnquiry(null);
        }
    }

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
        agentId: string,
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
                    formData.append('agentId', agentId);
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
                    console.log(userRole);
                    if(userRole === 'Admin'){
                        const updatedDashboardItems = await getDashboardItems();
                        setDashboardItems(updatedDashboardItems);
                    }
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

    const onCloseEnquiry = () => {
        setIsInquiryFormOpen(false);
        setIsEditEnquiry(false);
    }

    const onOpenEnquiry = () => {
        setIsInquiryFormOpen(true);
    }

    const onCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    }

    const onOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }

    const onConfirmDelete = async (id: string | undefined) => {
        try {
            if(!id) return;

            if (axiosInstance) {
                const response = await axiosInstance.delete(`/enquiry/${id}`);

                if (response && response.data && response.data.data !== null) {
                    showMessage('Enquiry deleted successfully.', 'success');
                    const updatedEnquiryList = await getEnquires();
                    const updatedDashboardItems = await getDashboardItems();
                    setDashboardItems(updatedDashboardItems);
                    setEnquiryList(updatedEnquiryList);
                    setIsDeleteModalOpen(false);
                    selectedEnquiry && setSelectedEnquiry(null);
                }
            }
        } catch (error: any) {
            showMessage('Failed to delete enquiry.', 'error');
        }
    }

    const updateEnquiry = async (
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        propertyAddress: string,
        specialNotes: string,
        agentId: string,
        propertyImages: File[]
    ) => {
        try {
            if(!selectedEnquiry) return;

            if (axiosInstance) {
                const formData = new FormData();
                formData.append('clientName', clientName);
                formData.append('clientEmail', clientEmail);
                formData.append('clientPhoneNumber', clientPhone);
                formData.append('propertyAddress', propertyAddress);
                formData.append('specialNotes', specialNotes);

                if(userRole === 'Admin'){
                    formData.append('agentId', agentId);
                }

                propertyImages.forEach((image) => formData.append('propertyImages', image));

                const response = await axiosInstance.put(`/enquiry/${selectedEnquiry.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response && response.data && response.data.data !== null) {
                    showMessage('Enquiry updated successfully.', 'success');
                    const updatedEnquiryList = await getEnquires();
                    if(userRole === 'Admin'){
                        const updatedDashboardItems = await getDashboardItems();
                        setDashboardItems(updatedDashboardItems);
                    }
                    setEnquiryList(updatedEnquiryList);
                    setIsInquiryFormOpen(false);
                    await getEnquiry(selectedEnquiry.id);
                    setIsEditEnquiry(false);
                }

                return false;
            }
        } catch (error: any) {
            showMessage('Failed to update enquiry.', 'error');
            return false;
        }
    }

    return (
        <EnquiryContext.Provider value={{
            enquiryList,
            createEnquiry,
            dashboardItems,
            isInquiryFormOpen,
            isDeleteModalOpen,
            onOpenEnquiry:
            onOpenEnquiry,
            onCloseEnquiry:
            onCloseEnquiry,
            getEnquires,
            getDashboardItems,
            onCloseDeleteModal,
            onOpenDeleteModal,
            onConfirmDelete,
            selectedEnquiry,
            setSelectedEnquiry,
            setIsEditEnquiry,
            isEditEnquiry,
            updateEnquiry,
            getEnquiry,
            selectedEnquiryApi,
        }}>
            {children}
        </EnquiryContext.Provider>
    );
};

export const useEnquiryContext = () => useContext(EnquiryContext);