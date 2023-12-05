import Breadcrumb from "./baseComponents/BreadCrumb";
import React, {useEffect, useState} from "react";
import FormField from "./FormField";
import {Form, Formik} from "formik";
import {Agent} from "../context/AgentContext";
import useAuthHook from "../hooks/useAuthHook";
import * as Yup from "yup";
import {useAuthContext} from "../context/AuthContext";

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
});

type AgentProfile = {
    firstName: string;
    lastName: string;
    bankAccountNumber: string;
    bsb: string;
}

export default function EditDisplayProfile() {
    const [isEdit, setIsEdit] = useState(false);
    const [initialValues, setInitialValues] = useState<AgentProfile>({
        firstName: '',
        lastName: '',
        bankAccountNumber: '',
        bsb: '',
    });

    const {getProfileHook, editProfileHook} = useAuthHook();
    const {setUserFullName, userRole} = useAuthContext();

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getProfileHook();
            if (response) {
                setInitialValues(response);
            }
        }

        fetchProfile().catch((error) => console.log(error.message));
    }, []);

    const handleSubmit = async (values: any, {setSubmitting}: any) => {
        try {
            const response = await editProfileHook(values.firstName, values.lastName, values.bankAccountNumber, values.bsb);
            console.log(response);
            if (response) {
                setIsEdit(false);
                setUserFullName(values.firstName + ' ' + values.lastName);
                localStorage.setItem('userFullName', values.firstName + ' ' + values.lastName);
            }
        } catch (error: any) {
            console.log(error.message);
        }
        setSubmitting(false);
        getProfileHook().catch((error) => console.log(error.message));
    }

    const handleEdit = () => {
        setIsEdit(!isEdit);
    }

    return (
        <div>
            <Breadcrumb/>
            <div className="bg-white shadow-sm px-3 py-4 rounded">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold text-lg">My Profile</h1>
                    <div className="bg-amber-200 px-4 py-2 rounded hover:bg-yellow-500"
                         onClick={handleEdit}>{isEdit ? "Cancel" : "Edit Profile"}</div>
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
                                <FormField label="First Name" name="firstName" type="text" disabled={!isEdit}/>
                                <FormField label="Last Name" name="lastName" type="text" disabled={!isEdit}/>
                                {
                                    userRole === 'Agent' && (
                                        <>
                                            <FormField label="Bank Account Number" name="bankAccountNumber"
                                                       type="text" disabled={!isEdit}/>
                                            <FormField label="BSB" name="bsb" type="text" disabled={!isEdit}/>
                                        </>
                                    )
                                }
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="submit"
                                        disabled={isSubmitting || !isEdit}
                                        className={`px-4 py-2 rounded w-1/3 ${isEdit ? 'bg-amber-200 rounded hover:bg-yellow-500 text-primaryBlack' : 'bg-gray-200 text-gray-500'}`}
                                >Save Changes
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}