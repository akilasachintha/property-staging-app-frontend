import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import FormField from 'components/FormField';
import Logo from "../components/Logo";
import {useLoadingContext} from "../context/LoadingContext";
import useAuthHook from "../hooks/useAuthHook";

const formFields = [
    { label: 'Email address', name: 'email', type: 'email' },
];

const initialValues = {
    email: '',
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
});

const ForgotPasswordPage: React.FC = () => {
    const {forgotPasswordHook} = useAuthHook();
    const {hideLoading} = useLoadingContext();

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        const result = await forgotPasswordHook(values.email);
        if(result){
            hideLoading();
        }

        setSubmitting(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primaryGold to-yellow-700 px-4 sm:px-6">
            <div className="max-w-6xl w-full lg:w-full lg:grid lg:grid-cols-2 shadow-lg bg-white h-[600px] rounded">
                <div className="hidden lg:block relative w-full">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                        <h2 className="text-4xl font-bold">Forgot Your Password?</h2>
                        <p className="mt-2 text-lg">No worries! Just enter your email address and we'll send you a link to reset your password.</p>
                    </div>
                    <img className="w-full h-[600px] object-cover rounded" src="https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className="px-10 md:px-20 py-8 flex flex-col justify-center">
                    <Logo />
                    <h2 className="text-center text-3xl font-extrabold text-primaryBlack">
                        Reset your password
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
                                    Reset password
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="mt-6">
                        <Link to="/" className="text-sm text-primaryBlack hover:text-gray-500">
                            Remember your password? Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
