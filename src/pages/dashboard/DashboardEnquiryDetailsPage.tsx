import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import Carousel from "../../components/Carousel";
import Button from "../../components/Button";
import userPhoto from "../../assets/user.png";
import image from "assets/no-image.gif";
import Breadcrumb from "../../components/baseComponents/BreadCrumb";
import {useEnquiryContext} from "../../context/EnquiryContext";

interface PropertyImage {
    imageUri: string;
}

export default function DashboardEnquiryDetailsPage(){
    const {id} = useParams();
    const {onOpenEnquiry, onOpenInvoice, setIsEditEnquiry, setSelectedEnquiry, getEnquiry, selectedEnquiryApi} = useEnquiryContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getEnquiry && getEnquiry(id).catch((error) => console.log(error.message));
        }
    }, [id]);

    const handleEditButton = () => {
        setIsEditEnquiry && setIsEditEnquiry(true);
        getEnquiry && id && getEnquiry(id);
        onOpenEnquiry && onOpenEnquiry();
        setSelectedEnquiry && setSelectedEnquiry({
            id: id || '',
            clientName: '',
            propertyAddress: '',
            createdDate: ""
        });
    }

    const handleViewInvoicesButton = () => {
        navigate(`/enquiry/${id}/invoice`);
    }

    const handleInvoiceButton = () => {
        onOpenInvoice && onOpenInvoice();
    }

    return (
        <div>
            <Breadcrumb/>
            <div className="bg-white rounded mx-auto shadow-sm flex flex-col p-4">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 flex-grow items-center">
                    {
                        selectedEnquiryApi && selectedEnquiryApi.propertyImages && selectedEnquiryApi.propertyImages.length > 0 ? (
                            <div className="col-span-1">
                                <Carousel images={selectedEnquiryApi.propertyImages.map((image: PropertyImage) => image.imageUri)}/>
                            </div>
                        ) : (
                            <div className="col-span-1">
                                <Carousel images={[image]}/>
                            </div>
                        )
                    }
                    <hr/>
                    <div className="flex justify-end gap-4">
                        <Button onClick={handleInvoiceButton}>Create Invoice</Button>
                        <Button onClick={handleViewInvoicesButton}>Invoices History</Button>
                        <Button onClick={handleEditButton}>Edit Enquiry</Button>
                    </div>
                    <hr/>
                    <div className="flex flex-col lg:flex-row m-auto gap-4 rounded p-2 md:p-4 justify-center w-full">
                        <div className="flex justify-center items-center w-full">
                            <button className="flex flex-col items-center justify-center mb-1">
                                <img src={userPhoto} alt="User" className="h-10 w-10 rounded-full" />
                                <span
                                    className="text-gray-800 dark:text-gray-900">{selectedEnquiryApi && selectedEnquiryApi.agentName}</span>
                                <span
                                    className="text-center text-xs">{selectedEnquiryApi && selectedEnquiryApi.agentEmail}</span>
                                <span className="text-gray-800 text-xs dark:text-gray-900">Agent</span>
                            </button>
                        </div>
                        <div className="w-full">
                            <h3 className="text-center font-bold mb-3">Client Details</h3>
                            <div className="grid grid-cols-2 gap-1 w-full">
                                <p className="p-2 rounded text-xs"><strong>Client Name:</strong></p>
                                <p className="p-2 rounded text-xs">{selectedEnquiryApi && selectedEnquiryApi.clientName}</p>
                                <p className="p-2 rounded text-xs"><strong>Client Email:</strong></p>
                                <p className="p-2 rounded text-xs">{selectedEnquiryApi && selectedEnquiryApi.clientEmail}</p>
                                <p className="p-2 rounded text-xs"><strong>Client Phone Number:</strong></p>
                                <p className="p-2 rounded text-xs">{selectedEnquiryApi && selectedEnquiryApi.clientPhoneNumber}</p>
                                <p className="p-2 rounded text-xs"><strong>Property Address:</strong></p>
                                <p className="p-2 rounded text-xs">{selectedEnquiryApi && selectedEnquiryApi.propertyAddress}</p>
                                <p className="p-2 rounded text-xs"><strong>Special Notes:</strong></p>
                                <p className="p-2 rounded text-xs">{selectedEnquiryApi && selectedEnquiryApi.specialNotes}</p>
                                <p className="p-2 rounded text-xs"><strong>Status:</strong></p>
                                <p className="p-2 rounded text-xs">{selectedEnquiryApi && selectedEnquiryApi.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
