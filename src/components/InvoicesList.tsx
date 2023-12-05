import React, {ChangeEvent, FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {InvoiceType, useEnquiryContext} from '../context/EnquiryContext';
import {AiOutlineDelete, AiOutlineEye} from "react-icons/ai";
import {useLoadingContext} from "../context/LoadingContext";

type EnquiryListProps = {
    rowsCount: number;
};

const InvoiceList: FC<EnquiryListProps> = ({rowsCount}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(rowsCount);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const {invoiceList, onOpenDeleteModal} = useEnquiryContext();
    const {setSelectedInvoice, setIsEditEnquiry} = useEnquiryContext();
    const {showLoading, hideLoading} = useLoadingContext();

    const enquiries =
        invoiceList &&
        invoiceList.length > 0 &&
        invoiceList.map((invoice: InvoiceType) => ({
            id: invoice.id,
            agentName: invoice.agentName,
            agentEmail: invoice.agentEmail,
            invoiceStatus: invoice.invoiceStatus,
            invoiceDate: invoice.invoiceDate,
        }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handleRowClick = (invoice: InvoiceType) => {
        navigate(`/invoice/${invoice.id}`);
        setSelectedInvoice && setSelectedInvoice(invoice);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const currentItems =
        enquiries &&
        enquiries.length > 0 &&
        enquiries.filter((invoice: InvoiceType) => {
            const agentNameMatch = invoice.agentName.toLowerCase().includes(searchTerm);
            const agentEmailMatch = invoice.agentEmail.toLowerCase().includes(searchTerm);
            const idMatch = invoice.id.toLowerCase().includes(searchTerm);
            const invoiceDateMatch = invoice.invoiceDate.toLowerCase().includes(searchTerm);

            return agentNameMatch || agentEmailMatch || idMatch || invoiceDateMatch;
        }).slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    const totalItems = enquiries ? enquiries.length : 0;
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (!invoiceList || invoiceList.length <= 0) {
        showLoading && showLoading();
        return null;
    }

    return (
        <div className="w-full overflow-x-auto bg-white rounded shadow-lg p-4">
            <div className="flex justify-between w-full items-center mb-2">
                <h2 className="text-xl font-bold mb-2">Invoices</h2>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between items-center mb-4">
                <input type="text" placeholder="Search Enquiries..."
                       className="border rounded px-2 py-1 w-1/4 text-sm placeholder:text-sm placeholder:pl-2"
                       value={searchTerm} onChange={handleSearchChange}/>
                <div className="text-sm text-gray-500">Total
                    records: {currentItems ? currentItems.length : 0}/{enquiries ? enquiries.length : 0}</div>
            </div>
            <div className="grid-cols-6 gap-4 text-center font-bold mb-2 hidden sm:grid">
                <div className="text-[0.9rem]">Invoice No</div>
                <div className="text-[0.9rem]">Agent Name</div>
                <div className="text-[0.9rem]">Agent Email</div>
                <div className="text-[0.9rem]">Invoice Date</div>
                <div className="text-[0.9rem]">Status</div>
                <div className="text-[0.9rem]">Actions</div>
            </div>
            {
                !currentItems && (
                    <div className="flex justify-center items-center text-gray-500 text-sm mt-10">
                        No records found.
                    </div>
                )
            }
            {currentItems && currentItems.length > 0 && currentItems.map((invoice: InvoiceType, index) => (
                <div key={index}
                     className="grid grid-cols-1 sm:grid-cols-6 gap-4 text-center justify-center py-3 cursor-pointer hover:bg-yellow-100 transition-colors duration-200 items-center">
                    <div className="sm:hidden font-bold">Invoice No:</div>
                    <div className="text-[0.8rem]"
                         onClick={() => handleRowClick(invoice)}>{invoice.id}</div>
                    <div className="sm:hidden font-bold">Agent Name:</div>
                    <div className="text-[0.8rem] font-bold"
                         onClick={() => handleRowClick(invoice)}>{invoice.agentName}</div>
                    <div className="sm:hidden font-bold">Agent Email:</div>
                    <div className="text-[0.8rem]"
                         onClick={() => handleRowClick(invoice)}>{invoice.agentEmail}</div>
                    <div className="sm:hidden font-bold">Invoice Date:</div>
                    <div className="text-[0.8rem]"
                         onClick={() => handleRowClick(invoice)}>{invoice.invoiceDate}</div>
                    <div className="sm:hidden font-bold">Status:</div>
                    <div className="text-[0.8rem]"
                         onClick={() => handleRowClick(invoice)}>
                        <span className="bg-green-100 px-4 py-1 rounded text-xs">
                            {invoice.invoiceStatus}
                        </span>
                    </div>
                    <div className="sm:hidden font-bold">Actions</div>
                    <div className="flex items-center justify-center space-x-3">
                        <AiOutlineEye className="text-black hover:text-green-500" size={18}
                                      onClick={() => handleRowClick(invoice)}/>
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

export default InvoiceList;
