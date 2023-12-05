import Breadcrumb from "../../components/baseComponents/BreadCrumb";
import InvoicesList from "../../components/InvoicesList";
import EnquiryInvoiceList from "../../components/EnquiryInvoicesList";

export default function DashboardEnquiryInvoicePage() {
    return (
        <div>
            <Breadcrumb/>
            <EnquiryInvoiceList rowsCount={7}/>
        </div>
    );
}