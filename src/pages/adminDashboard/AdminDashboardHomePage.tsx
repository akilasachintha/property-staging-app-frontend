import { FC, useState, ChangeEvent } from 'react';
import { FaUserTie, FaRegQuestionCircle, FaFileInvoice, FaCheckCircle } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface IData {
    icon: IconType;
    title: string;
    count: number;
}

interface IInquiry {
    refNumber: string;
    clientName: string;
    propertyInfo: string;
    submissionDate: string;
}

const AdminDashboardHomePage: FC = () => {
    const navigate = useNavigate();
    const data: IData[] = [
        { icon: FaUserTie, title: 'Agents', count: 10 },
        { icon: FaRegQuestionCircle, title: 'Inquiries', count: 20 },
        { icon: FaFileInvoice, title: 'Invoices', count: 30 },
        { icon: FaCheckCircle, title: 'Completed Inquiries', count: 40 },
    ];

    const inquiries: IInquiry[] = [
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
        { refNumber: '123', clientName: 'John Doe', propertyInfo: '123 Main St', submissionDate: '2023-11-20' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, ] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = inquiries.filter(inquiry => inquiry.clientName.includes(searchTerm)).slice(indexOfFirstItem, indexOfLastItem);

    const handleRowClick = (refNumber: string) => {
        navigate(`/inquiry/${refNumber}`);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(inquiries.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-end w-full">
                <button className="bg-primaryGold text-primaryBlack py-2 px-4 rounded hover:bg-yellow-600 hover:text-primaryBlack transition-colors duration-200">
                    Create Inquiry
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {data.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={index} className="flex flex-col items-center bg-white text-primaryBlack p-4 rounded shadow-lg hover:bg-gray-50 transition-colors duration-200">
                            <IconComponent className="text-primaryGold text-4xl mb-2" />
                            <span className="text-xl mb-1">{item.title}</span>
                            <span className="text-2xl">{item.count}</span>
                        </div>
                    );
                })}
            </div>
            <div className="w-full overflow-x-auto bg-white rounded shadow-lg p-4">
                <h2 className="text-2xl font-bold mb-4">Inquiries</h2>
                <div className="flex justify-between items-center mb-4">
                    <input type="text" placeholder="Search inquiries..." className="border rounded px-2 py-1 w-1/4 text-sm placeholder:text-sm placeholder:pl-2" value={searchTerm} onChange={handleSearchChange} />
                    <div className="text-sm text-gray-500">Total records: {currentItems.length}/{inquiries.length}</div>
                </div>
                <hr className="mb-2" />
                <div className="grid-cols-4 gap-4 text-center font-bold mb-2 hidden sm:grid">
                    <div>Enquiry Ref Number</div>
                    <div>Client Name</div>
                    <div>Property Information</div>
                    <div>Submission Date</div>
                </div>
                {currentItems.map((inquiry, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center border-t py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => handleRowClick(inquiry.refNumber)}>
                        <div className="sm:hidden font-bold">Enquiry Ref Number:</div>
                        <div>{inquiry.refNumber}</div>
                        <div className="sm:hidden font-bold">Client Name:</div>
                        <div>{inquiry.clientName}</div>
                        <div className="sm:hidden font-bold">Property Information:</div>
                        <div>{inquiry.propertyInfo}</div>
                        <div className="sm:hidden font-bold">Submission Date:</div>
                        <div>{inquiry.submissionDate}</div>
                    </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-center space-x-2">
                    {pageNumbers.map(number => (
                        <button key={number} className={`px-3 py-1 rounded text-sm ${number === currentPage ? 'bg-primaryGold text-primaryBlack' : 'bg-white text-primaryGold'}`} onClick={() => handlePageChange(number)}>
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardHomePage;
