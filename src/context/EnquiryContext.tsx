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

export type InvoiceType = {
    id: string;
    invoiceDate: string;
    agentName: string;
    agentEmail: string;
    invoiceStatus: string;
}

export type ExpenseType = {
    expenseName: string;
    expenseDescription: string;
    expenseCount: number;
    expenseAmount: number,
}

export type Invoice = {
    id: string;
    enquiryId: string;
    invoiceDate: string;
    agentName: string;
    agentEmail: string;
    clientName: string;
    clientEmail: string;
    clientPhoneNumber: string;
    propertyAddress: string;
    specialNotes: string;
    invoiceStatus: string;
    invoiceEmailedDate: string;
    totalPrice: number;
    agentCommission: number;
    expenses: ExpenseType[];
}

export type DashboardContextType = {
    enquiryList: EnquiryType[];
    invoiceList: InvoiceType[];
    createEnquiry: (
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        propertyAddress: string,
        specialNotes: string,
        agentId: string,
        propertyImages: any[],
    ) => Promise<boolean | undefined>;
    createInvoice: (
        enquiryId: string,
        expenses: ExpenseType[],
    ) => Promise<boolean>;
    updateEnquiry: (
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        propertyAddress: string,
        specialNotes: string,
        agentId: string,
        propertyImages: any[],
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
    setSelectedInvoice?: (invoice: InvoiceType | null) => void;
    setIsEditEnquiry?: (value: boolean) => void;
    isEditEnquiry?: boolean;
    getEnquiry?: (id: string) => Promise<any | null>;
    selectedEnquiryApi?: Enquiry | null;
    selectedInvoiceApi?: Invoice | null;
    isEditInvoice?: boolean;
    setIsEditInvoice?: (value: boolean) => void;
    isInvoiceFormOpen?: boolean;
    onCloseInvoice: () => void;
    onOpenInvoice: () => void;
    getInvoices?: () => Promise<InvoiceType[]>;
    getInvoice?: (id: string) => Promise<any | null>;
    selectedInvoice?: InvoiceType | null;
    updateInvoice: (
        id: string,
        expenses: ExpenseType[],
    ) => Promise<boolean | undefined>;
    enquiryInvoiceList?: InvoiceType[];
    getInvoicesByEnquiryId?: (id: string) => Promise<InvoiceType[]>;
};

export type Enquiry = {
    id: string;
    clientName: string;
    clientEmail: string;
    clientPhoneNumber: string;
    propertyAddress: string;
    specialNotes: string;
    status: string;
    agentId: string;
    agentName: string;
    agentEmail: string;
    createdDate: string;
    propertyImages: any[];
}

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
    invoiceList: [],
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
    setSelectedInvoice: () => {
    },
    setIsEditEnquiry: () => {},
    isEditEnquiry: false,
    selectedEnquiryApi: null,
    selectedInvoiceApi: null,
    isEditInvoice: false,
    setIsEditInvoice: () => {
    },
    isInvoiceFormOpen: false,
    onCloseInvoice: () => {
    },
    onOpenInvoice: () => {
    },
    createInvoice: () => Promise.resolve(false),
    getInvoices: () => Promise.resolve([]),
    getInvoice: () => Promise.resolve(null),
    selectedInvoice: null,
    updateInvoice: () => Promise.resolve(false),
    enquiryInvoiceList: [],
    getInvoicesByEnquiryId: () => Promise.resolve([]),
});

