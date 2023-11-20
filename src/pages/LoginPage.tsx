import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import LoginImage from 'assets/login-image.jpg';
import LogoImage from 'assets/logo.png';
import FormField from 'components/FormField';
import useAuthHook from "hooks/useAuthHook";
import {useLoadingContext} from "context/LoadingContext";

const formFields = [
    { label: 'Email address', name: 'email', type: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
];

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(5, 'Must be 8 characters or more').required('Required'),
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
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6">
            <div className="max-w-6xl w-full space-y-8 lg:w-full lg:grid lg:grid-cols-2 rounded-xl shadow-lg bg-white h-[600px]">
                <div className="px-8 md:px-20 py-8 flex flex-col justify-center">
                    <img src={LogoImage} alt="Logo" className="mx-auto h-32 w-auto" />
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 lg:text-left">
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
                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700">
                                    Sign in
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="mt-6">
                        <Link to="/auth/forgot" className="text-sm text-gray-600 hover:text-gray-500">
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="mt-6">
                        <Link to="/auth/register" className="text-sm text-gray-600 hover:text-gray-500">
                            Don't have an account? Sign Up
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block relative w-full">
                    <img className="absolute inset-0 h-full w-full object-cover rounded-r-lg" src={LoginImage} alt="" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
