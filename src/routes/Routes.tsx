import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import RegisterPage from 'pages/RegisterPage';
import NotFoundPage from 'pages/NotFoundPage';
import {useAuthContext} from "context/AuthContext";
import DashboardPage from "pages/dashboard/DashboardPage";
import ForgetPasswordPage from "pages/ForgetPasswordPage";
import LoginPage from "pages/LoginPage";
import DashboardHomePage from "pages/dashboard/DashboardHomePage";
import EmailConfirmationPage from "pages/EmailConfirmationPage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import DashboardEnquiryDetailsPage from "../pages/dashboard/DashboardEnquiryDetailsPage";
import DashboardEnquiryPage from "../pages/dashboard/DashboardEnquiryPage";
import DashboardUserProfilePage from "../pages/dashboard/DashboardUserProfilePage";
import DashboardAgentsPage from "../pages/dashboard/DashboardAgentsPage";
import DashboardInvoicePage from "../pages/dashboard/DashboardInvoicePage";
import DashboardInvoiceDetailsPage from "../pages/dashboard/DashboardInvoiceDetailsPage";
import DashboardEnquiryInvoicePage from "../pages/dashboard/DashboardEnquiryInvoicePage";

export default function AppRoutes() {
    const { isLoggedIn, userRole} = useAuthContext();

    return (
        <Router>
            <Routes>
                {isLoggedIn && (
                    <>
                        <Route path="/" element={<DashboardPage />} >
                            <Route path="" element={<DashboardHomePage />} />
                            <Route path="profile" element={<DashboardUserProfilePage/>}/>
                            <Route path="enquiry" element={<DashboardEnquiryPage/>}/>
                            <Route path="enquiry/:id" element={<DashboardEnquiryDetailsPage />} />
                            <Route path="enquiry/:id/invoice" element={<DashboardEnquiryInvoicePage/>}/>
                            <Route path="invoice" element={<DashboardInvoicePage/>}/>
                            <Route path="invoice/:id" element={<DashboardInvoiceDetailsPage/>}/>
                            {
                                userRole === 'Admin' && (
                                    <>
                                        <Route path="agent" element={<DashboardAgentsPage />} />
                                    </>
                                )
                            }
                            <Route path="users" element={<DashboardUserProfilePage/>}/>
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
