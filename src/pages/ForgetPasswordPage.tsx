import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import LoginImage from 'assets/login-image.jpg';
import LogoImage from 'assets/logo.png';
import FormField from 'components/FormField';

const formFields = [
    { label: 'Email address', name: 'email', type: 'email' },
];

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6">
            <div className="max-w-6xl w-full space-y-8 lg:w-full lg:grid lg:grid-cols-2 rounded-xl shadow-lg bg-white h-[600px]">
                <div className="px-8 md:px-20 py-8 flex flex-col justify-center">
                    <img src={LogoImage} alt="Logo" className="mx-auto h-32 w-auto" />
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 lg:text-left">
                        Reset your password
                    </h2>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            setSubmitting(false);
                        }}
                    >
                        <Form className="mt-8 space-y-6">
                            <div className="space-y-4">
                                {formFields.map((field) => (
                                    <FormField key={field.name} label={field.label} name={field.name} type={field.type} />
                                ))}
                            </div>
                            <div>
                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700">
                                    Reset password
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="mt-6">
                        <Link to="/" className="text-sm text-gray-600 hover:text-gray-500">
                            Remember your password? Sign in
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

export default ForgotPasswordPage;
