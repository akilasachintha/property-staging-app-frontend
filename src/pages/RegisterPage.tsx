import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import FormField from 'components/FormField';
import useAuthHook from "hooks/useAuthHook";
import {useLoadingContext} from "context/LoadingContext";
import Logo from "components/Logo";

const formFields = [
    { label: 'Email address', name: 'email', type: 'email' },
    { label: 'Phone No', name: 'phone', type: 'number' },
];

const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    email: '',
    bankAccountNumber: '',
    bsb: '',
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phone: Yup.number().required('Required'),
    password: Yup.string().min(5, 'Must be 8 characters or more').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    bankAccountNumber: Yup.number().required('Required'),
    bsb: Yup.string().required('Required'),
});

const RegisterPage: React.FC = () => {
    const { registerHook } = useAuthHook();
    const {hideLoading} = useLoadingContext();

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        console.log(values);
        const result = await registerHook(values.firstName, values.lastName, values.email, values.password, values.phone);
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
                        Create your account
                    </h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="mt-4 space-y-4">
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
                            <div className="flex justify-between">
                                <FormField label="Bank Account Number" name="bankAccountNumber" type="number" />
                                <FormField label="BSB" name="bsb" type="text" />
                            </div>
                            <div>
                                <button type="submit" className="group relative rounded w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-primaryBlack hover:bg-gray-800">
                                    Register
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="mt-6">
                        <Link to="/" className="text-sm text-primaryBlack hover:text-gray-500">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block relative w-full">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                        <h2 className="text-4xl font-bold">Welcome!</h2>
                        <p className="mt-2 text-lg">We're glad to have you back. Please sign in to continue.</p>
                    </div>
                    <img className="h-[600px] w-full object-cover rounded" src="https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
