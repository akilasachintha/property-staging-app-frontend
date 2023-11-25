import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import RegisterPage from 'pages/RegisterPage';
import NotFoundPage from 'pages/NotFoundPage';
import {useAuthContext} from "context/AuthContext";
import DashboardPage from "pages/dashboard/DashboardPage";
import ProfilePage from "pages/ProfilePage";
import ForgetPasswordPage from "pages/ForgetPasswordPage";
import LoginPage from "pages/LoginPage";
import SettingsPage from "pages/SettingsPage";
import DashboardHomePage from "pages/dashboard/DashboardHomePage";
import EmailConfirmationPage from "pages/EmailConfirmationPage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import DashboardEnquiryDetailsPage from "../pages/dashboard/DashboardEnquiryDetailsPage";
import DashboardEnquiryPage from "../pages/dashboard/DashboardEnquiryPage";
import DashboardUsersPage from "../pages/dashboard/DashboardUsersPage";

export default function AppRoutes() {
    const { isLoggedIn} = useAuthContext();

    return (
        <Router>
            <Routes>
                {isLoggedIn && (
                    <>
                        <Route path="/" element={<DashboardPage />} >
                            <Route path="" element={<DashboardHomePage />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="enquiry" element={<DashboardEnquiryPage />} />
                            <Route path="enquiry/:id" element={<DashboardEnquiryDetailsPage />} />
                            <Route path="users" element={<DashboardUsersPage />} />
                        </Route>
                    </>
                )}

                {!isLoggedIn && (
                    <>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="auth/register" element={<RegisterPage />} />
                        <Route path="auth/forgot" element={<ForgetPasswordPage />} />
                        <Route path="auth/confirm" element={<EmailConfirmationPage />} />
                        <Route path="auth/reset" element={<ResetPasswordPage />} />
                    </>
                )}

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}
