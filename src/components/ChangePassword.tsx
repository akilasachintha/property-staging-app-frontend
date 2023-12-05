import React from "react";
import FormField from "./FormField";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import useAuthHook from "../hooks/useAuthHook";


const validationSchema = Yup.object({
    currentPassword: Yup.string()
        .required('Current password is required'),
    password: Yup.string()
        .required('New password is required'),
    confirmPassword: Yup.string()
        .required('Please confirm your new password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});

type ChangePassword = {
    currentPassword: string;
    password: string;
    confirmPassword: string;
}

const initialValues: ChangePassword = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
}

export default function ChangePassword() {
    const {changePasswordHook} = useAuthHook();
    const handleSubmit = async (values: any, {setSubmitting}: any) => {
        try {
            const response = await changePasswordHook(
                values.currentPassword,
                values.password,
                values.confirmPassword);
            console.log(response);
            if (response) {
            }
        } catch (error: any) {
            console.log(error.message);
        }
        setSubmitting(false);
    }

    return (
        <div>
            <div className="bg-white my-4 shadow-sm px-3 py-4 rounded">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold text-lg">Change Password</h1>
                </div>
                <hr className="my-2"/>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                                <FormField label="Current Password" name="currentPassword" type="password"/>
                                <FormField label="New Password" name="password" type="password"/>
                                <FormField label="Confirm Password" name="confirmPassword" type="password"/>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="submit"
                                        disabled={isSubmitting}
                                        className={`px-4 py-2 w-1/3 bg-amber-200 rounded hover:bg-yellow-500 text-primaryBlack`}
                                >Change Password
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}