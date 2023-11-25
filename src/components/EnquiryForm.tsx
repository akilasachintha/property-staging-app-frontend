import React, {FC, useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AiOutlineClose } from 'react-icons/ai';
import FormFieldBlack from "./FormFieldBlack";
import MultipleImageUpload from "components/MultipleImageUpload";
import Select from "react-select";
import useEnquiryHook from "../hooks/useEnquiryHook";
import {useLoadingContext} from "../context/LoadingContext";
import {useDashboardContext} from "../context/DashboardContext";
import {useAuthContext} from "../context/AuthContext";

interface IFormInput {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    propertyAddress: string;
    propertyImages: File[];
    specialNotes: string;
    agentDetails: string;
}

const initialValues: IFormInput = {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    propertyAddress: '',
    propertyImages: [],
    specialNotes: '',
    agentDetails: '',
};


const formFields = [
    { label: 'Client Name', name: 'clientName', type: 'text' },
    { label: 'Client Email', name: 'clientEmail', type: 'email' },
    { label: 'Client Phone', name: 'clientPhone', type: 'tel' },
    { label: 'Property Address', name: 'propertyAddress', type: 'text' },
    { label: 'Special Notes', name: 'specialNotes', type: 'text' },
];

interface InquiryFormProps {
    onClose: () => void;
}

const EnquiryForm: FC<InquiryFormProps> = ({ onClose }) => {
    const [selectBorderColor, setSelectBorderColor] = useState<string>('#9ca3af');
    const [selectUploaderBorderColor, setSelectUploaderBorderColor] = useState<string>('#9ca3af');
    const {agentsList } = useEnquiryHook();
    const {createEnquiry} = useDashboardContext();
    const {hideLoading} = useLoadingContext();
    const {userRole} = useAuthContext();

    const validationSchema = Yup.object({
        clientName: Yup.string().required('Required'),
        clientEmail: Yup.string().email('Invalid email address').required('Required'),
        clientPhone: Yup.string().required('Required'),
        propertyAddress: Yup.string().required('Required'),
        propertyImages: Yup.array().required('Required'),
        specialNotes: Yup.string().required('Required'),
        agentDetails: userRole === 'Admin' ? Yup.string().required('Required') : Yup.string(),
    });

    const agentOptions = [
        { value: '0', label: 'Not in the System - No Agent'},
        ...(agentsList && agentsList.length > 0 ? agentsList.map((agent: any) => ({ value: agent.id, label: agent.name + ' - ' + agent.email })) : [])
    ];

    const handleSubmit = async (values: IFormInput, { setSubmitting }: any) => {
        const result = await createEnquiry(
            values.clientName,
            values.clientEmail,
            values.clientPhone,
            values.propertyAddress,
            values.specialNotes,
            values.agentDetails,
            values.propertyImages
        );

        if(result){
            hideLoading();
            onClose();
        }

        setSubmitting(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, errors, touched }) => (
                    <Form className="bg-white p-4 rounded relative w-5/6 sm:w-5/6 lg:w-5/6 overflow-auto h-2/3 lg:h-5/6 flex flex-col justify-between">
                        <div>
                            <AiOutlineClose className="absolute top-2 right-2 cursor-pointer" onClick={onClose} />
                            <h2 className="mb-4 text-xl font-bold text-black">Create New Enquiry</h2>
                            <div className="flex flex-wrap -mx-2">
                                {
                                    userRole === 'Admin' && (
                                        <div className="w-full sm:w-1/2 px-2 my-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
                                            <Select
                                                options={agentOptions}
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        fontSize: '0.8rem',
                                                        fontSmooth: 'auto',
                                                        borderColor:
                                                            errors.agentDetails && touched.agentDetails
                                                                ? '#ef4444'
                                                                : selectBorderColor,
                                                    }),
                                                    option: (base, props) => ({
                                                        ...base,
                                                        fontSize: '0.8rem',
                                                        fontSmooth: 'auto',
                                                        backgroundColor: props.isSelected ? '#DFC469' : '#fff',
                                                        color: props.isSelected ? '#fff' : '#111',
                                                    }),
                                                }}
                                                onFocus={(e) => { e.target.style.borderColor = '#111' }}
                                                onBlur={(e) => { e.target.style.borderColor = '#9ca3af' }}
                                                getOptionValue={(option) => option.value}
                                                onChange={(selectedOption) => {
                                                    setFieldValue('agentDetails', selectedOption?.value).then(r => console.log(r));
                                                    if (selectedOption?.value) {
                                                        setSelectBorderColor('#22c55e'); // green
                                                    } else {
                                                        setSelectBorderColor('#ef4444'); // red
                                                    }
                                                }}
                                            />
                                        </div>
                                    )
                                }

                                {formFields.map((field, index) => (
                                    <div key={index} className="w-full sm:w-1/2 px-2 my-2">
                                        <FormFieldBlack key={field.name} label={field.label} name={field.name} type={field.type} />
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
                        <div className="flex space-x-4">
                            <button type="button" onClick={onClose} className="w-1/2 px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-700">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="w-1/2 px-4 py-2 mt-4 text-white bg-primaryGold rounded hover:bg-yellow-600">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EnquiryForm;
