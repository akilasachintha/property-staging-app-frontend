import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import RegisterPage from 'pages/RegisterPage';
import NotFoundPage from 'pages/NotFoundPage';
import {useAuthContext} from "context/AuthContext";
import AdminDashboardPage from "pages/adminDashboard/AdminDashboardPage";
import ProfilePage from "pages/ProfilePage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import AgentDashboardPage from "../pages/AgentDashboardPage";
import AdminDashboardHomePage from "../pages/adminDashboard/AdminDashboardHomePage";

export default function AppRoutes() {
    const { isLoggedIn, userRole } = useAuthContext();

    return (
        <Router>
            <Routes>
                // Common Routes


                // Admin Routes
                {isLoggedIn && userRole === 'Admin' && (
                    <>
                        <Route path="/" element={<AdminDashboardPage />} >
                            <Route path="" element={<AdminDashboardHomePage />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>
                    </>
                )}

                // Agent Routes
                {isLoggedIn && userRole === 'Agent' && (
                    <>
                        <Route path="/" element={<AgentDashboardPage />} />
                    </>
                )}

                // User Routes
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
