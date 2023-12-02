import React, {ChangeEvent, FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {EnquiryType, useEnquiryContext} from '../context/EnquiryContext';
import {AiOutlineDelete, AiOutlineEdit, AiOutlineEye} from "react-icons/ai";

type EnquiryListProps = {
    rowsCount: number;
};

const AgentsList: FC<EnquiryListProps> = ({rowsCount}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(rowsCount);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const {enquiryList, onOpenDeleteModal} = useEnquiryContext();
    const {onOpenEnquiry, setSelectedEnquiry, getEnquiry, setIsEditEnquiry} = useEnquiryContext();

    const inquiries =
        enquiryList &&
        enquiryList.length > 0 &&
        enquiryList.map((enquiry: EnquiryType) => ({
            id: enquiry.id,
            clientName: enquiry.clientName,
            propertyAddress: enquiry.propertyAddress,
            createdDate: enquiry.createdDate,
        }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handleRowClick = (enquiry: EnquiryType) => {
        console.log("handleRowClick" + enquiry);
        navigate(`/enquiry/${enquiry.id}`);
        setSelectedEnquiry && setSelectedEnquiry(enquiry);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handlePressDelete = (enquiry: EnquiryType) => {
        setSelectedEnquiry && setSelectedEnquiry(enquiry);
        onOpenDeleteModal && enquiry && onOpenDeleteModal();
    };

    const handlePressEdit = (enquiry: EnquiryType) => {
        setIsEditEnquiry && setIsEditEnquiry(true);
        setSelectedEnquiry && setSelectedEnquiry(enquiry);
        getEnquiry && enquiry && getEnquiry(enquiry.id);
        onOpenEnquiry && enquiry && onOpenEnquiry();
    };

    const currentItems =
        inquiries &&
        inquiries.length > 0 &&
        inquiries.filter((inquiry: any) => {
            const clientNameMatch = inquiry.clientName.toLowerCase().includes(searchTerm);
            const propertyAddressMatch = inquiry.propertyAddress.toLowerCase().includes(searchTerm);
            const idMatch = inquiry.id.toLowerCase().includes(searchTerm);
            const createdDateMatch = inquiry.createdDate.toLowerCase().includes(searchTerm);

            return clientNameMatch || propertyAddressMatch || idMatch || createdDateMatch;
        }).slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    const totalItems = inquiries ? inquiries.length : 0;
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="w-full overflow-x-auto bg-white rounded shadow-lg p-4">
            <div className="flex justify-between w-full items-center mb-2">
                <h2 className="text-xl font-bold mb-2">Agents</h2>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between items-center mb-4">
                <input type="text" placeholder="Search Agents..."
                       className="border rounded px-2 py-1 w-1/4 text-sm placeholder:text-sm placeholder:pl-2"
                       value={searchTerm} onChange={handleSearchChange}/>
                <div className="text-sm text-gray-500">Total
                    records: {currentItems ? currentItems.length : 0}/{inquiries ? inquiries.length : 0}</div>
            </div>
            <div className="grid-cols-5 gap-4 text-center font-bold mb-2 hidden sm:grid">
                <div className="text-[0.9rem]">Enquiry Ref Number</div>
                <div className="text-[0.9rem]">Client Name</div>
                <div className="text-[0.9rem]">Property Address</div>
                <div className="text-[0.9rem]">Submission Date</div>
                <div className="text-[0.9rem]">Actions</div>
            </div>
            {currentItems && currentItems.length > 0 && currentItems.map((inquiry: EnquiryType, index) => (
                <div key={index}
                     className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center justify-center py-3 cursor-pointer hover:bg-yellow-100 transition-colors duration-200 items-center">
                    <div className="sm:hidden font-bold">Enquiry Ref Number:</div>
                    <div className="text-[0.8rem]"
                         onClick={() => handleRowClick(inquiry)}>{inquiry.id}</div>
                    <div className="sm:hidden font-bold">Client Name:</div>
                    <div className="text-[0.8rem] font-bold"
                         onClick={() => handleRowClick(inquiry)}>{inquiry.clientName}</div>
                    <div className="sm:hidden font-bold">Property Address:</div>
                    <div className="text-[0.8rem]"
                         onClick={() => handleRowClick(inquiry)}>{inquiry.propertyAddress}</div>
                    <div className="sm:hidden font-bold">Submission Date:</div>
                    <div className="text-[0.8rem]"
                         onClick={() => handleRowClick(inquiry)}>{inquiry.createdDate}</div>
                    <div className="sm:hidden font-bold">Actions</div>
                    <div className="flex items-center justify-center space-x-3">
                        <AiOutlineEye className="text-black hover:text-green-500" size={18} onClick={() => handleRowClick(inquiry)}/>
                        <AiOutlineEdit className="text-black hover:text-blue-500" size={18} onClick={() =>handlePressEdit(inquiry)}/>
                        <AiOutlineDelete className="text-black hover:text-red-500" size={18}
                                         onClick={() => handlePressDelete(inquiry)}/>
                    </div>
                </div>
            ))}
            <div className="flex justify-center space-x-2 mt-3">
                {pageNumbers.map(number => (
                    <button key={number}
                            className={`px-3 py-1 rounded text-sm ${number === currentPage ? 'bg-primaryGold text-primaryBlack' : 'bg-white text-primaryGold'}`}
                            onClick={() => handlePageChange(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AgentsList;
