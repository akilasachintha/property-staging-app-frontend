import Breadcrumb from "../../components/baseComponents/BreadCrumb";
import InvoicesList from "../../components/InvoicesList";

export default function DashboardInvoicePage() {
    return (
        <div>
            <Breadcrumb/>
            <InvoicesList rowsCount={10}/>
        </div>
    );
}