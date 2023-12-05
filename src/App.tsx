import React from 'react';
import {AuthProvider} from "context/AuthContext";
import AppRoutes from "routes/Routes";
import {LoadingProvider} from "./context/LoadingContext";
import LoadingPage from "./pages/LoadingPage";
import {ToastProvider} from "./context/ToastContext";
import {AxiosProvider} from "./context/AxiosContext";
import {DashboardProvider} from "./context/EnquiryContext";
import {AgentProvider} from "./context/AgentContext";

export default function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <LoadingProvider>
                    <AxiosProvider>
                        <DashboardProvider>
                            <AgentProvider>
                                <AppRoutes />
                                <LoadingPage />
                            </AgentProvider>
                        </DashboardProvider>
                    </AxiosProvider>
                </LoadingProvider>
            </AuthProvider>
        </ToastProvider>
    );
}

