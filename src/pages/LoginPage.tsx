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
        <div className="min-h-screen flex items-center justify-center bg-primaryBlack px-4 sm:px-6">
            <div className="max-w-6xl w-full lg:w-full lg:grid lg:grid-cols-2 shadow-lg bg-primaryGold h-[600px] rounded">
                <div className="px-10 md:px-20 py-8 flex flex-col justify-center">
                    <img src={LogoImage} alt="Logo" className="mx-auto h-32 w-auto" />
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
                    <img className="w-full h-full object-cover rounded" src="https://casabellastudios.com.au/wp-content/uploads/2023/11/800x800.jpg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
