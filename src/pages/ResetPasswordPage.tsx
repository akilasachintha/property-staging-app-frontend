import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Link, useLocation} from 'react-router-dom';
import FormField from 'components/FormField';
import useAuthHook from "hooks/useAuthHook";
import {useLoadingContext} from "context/LoadingContext";
import Logo from "../components/Logo";

const formFields = [
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
];

const validationSchema = Yup.object({
    password: Yup.string().min(5, 'Must be 8 characters or more').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Required'),
});

const initialValues = {
    password: '',
    confirmPassword: '',
}

const ResetPasswordPage: React.FC = () => {
    const { resetPasswordHook } = useAuthHook();
    const {hideLoading} = useLoadingContext();

    const location = useLocation();
    let searchParams = new URLSearchParams(location.search);
    let id = searchParams.get('id');
    let token = searchParams.get('token');

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        if(id && token){
            const result = await resetPasswordHook(id, token, values.password);
            if(result){
                hideLoading();
            }
        }

        setSubmitting(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primaryGold to-yellow-700 px-4 sm:px-6">
            <div className="max-w-6xl w-full lg:w-full lg:grid lg:grid-cols-2 shadow-lg bg-white h-[600px] rounded">
                <div className="px-10 md:px-20 py-8 flex flex-col justify-center">
                    <Logo />
                    <h2 className="text-center text-3xl font-extrabold text-primaryBlack">
                        Reset your Password
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
                                    Confirm Password Reset
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="mt-6">
                        <Link to="/" className="text-sm text-primaryBlack hover:text-gray-500">
                            Remembered your password? Log In
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block relative w-full">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                        <h2 className="text-4xl font-bold">Almost There!</h2>
                        <p className="mt-2 text-lg">Reset your password to continue to your account.</p>
                    </div>
                    <img className="w-full h-full object-cover rounded" src="https://img.freepik.com/free-photo/living-room-with-blue-sofa-gold-coffee-table_123827-23877.jpg?w=996&t=st=1700729089~exp=1700729689~hmac=f323329cd44ce89a215ec81afb28f74548c1f0daa426168441166f6b57cf8804" alt="" />
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
