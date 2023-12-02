import {AiOutlineDelete, AiOutlineEdit, AiOutlineEye} from "react-icons/ai";
import React from "react";

export type EnquiryListItemProps = {
    createdDate: string;
    clientName: string;
    propertyAddress: string;
    id: string
}

export default function EnquiryListItem(
    index: number, handleRowClick: (id: string) => void,
    inquiry: EnquiryListItemProps,
    handleDelete: (id: string) => void) {
    return (
        <div key={index}
             className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center justify-center py-3 cursor-pointer hover:bg-primaryGold transition-colors duration-200 items-center">
            <div className="sm:hidden font-bold">Enquiry Ref Number:</div>
            <div className="text-[0.8rem]" onClick={() => handleRowClick(inquiry && inquiry.id)}>{inquiry.id}</div>
            <div className="sm:hidden font-bold">Client Name:</div>
            <div className="text-[0.8rem] font-bold"
                 onClick={() => handleRowClick(inquiry && inquiry.id)}>{inquiry.clientName}</div>
            <div className="sm:hidden font-bold">Property Address:</div>
            <div className="text-[0.8rem]"
                 onClick={() => handleRowClick(inquiry && inquiry.id)}>{inquiry.propertyAddress}</div>
            <div className="sm:hidden font-bold">Submission Date:</div>
            <div className="text-[0.8rem]"
                 onClick={() => handleRowClick(inquiry && inquiry.id)}>{inquiry.createdDate}</div>
            <div className="sm:hidden font-bold">Actions</div>
            <div className="flex items-center justify-center space-x-3">
                <AiOutlineEye className="text-black hover:text-green-500" size={18}/>
                <AiOutlineEdit className="text-black hover:text-blue-500" size={18}/>
                <AiOutlineDelete className="text-black hover:text-red-500" size={18}
                                 onClick={() => handleDelete(inquiry.id)}/>
            </div>
        </div>
    );
}