import {useParams} from "react-router-dom";
import React, { useEffect } from "react";
import useDashboardHook from "../../hooks/useDashboardHook";
import Carousel from "../../components/Carousel";
import Button from "../../components/Button";
import userPhoto from "../../assets/user.png";
import image from "assets/no-image.gif";
import Breadcrumb from "../../components/BreadCrumb";

interface PropertyImage {
    imageUri: string;
}

export default function DashboardEnquiryDetailsPage(){
    const {id} = useParams();
    const {enquiryDetails, getEnquiryDetails} = useDashboardHook();

    useEffect(() => {
        if (id) {
            getEnquiryDetails(id).catch((error) => console.log(error.message));
        }
    }, [id]);

    return (
        <div>
            <Breadcrumb/>
            <div className="bg-white rounded mx-auto shadow-sm flex flex-col p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow items-center">
                    {
                        enquiryDetails.propertyImages && enquiryDetails.propertyImages.length > 0 ? (
                            <div className="col-span-1">
                                <Carousel images={enquiryDetails.propertyImages.map((image: PropertyImage) => image.imageUri)}/>
                            </div>
                        ) : (
                            <div className="col-span-1">
                                <Carousel images={[image]}/>
                            </div>
                        )
                    }
                    <div className="flex flex-col m-auto gap-4 rounded p-2 md:p-4 justify-center">
                        <button className="flex flex-col items-center justify-center mb-5">
                            <img src={userPhoto} alt="User" className="h-10 w-10 rounded-full" />
                            <span className="text-gray-800 dark:text-gray-900">Akila Sachintha</span>
                            <span className="text-center text-xs">akilasachintha@gmail.com</span>
                        </button>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <p className="p-2 rounded"><strong>Client Name:</strong></p>
                            <p className="p-2 rounded">{enquiryDetails.clientName}</p>
                            <p className="p-2 rounded"><strong>Client Email:</strong></p>
                            <p className="p-2 rounded">{enquiryDetails.clientEmail}</p>
                            <p className="p-2 rounded"><strong>Client Phone Number:</strong></p>
                            <p className="p-2 rounded">{enquiryDetails.clientPhoneNumber}</p>
                            <p className="p-2 rounded"><strong>Property Address:</strong></p>
                            <p className="p-2 rounded">{enquiryDetails.propertyAddress}</p>
                            <p className="p-2 rounded"><strong>Special Notes:</strong></p>
                            <p className="p-2 rounded">{enquiryDetails.specialNotes}</p>
                            <p className="p-2 rounded"><strong>Status:</strong></p>
                            <p className="p-2 rounded">{enquiryDetails.status}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-end gap-4">
                    <Button>Create Invoice</Button>
                    <Button>Reject</Button>
                </div>
            </div>
        </div>
    );
}
