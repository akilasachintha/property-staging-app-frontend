import React, {FC, useEffect, useState} from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {AiOutlineClose} from 'react-icons/ai';
import FormFieldBlack from "./FormFieldBlack";
import {useLoadingContext} from "context/LoadingContext";
import {useEnquiryContext} from "context/EnquiryContext";
import {useAuthContext} from "context/AuthContext";
import Dropdown from "./Dropdown";
import MultipleImageUpload from "./MultipleImageUpload";
import {useAgentContext} from "../context/AgentContext";

interface IFormInput {
    clientName: string;
    clientEmail: string;
    clientPhoneNumber: string;
    propertyAddress: string;
    propertyImages: any[];
    specialNotes: string;
    agentId: string;
}

const formFields = [
    { label: 'Client Name', name: 'clientName', type: 'text' },
    { label: 'Client Email', name: 'clientEmail', type: 'email' },
    { label: 'Client Phone', name: 'clientPhoneNumber', type: 'number'},
    { label: 'Property Address', name: 'propertyAddress', type: 'text' },
    { label: 'Special Notes', name: 'specialNotes', type: 'text' },
];
interface InquiryFormProps {
    onClose: () => void;
}

const EnquiryForm: FC<InquiryFormProps> = ({ onClose }) => {
    const [initialValues, setInitialValues] = useState<IFormInput>({
        clientName: '',
        clientEmail: '',
        clientPhoneNumber: '',
        propertyAddress: '',
        propertyImages: [],
        specialNotes: '',
        agentId: '',
    });
    const {agentsList} = useAgentContext();
    const {createEnquiry, updateEnquiry, isEditEnquiry, selectedEnquiryApi} = useEnquiryContext();
    const [selectUploaderBorderColor, setSelectUploaderBorderColor] = useState<string>('#9ca3af');
    const {isLoading, showLoading, hideLoading} = useLoadingContext();
    const {userRole} = useAuthContext();

    useEffect(() => {
        if (selectedEnquiryApi && isEditEnquiry) {
            const {
                clientName = '',
                clientEmail = '',
                clientPhoneNumber = '',
                propertyAddress = '',
                propertyImages = [],
                specialNotes = '',
                agentId = '',
            } = selectedEnquiryApi;

            setInitialValues({
                clientName,
                clientEmail,
                clientPhoneNumber,
                propertyAddress,
                propertyImages,
                specialNotes,
                agentId
            });
        }
    }, [selectedEnquiryApi, isEditEnquiry]);

    const validationSchema = Yup.object({
        clientName: Yup.string().required('Required'),
        clientEmail: Yup.string().email('Invalid email address').required('Required'),
        clientPhoneNumber: Yup.string().required('Required'),
        propertyAddress: Yup.string().required('Required'),
        propertyImages: Yup.array().required('Required'),
        specialNotes: Yup.string().required('Required'),
        agentId: userRole === 'Admin' ? Yup.string().required('Required') : Yup.string(),
    });

    const agentOptions = [
        {value: '5bf4548b-a9fc-4c95-9dc0-1d3beb3598b8', label: 'Not in the System - No Agent'},
        ...(agentsList && agentsList.length > 0 ? agentsList.map((agent: any) => ({value: agent.id, label: (agent.firstName + ' ' + agent.lastName) + ' - ' + agent.email})) : [])
    ];

    const handleSubmit = async (values: IFormInput, { setSubmitting }: any) => {
        if (!isEditEnquiry) {
            const result = await createEnquiry(
                values.clientName,
                values.clientEmail,
                values.clientPhoneNumber,
                values.propertyAddress,
                values.specialNotes,
                values.agentId,
                values.propertyImages
            );

            if (result) {
                hideLoading();
                onClose();
            }
        } else {
            const result = await updateEnquiry(
                values.clientName,
                values.clientEmail,
                values.clientPhoneNumber,
                values.propertyAddress,
                values.specialNotes,
                values.agentId,
                values.propertyImages,
            );

            if (result) {
                hideLoading();
                onClose();
            }

            setSubmitting(false);
        }

        setSubmitting(false);
    };


    if (isLoading) {
        showLoading();
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ isSubmitting, setFieldValue}) => (
                    <Form
                        className="bg-white p-4 rounded relative w-10/12 h-5/6 sm:w-3/4 lg:w-5/6 flex flex-col justify-between overflow-y-scroll">
                        <div>
                            <AiOutlineClose className="absolute top-2 right-2 cursor-pointer" onClick={onClose} />
                            <h2 className="mb-4 text-xl font-bold text-black">{isEditEnquiry ? 'Change Enquiry' : 'Create Enquiry'}</h2>
                            <div className="flex flex-row justify-between">
                                <div className="font-bold">Client Details</div>
                            </div>
                            <div className="flex flex-col lg:flex-row">
                                <div className="flex flex-wrap">
                                    {
                                        userRole === 'Admin' && (
                                            <div className="w-full sm:w-1/2 px-2 my-2">
                                                <Dropdown options={agentOptions} label="Agent" name="agentId" />
                                            </div>
                                        )
                                    }

                                    {formFields.map((field, index) => (
                                        <div key={index} className="w-full sm:w-1/2 px-2 my-2">
                                            <FormFieldBlack key={field.name} label={field.label} name={field.name}
                                                            type={field.type}/>
                                        </div>
                                    ))}
                                    <div className="w-full px-2 my-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Property Images</label>
                                        <MultipleImageUpload borderColor={selectUploaderBorderColor} onDrop={(files: File[]) => {
                                            setFieldValue('propertyImages', files).catch((err) => console.log(err));
                                            if (files.length > 0) {
                                                setSelectUploaderBorderColor('#22c55e'); // green
                                            } else {
                                                setSelectUploaderBorderColor('#ef4444'); // red
                                            }
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button type="button" onClick={onClose} className="w-1/2 px-4 py-2 mt-4 text-white bg-gray-600 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-700 focus:ring-offset-2">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="w-1/2 px-4 py-2 mt-4 text-white bg-yellow-400 rounded hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EnquiryForm;
