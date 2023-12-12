import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import FormField from 'components/FormField';
import useAuthHook from "hooks/useAuthHook";
import {useLoadingContext} from "context/LoadingContext";
import Logo from "../components/Logo";

const formFields = [
    { label: 'Email address', name: 'email', type: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
];

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
});

const initialValues = {
    email: '',
    password: '',
}

const LoginPage: React.FC = () => {
    const { loginHook } = useAuthHook();
    const {hideLoading} = useLoadingContext();

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        const result = await loginHook(values.email, values.password);
        if(result){
            hideLoading();
        }

        setSubmitting(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primaryGold to-yellow-700 px-4 sm:px-6">
            <div className="max-w-6xl w-full lg:w-full lg:grid lg:grid-cols-2 shadow-lg bg-white h-[600px] rounded">
                <div className="px-10 md:px-20 py-8 flex flex-col justify-center">
                    <Logo />
                    <h2 className="text-center text-3xl font-extrabold text-primaryBlack">
                        Sign in to your account
                    </h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="mt-8 space-y-6">
                            <div className="space-y-4">
                                {formFields.map((field) => (
                                    <FormField key={field.name} label={field.label} name={field.name} type={field.type} />
                                ))}
                            </div>
                            <div>
                                <button type="submit" className="group relative rounded w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-primaryBlack hover:bg-gray-800">
                                    Sign in
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="mt-6">
                        <Link to="/auth/forgot" className="text-sm text-primaryBlack hover:text-gray-500">
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="mt-6">
                        <Link to="/auth/register" className="text-sm text-primaryBlack hover:text-gray-500">
                            Don't have an account? Sign Up
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block relative w-full">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                        <h2 className="text-4xl font-bold">Welcome Back!</h2>
                        <p className="mt-2 text-lg">Sign in to continue to your account.</p>
                    </div>
                    <img className="w-full h-full object-cover rounded" src="https://casabellastudios.com.au/wp-content/uploads/2023/11/800x800.jpg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
