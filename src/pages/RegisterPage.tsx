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

const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6">
            <div className="max-w-6xl w-full space-y-8 lg:w-full lg:grid lg:grid-cols-2 rounded-xl shadow-lg bg-white h-[600px]">
                <div className="px-20 py-8 flex flex-col justify-center">
                    <img src={LogoImage} alt="Logo" className="mx-auto h-32 w-auto" />
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 lg:text-left">
                        Create your account
                    </h2>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', phone: '', password: '', confirmPassword: '', email: '' }}
                        validationSchema={Yup.object({
                            firstName: Yup.string().required('Required'),
                            lastName: Yup.string().required('Required'),
                            phone: Yup.string().required('Required'),
                            password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
                            // @ts-ignore
                            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
                            email: Yup.string().email('Invalid email address').required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            setSubmitting(false);
                        }}
                    >
                        <Form className="mt-8 space-y-4">
                            <div className="flex justify-between">
                                <FormField label="First name" name="firstName" type="text" />
                                <FormField label="Last name" name="lastName" type="text" />
                            </div>
                            <div className="space-y-4">
                                {formFields.map((field) => (
                                    <FormField key={field.name} label={field.label} name={field.name} type={field.type} />
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <FormField label="Password" name="password" type="password" />
                                <FormField label="Confirm password" name="confirmPassword" type="password" />
                            </div>
                            <div>
                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700">
                                    Register
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="mt-6">
                        <Link to="/" className="text-sm text-gray-600 hover:text-gray-500">
                            Already have an account? Sign in
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

export default RegisterPage;
