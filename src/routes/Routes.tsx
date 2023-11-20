import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import RegisterPage from 'pages/RegisterPage';
import NotFoundPage from 'pages/NotFoundPage';
import {useAuthContext} from "context/AuthContext";
import AdminDashboardPage from "pages/adminDashboard/AdminDashboardPage";
import ProfilePage from "pages/ProfilePage";
import ForgetPasswordPage from "pages/ForgetPasswordPage";
import LoginPage from "pages/LoginPage";
import SettingsPage from "pages/SettingsPage";
import AgentDashboardPage from "pages/agentDashboard/AgentDashboardPage";
import AdminDashboardHomePage from "pages/adminDashboard/AdminDashboardHomePage";
import AgentDashboardHomePage from "pages/agentDashboard/AgentDashboardHomePage";

export default function AppRoutes() {
    const { isLoggedIn, userRole } = useAuthContext();

    return (
        <Router>
            <Routes>
                {isLoggedIn && userRole === 'Admin' && (
                    <>
                        <Route path="/" element={<AdminDashboardPage />} >
                            <Route path="" element={<AdminDashboardHomePage />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>
                    </>
                )}

                {isLoggedIn && userRole === 'Agent' && (
                    <>
                        <Route path="/" element={<AgentDashboardPage />} >
                            <Route path="" element={<AgentDashboardHomePage />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>
                    </>
                )}

                {!isLoggedIn && (
                    <>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="auth/register" element={<RegisterPage />} />
                        <Route path="auth/forgot" element={<ForgetPasswordPage />} />
                    </>
                )}

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}
