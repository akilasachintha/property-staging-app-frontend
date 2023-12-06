import React, {FC, useEffect, useState} from 'react';
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {AiOutlineClose, AiOutlineDelete} from 'react-icons/ai';
import {ExpenseType, useEnquiryContext} from "../context/EnquiryContext";
import {useNavigate, useParams} from "react-router-dom";

const validationSchema = Yup.object().shape({
    rows: Yup.array().of(
        Yup.object().shape({
            expenseName: Yup.string().required('Type is required'),
            expenseCount: Yup.number().required('Count is required').min(1, 'Count must be at least 1'),
            expenseAmount: Yup.number().required('Price per Unit is required').min(1, 'Price must be at least 1'),
        })
    ),
});

const InvoiceForm: FC<{ onClose: () => void }> = ({onClose}) => {
    const [initialValues, setInitialValues] = useState<{ rows: ExpenseType[] }>({
        rows: [
            {expenseName: 'Bedroom', expenseDescription: '', expenseCount: 1, expenseAmount: 1000},
            {expenseName: 'Bathroom', expenseDescription: '', expenseCount: 1, expenseAmount: 1000},
            {expenseName: 'Kitchen', expenseDescription: '', expenseCount: 1, expenseAmount: 1000},
            {expenseName: 'Living Room', expenseDescription: '', expenseCount: 1, expenseAmount: 1000},
            {expenseName: 'Dining Room', expenseDescription: '', expenseCount: 1, expenseAmount: 1000},
        ],
    });

    const {id} = useParams();
    useNavigate();
    const {createInvoice, updateInvoice, selectedInvoiceApi, setIsEditInvoice, isEditInvoice} = useEnquiryContext();

    useEffect(() => {
        if (id && isEditInvoice && selectedInvoiceApi) {
            setInitialValues({
                rows: selectedInvoiceApi?.expenses || [],
            });
        }
    }, [selectedInvoiceApi, isEditInvoice]);

    const handleSubmit = async (values: any) => {
        console.log(values);
        console.log(isEditInvoice);
        if (isEditInvoice) {
            const result = await updateInvoice(id || "", values.rows);
            if (result) {
                onClose();
                setIsEditInvoice && setIsEditInvoice(false);
            }
        } else {
            const result = await createInvoice(id || "", values.rows);
            if (result) {
                onClose();
            }
        }
        onClose();
    };

    const handleAddRow = (push: any) => {
        push({type: '', description: '', count: 0, pricePerUnit: 0});
    };

    const handleDeleteRow = (remove: any, index: number) => {
        remove(index);
    };

    const calculateTotalPrice = (values: ExpenseType[]): number => {
        return values.reduce((total, row) => total + row.expenseCount * row.expenseAmount, 0);
    };

    const calculateAgentCommission = (totalPrice: number): number => {
        return totalPrice * 0.03;
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({values}) => (
                    <Form
                        className="bg-white p-4 rounded relative w-10/12 h-5/6 sm:w-3/4 lg:w-5/6 flex flex-col overflow-y-scroll justify-between">
                        <div>
                            <AiOutlineClose className="absolute top-2 right-2 cursor-pointer" onClick={onClose}/>
                            <div className="flex flex-row justify-between">
                                <div className="font-bold">{isEditInvoice ? 'Update' : 'Create'} Invoice Details</div>
                            </div>
                            <hr className="mt-4"/>
                            <div className="flex flex-col">
                                <div className="">
                                    <div className="">
                                        <div className="px-4 overflow-hidden border-b border-gray-200 sm:rounded">
                                            <FieldArray name="rows">
                                                {({push, remove}) => (
                                                    <div>
                                                        <div className="flex justify-end my-2">
                                                            <div
                                                                className="px-4 py-2 bg-amber-200 hover:bg-yellow-500 rounded cursor-pointer"
                                                                onClick={() => handleAddRow(push)}
                                                            >
                                                                Add Row
                                                            </div>
                                                        </div>
                                                        <div className="bg-white shadow mb-4">
                                                            <div className="bg-gray-50">
                                                                <div className="grid grid-cols-6 gap-4 p-2">
                                                                    <div
                                                                        className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type
                                                                    </div>
                                                                    <div
                                                                        className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
                                                                    </div>
                                                                    <div
                                                                        className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count
                                                                    </div>
                                                                    <div
                                                                        className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price
                                                                        per Unit (AUD)
                                                                    </div>
                                                                    <div
                                                                        className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Row
                                                                        Total (AUD)
                                                                    </div>
                                                                    <div
                                                                        className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {values.rows.map((row, index) => (
                                                                <div className="bg-white divide-y divide-gray-200"
                                                                     key={index}>
                                                                    <div className="grid grid-cols-6 gap-4 py-1 px-2">
                                                                        <div className="whitespace-nowrap">
                                                                            <Field type="text"
                                                                                   name={`rows[${index}].expenseName`}
                                                                                   className="border rounded px-2 py-1 w-full box-border"/>
                                                                            <ErrorMessage
                                                                                name={`rows[${index}].expenseName`}
                                                                                component="div"
                                                                                className="text-red-500 text-sm"/>
                                                                        </div>
                                                                        <div className="whitespace-nowrap">
                                                                            <Field
                                                                                type="text"
                                                                                name={`rows[${index}].expenseDescription`}
                                                                                className="border rounded px-2 py-1 w-full box-border"
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`rows[${index}].expenseDescription`}
                                                                                component="div"
                                                                                className="text-red-500 text-sm"/>
                                                                        </div>
                                                                        <div className="whitespace-nowrap">
                                                                            <Field
                                                                                type="number"
                                                                                name={`rows[${index}].expenseCount`}
                                                                                className="border rounded px-2 py-1 w-full box-border"
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`rows[${index}].expenseCount`}
                                                                                component="div"
                                                                                className="text-red-500 text-sm"/>
                                                                        </div>
                                                                        <div className="whitespace-nowrap">
                                                                            <Field
                                                                                type="number"
                                                                                name={`rows[${index}].expenseAmount`}
                                                                                className="border rounded px-2 py-1 w-full box-border"
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`rows[${index}].expenseAmount`}
                                                                                component="div"
                                                                                className="text-red-500 text-sm"/>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-center justify-end whitespace-nowrap">
                                                                            <p className="text-right text-sm">{row.expenseCount * row.expenseAmount}</p>
                                                                        </div>
                                                                        <div
                                                                            className="flex justify-center items-center text-sm whitespace-nowrap w-full">
                                                                            <AiOutlineDelete
                                                                                className="text-black hover:text-red-500"
                                                                                size={18}
                                                                                onClick={() => handleDeleteRow(remove, index)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>
                                        <div className="bg-white">
                                            <div className="grid grid-cols-5 gap-4 pt-2">
                                                <div className="col-span-4 text-right font-bold">Total Price:</div>
                                                <div>AUD {calculateTotalPrice(values.rows)}</div>
                                            </div>
                                            <div className="grid grid-cols-5 gap-4 pt-2">
                                                <div className="col-span-4 text-right font-bold">Agent Commission
                                                    (3%):
                                                </div>
                                                <div>AUD {calculateAgentCommission(calculateTotalPrice(values.rows))}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-1/2 px-4 py-2 mt-4 text-white bg-gray-600 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 px-4 py-2 mt-4 text-white bg-yellow-400 rounded hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
                            >
                                {isEditInvoice ? 'Update Invoice' : 'Create Invoice'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default InvoiceForm;
