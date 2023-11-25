import React, {useEffect} from 'react';
import useAuthHook from "hooks/useAuthHook";
import {useLoadingContext} from "context/LoadingContext";
import Logo from "components/Logo";
import {Link, useLocation } from "react-router-dom";
import {useToastContext} from "../context/ToastContext";

const EmailConfirmationPage: React.FC = () => {
    const { confirmEmailHook } = useAuthHook();
    const {hideLoading} = useLoadingContext();
    const {showMessage} = useToastContext();
    const location = useLocation();
    let searchParams = new URLSearchParams(location.search);
    let id = searchParams.get('id');
    let token = searchParams.get('token');

    useEffect(() => {
        console.log(id, token);
        if(id && token){
            const result = confirmEmailHook(id, token);
            console.log(result);
            if(!result){
                showMessage('Email Confirmation Failed', 'error');
                hideLoading();
            }else{
                hideLoading();
            }
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primaryGold to-yellow-700 px-4 sm:px-6">
            <div className="max-w-6xl w-full lg:w-full lg:grid lg:grid-cols-2 shadow-lg bg-white h-[600px] rounded">
                <div className="px-10 md:px-20 py-8 flex flex-col justify-center">
                    <Logo />
                    <h2 className="text-center text-3xl font-extrabold text-primaryBlack">
                        Email Confirmation
                    </h2>
                    <h4 className="text-center my-6">
                        Email Confirmed Successfully!
                    </h4>
                    <div>
                        <Link to="/" className="group relative rounded w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-primaryBlack hover:bg-gray-800">
                            Log In to your account
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block relative w-full">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                        <h2 className="text-4xl font-bold">We're excited to have you on board!</h2>
                        <p className="mt-2 text-lg">Confirm your email to continue to your account.</p>
                    </div>
                    <img className="w-full h-full object-cover rounded" src="https://casabellastudios.com.au/wp-content/uploads/2023/11/800x800.jpg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default EmailConfirmationPage;
