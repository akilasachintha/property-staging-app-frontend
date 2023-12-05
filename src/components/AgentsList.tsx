import React, {ChangeEvent, FC, useState} from 'react';
import {Agent, useAgentContext} from "../context/AgentContext";

type EnquiryListProps = {
    rowsCount: number;
};

const AgentsList: FC<EnquiryListProps> = ({rowsCount}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(rowsCount);
    const [searchTerm, setSearchTerm] = useState('');
    const {agentsList} = useAgentContext();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const currentItems =
        agentsList &&
        agentsList.length > 0 &&
        agentsList.filter((agent: any) => {
            const clientNameMatch = agent && agent.firstName.toLowerCase().includes(searchTerm);
            const propertyAddressMatch = agent && agent.lastName.toLowerCase().includes(searchTerm);
            const idMatch = agent && agent.id.toLowerCase().includes(searchTerm);
            const createdDateMatch = agent && agent.email.toLowerCase().includes(searchTerm);

            return clientNameMatch || propertyAddressMatch || idMatch || createdDateMatch;
        }).slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    const totalItems = agentsList ? agentsList.length : 0;
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
                    records: {currentItems ? currentItems.length : 0}/{agentsList ? agentsList.length : 0}</div>
            </div>
            <div className="grid-cols-5 gap-4 text-center font-bold mb-2 hidden sm:grid">
                <div className="text-[0.9rem]">Agent ID</div>
                <div className="text-[0.9rem]">Name</div>
                <div className="text-[0.9rem]">Bank Account No</div>
                <div className="text-[0.9rem]">BSB</div>
                <div className="text-[0.9rem]">Email</div>
            </div>
            {currentItems && currentItems.length > 0 && currentItems.map((agent: Agent, index) => (
                <div key={index}
                     className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center justify-center py-3 cursor-pointer hover:bg-yellow-100 transition-colors duration-200 items-center">
                    <div className="sm:hidden font-bold">Agent ID:</div>
                    <div className="text-[0.8rem]">{agent.id}</div>
                    <div className="sm:hidden font-bold">Name:</div>
                    <div className="text-[0.8rem] font-bold">{agent.firstName + " " + agent.lastName}</div>
                    <div className="sm:hidden font-bold">Email:</div>
                    <div className="text-[0.8rem]">{agent.email}</div>
                    <div className="sm:hidden font-bold">Bank Account No:</div>
                    <div className="text-[0.8rem]">{agent.bankAccountNumber}</div>
                    <div className="sm:hidden font-bold">BSB</div>
                    <div className="text-[0.8rem]">{agent.bsb}</div>
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