export const DashboardProvider : FC<DashboardProviderProps> = ({ children }) => {
    const [enquiryList, setEnquiryList] = useState<EnquiryType[]>([]);
    const [invoiceList, setInvoiceList] = useState<InvoiceType[]>([]);
    const [enquiryInvoiceList, setEnquiryInvoiceList] = useState<InvoiceType[]>([]);
    const [isEditEnquiry, setIsEditEnquiry] = useState(false);
    const [isEditInvoice, setIsEditInvoice] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryType | null>(null);
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType | null>(null);
    const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);
    const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEnquiryApi, setSelectedEnquiryApi] = useState<Enquiry | null>(null);
    const [selectedInvoiceApi, setSelectedInvoiceApi] = useState<Invoice | null>(null);
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
                setSelectedEnquiryApi(response.data.data);
            }
        } catch (error: any) {
            console.log(error.message);
            selectedEnquiryApi && setSelectedEnquiryApi(null);
        }
    }

    const getInvoice = async (id: string) => {
        try {
            if (!id) return null;

            const response = await axiosInstance.get(`/invoice/${id}`);
            if (response && response.data && response.data.data !== null) {
                setSelectedInvoiceApi(response.data.data);
                setSelectedInvoice(response.data.data);
            }
        } catch (error: any) {
            console.log(error.message);
            selectedInvoiceApi && setSelectedInvoiceApi(null);
            selectedInvoice && setSelectedInvoice(null);
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

    const getInvoicesByEnquiryId = async (id: string) => {
        try {
            const response = await axiosInstance.get(`/enquiry/${id}/invoice`);

            if (response && response.data && response.data.data !== null) {
                const invoices = response.data.data.map((invoice: InvoiceType) => ({
                    id: invoice.id,
                    invoiceDate: invoice.invoiceDate,
                    agentName: invoice.agentName,
                    agentEmail: invoice.agentEmail,
                    invoiceStatus: invoice.invoiceStatus,
                }));

                setEnquiryInvoiceList(invoices);
                return invoices;
            }
        } catch (error: any) {
            console.log(error.message);
            setEnquiryInvoiceList([]);
            return [];
        }
    }

    const getInvoices = async () => {
        try {
            const response = await axiosInstance.get('/invoices');

            if (response && response.data && response.data.data !== null) {
                const invoices = response.data.data.map((invoice: InvoiceType) => ({
                    id: invoice.id,
                    invoiceDate: invoice.invoiceDate,
                    agentName: invoice.agentName,
                    agentEmail: invoice.agentEmail,
                    invoiceStatus: invoice.invoiceStatus,
                }));

                setInvoiceList(invoices);
                return invoices;
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

    const createInvoice = async (
        id: string,
        expenses: ExpenseType[],
    ): Promise<boolean> => {
        try {
            if (axiosInstance) {
                console.log(id);
                const data = {
                    id,
                    expenses: expenses,
                }

                const response = await axiosInstance.post('/invoice', data);
                if (response && response.data && response.data.data !== null) {
                    showMessage('Invoice sent successfully.', 'success');
                    const updatedInvoiceList = await getInvoices();
                    setInvoiceList(updatedInvoiceList);
                    return true;
                }
            }
            return false;
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

    const onCloseInvoice = () => {
        setIsInvoiceFormOpen(false);
        setIsEditInvoice(false);
    }

    const onOpenEnquiry = () => {
        setIsInquiryFormOpen(true);
    }

    const onOpenInvoice = () => {
        setIsInvoiceFormOpen(true);
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
        propertyImages: File[],
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

    const updateInvoice = async (
        id: string,
        expenses: ExpenseType[],
    ) => {
        try {
            if (axiosInstance) {
                const data = {
                    id,
                    expenses,
                }

                const response = await axiosInstance.put(`/invoice`, data);

                if (response && response.data && response.data.data !== null) {
                    setSelectedInvoice(response.data.data);
                    await getInvoice(selectedInvoice?.id || '');
                    const updatedInvoiceList = await getInvoices();
                    setInvoiceList(updatedInvoiceList);
                    return true;
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
            setSelectedInvoice,
            setSelectedEnquiry,
            setIsEditEnquiry,
            isEditEnquiry,
            updateEnquiry,
            getEnquiry,
            selectedEnquiryApi,
            selectedInvoiceApi,
            isEditInvoice,
            setIsEditInvoice,
            isInvoiceFormOpen,
            onCloseInvoice,
            onOpenInvoice,
            createInvoice,
            getInvoices,
            invoiceList,
            getInvoice,
            selectedInvoice,
            updateInvoice,
            enquiryInvoiceList,
            getInvoicesByEnquiryId,
        }}>
            {children}
        </EnquiryContext.Provider>
    );
};

export const useEnquiryContext = () => {
    const context = useContext(EnquiryContext);

    if (context === undefined) {
        throw new Error('useEnquiryContext must be used within a EnquiryProvider');
    }

    return context;
}