import {createContext, FC, ReactNode, useContext, useState} from "react";
import {useAxiosContext} from "./AxiosContext";
import {useToastContext} from "./ToastContext";

type AgentContextProps = {
    agentsList?: Agent[];
    selectedAgent?: Agent | null;
    setSelectedAgent?: (agent: Agent) => void;
    getAgents?: () => Promise<void>;
}

type AgentProviderProps = {
    children: ReactNode;
};

export type Agent = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bankAccountNumber: string;
    bsb: string;
}

export const AgentContext = createContext<AgentContextProps>({});

export const AgentProvider: FC<AgentProviderProps> = ({children}) => {
    const [agentsList, setAgentsList] = useState<Agent[]>([]);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const axiosInstance = useAxiosContext();
    const {showMessage} = useToastContext();

    const getAgents = async () => {
        try {
            const response = await axiosInstance.get('/agents');
            console.log(response);
            if(response && response.data && response.data.data != null){
                setAgentsList(response.data.data);
            }
        }catch (error : any) {
            showMessage(error.message, 'error');
            console.log(error);
        }
    }

    return (
        <AgentContext.Provider value={{agentsList, selectedAgent, setSelectedAgent, getAgents}}>
            {children}
        </AgentContext.Provider>
    )
}

export const useAgentContext = () => {
    const context = useContext(AgentContext);

    if (context === undefined) {
        throw new Error('useAgentContext must be used within a AgentProvider');
    }

    return context;
}