import {useToastContext} from "../context/ToastContext";
import {useAxiosContext} from "../context/AxiosContext";
import {useEffect, useState} from "react";
import {useAuthContext} from "../context/AuthContext";

export default function useEnquiryHook() {
    const { showMessage } = useToastContext();
    const axiosInstance = useAxiosContext();
    const {userRole} = useAuthContext();
    const [agentsList, setAgentsList] = useState([]);

    useEffect(() => {
        if(userRole === 'Admin') {
            getAgentsListHook().catch((error) => console.log(error.message));
        }
    }, []);

    const getAgentsListHook = async () => {
        try {
            if (axiosInstance) {
                const response = await axiosInstance.get('/agents');

                if (response && response.data && response.data.data !== null) {
                    if (response.data.data.length > 0) {
                        setAgentsList(response.data.data);
                    } else {
                        setAgentsList([]);
                    }
                }
            }
        } catch (error: any) {
            showMessage('Failed to get agents.', 'error');
        }
    }

    return {
        agentsList,
    };
}