import Breadcrumb from "../../components/baseComponents/BreadCrumb";
import {Link, useParams} from "react-router-dom";
import userPhoto from "../../assets/user.png";
import React, {useEffect} from "react";
import {MdEmail} from "react-icons/md";
import {useEnquiryContext} from "../../context/EnquiryContext";
import {IoInformationCircleOutline} from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";

export default function DashboardInvoiceDetailsPage() {
    const {id} = useParams();
    const {selectedInvoiceApi, setIsEditInvoice, selectedInvoice, getInvoice, onOpenInvoice} = useEnquiryContext();

    useEffect(() => {
        if (id) {
            getInvoice && getInvoice(id).catch((error) => console.log(error.message));
        }
    }, [id]);

    const handleEditInvoice = () => {
        setIsEditInvoice && setIsEditInvoice(true);
        getInvoice && id && getInvoice(id);
        onOpenInvoice && onOpenInvoice();
    }

    return (
        <div>
            <Breadcrumb/>
            <Link to={`/enquiry/${selectedInvoiceApi && selectedInvoiceApi.enquiryId}`}
                  className="flex flex-row gap-2 items-center bg-amber-50 px-4 py-2 mb-4 shadow-sm rounded">
                <IoInformationCircleOutline className="text-yellow-700 text-lg"/>
                <h6 className="text-sm">View Enquiry</h6>
            </Link>
            <div className="bg-white shadow-sm rounded px-4 py-4">
                <div className="flex flex-row justify-between items-center">
                    <h1>
                        <strong>Invoice:</strong> {id}
                    </h1>
                    <div className="bg-amber-200 hover:bg-yellow-500 px-4 py-2 rounded flex flex-row items-center">
                        <MdEmail/>
                        <p className="ml-2">Send Email to Agent</p>
                    </div>
                </div>
                <hr className="mt-2"/>
                <div className="flex flex-col lg:flex-row m-auto gap-4 rounded p-2 md:p-4 justify-center w-full">
                    <div className="flex justify-center items-center w-full">
                        <button className="flex flex-col items-center justify-center mb-1">
                            <img src={userPhoto} alt="User" className="h-10 w-10 rounded-full"/>
                            <span
                                className="text-gray-800 dark:text-gray-900">{selectedInvoiceApi && selectedInvoiceApi.agentName}</span>
                            <span
                                className="text-center text-xs">{selectedInvoiceApi && selectedInvoiceApi.agentEmail}</span>
                            <span className="text-gray-800 text-xs dark:text-gray-900">Agent</span>
                        </button>
                    </div>
                    <div className="w-full">
                        <h3 className="text-center font-bold mb-3">Client Details</h3>
                        <div className="grid grid-cols-2 gap-1 w-full">
                            <p className="p-2 rounded text-xs"><strong>Client Name:</strong></p>
                            <p className="p-2 rounded text-xs">{selectedInvoiceApi && selectedInvoiceApi.clientName}</p>
                            <p className="p-2 rounded text-xs"><strong>Client Email:</strong></p>
                            <p className="p-2 rounded text-xs">{selectedInvoiceApi && selectedInvoiceApi.clientEmail}</p>
                            <p className="p-2 rounded text-xs"><strong>Client Phone Number:</strong></p>
                            <p className="p-2 rounded text-xs">{selectedInvoiceApi && selectedInvoiceApi.clientPhoneNumber}</p>
                            <p className="p-2 rounded text-xs"><strong>Property Address:</strong></p>
                            <p className="p-2 rounded text-xs">{selectedInvoiceApi && selectedInvoiceApi.propertyAddress}</p>
                            <p className="p-2 rounded text-xs"><strong>Special Notes:</strong></p>
                            <p className="p-2 rounded text-xs">{selectedInvoiceApi && selectedInvoiceApi.specialNotes}</p>
                            <p className="p-2 rounded text-xs"><strong>Status:</strong></p>
                            <p className="p-2 rounded text-xs">{selectedInvoiceApi && selectedInvoiceApi.invoiceStatus}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 bg-white px-4 py-4 mb-2">
                <div>
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="font-bold text-lg">Invoice Details</h1>
                        <button type="button"
                                onClick={handleEditInvoice}
                                className="flex flex-row items-center gap-2 bg-amber-200 hover:bg-yellow-500 px-4 py-2 rounded focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2">
                            <MdEditDocument />
                            Edit Details
                        </button>
                    </div>
                    <hr className="my-2"/>
                    <div className="grid lg:grid-cols-4 grid-cols-2">
                        <div className="flex flex-col items-center">
                            <h2 className="font-bold text-sm">Invoice ID</h2>
                            <p className="text-xs">{selectedInvoiceApi && selectedInvoiceApi.id}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="font-bold text-sm">Invoice Date</h2>
                            <p className="text-xs">{selectedInvoiceApi && selectedInvoiceApi.invoiceDate}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="font-bold text-sm">Emailed Date</h2>
                            <p className="text-xs">{selectedInvoiceApi && selectedInvoiceApi.invoiceEmailedDate}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="font-bold text-sm">Status</h2>
                            <p className="text-xs">{selectedInvoiceApi && selectedInvoiceApi.invoiceStatus}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white px-4 py-2 mb-2 overflow-x-auto">
                    <hr/>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="pl-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type
                            </th>
                            <th className="py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Count
                            </th>
                            <th className="pr-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price
                                per Unit (AUD)
                            </th>
                            <th className="pr-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total
                                (AUD)
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {
                            selectedInvoiceApi && selectedInvoiceApi.expenses && selectedInvoiceApi.expenses.length > 0 && selectedInvoiceApi.expenses.map((expense, index) => (
                                <tr key={index}>
                                    <td className="pl-4 py-2 text-left text-sm whitespace-nowrap">{expense.expenseName}</td>
                                    <td className="py-2 text-center  text-sm  whitespace-nowrap">{expense.expenseCount}</td>
                                    <td className="pr-4 py-2 text-right  text-sm whitespace-nowrap">{expense.expenseAmount}</td>
                                    <td className="pr-4 py-2 text-right  text-sm whitespace-nowrap">{expense.expenseAmount * expense.expenseCount}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <div className="mt-4 mr-4">
                        <p className="text-right font-bold">Total Price:
                            AUD {selectedInvoiceApi && selectedInvoiceApi.totalPrice}</p>
                        <p className="text-right">Agent Commission (3%):
                            AUD {selectedInvoiceApi && selectedInvoiceApi.agentCommission}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}