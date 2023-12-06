import Breadcrumb from "../../components/baseComponents/BreadCrumb";
import EnquiryInvoiceList from "../../components/EnquiryInvoicesList";

export default function DashboardEnquiryInvoicePage() {
    return (
        <div>
            <Breadcrumb/>
            <EnquiryInvoiceList rowsCount={7}/>
        </div>
    );
}