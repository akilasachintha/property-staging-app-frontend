import {useAxiosContext} from "../context/AxiosContext";
import {useToastContext} from "../context/ToastContext";
import {useState} from "react";

export default function useDashboardHook(){
    const axiosInstance = useAxiosContext();
    const {showMessage} = useToastContext();
    const [enquiryDetails, setEnquiryDetails] = useState<any>({});

    const getEnquiryDetails = async (id: string) => {
        try {
            const response = await axiosInstance.get(`/enquiry/${id}`);

            if (response && response.data && response.data.data !== null) {
                setEnquiryDetails(response.data.data);
                return true;
            }
        }catch (e) {
            showMessage('Failed to get enquiry details.', 'error');
            return false;
        }
    }

    return {
        getEnquiryDetails,
        enquiryDetails,
    };
}