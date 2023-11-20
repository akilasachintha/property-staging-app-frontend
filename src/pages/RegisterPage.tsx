import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import LoginImage from 'assets/login-image.jpg';
import FormField from 'components/FormField';
import useAuthHook from "hooks/useAuthHook";
import {useLoadingContext} from "context/LoadingContext";
import Logo from "components/Logo";

const formFields = [
    { label: 'Email address', name: 'email', type: 'email' },
    { label: 'Phone No', name: 'phone', type: 'text' },
];

const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    email: ''
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string().min(5, 'Must be 8 characters or more').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
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
        <div className="min-h-screen flex items-center justify-center bg-primaryBlack px-4 sm:px-6">
            <div className="max-w-6xl w-full lg:w-full lg:grid lg:grid-cols-2 shadow-lg bg-primaryGold h-[600px] rounded">
                <div className="px-20 py-8 flex flex-col justify-center">
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
                            <div>
                                <button type="submit" className="group relative rounded w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-primaryBlack hover:bg-gray-900">
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
                    <img className="absolute inset-0 h-full w-full object-cover rounded" src={LoginImage} alt="" />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
