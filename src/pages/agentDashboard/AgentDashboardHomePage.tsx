import {useToastContext} from "../../context/ToastContext";

export default function AdminDashboardHomePage() {
    const {showMessage} = useToastContext();

    return (
        <div className="flex justify-between items-center">
            <button className="bg-primaryGold text-primaryBlack py-2 px-4 rounded" onClick={() => showMessage('Created Done', 'success')}>
                Create Inquiry
            </button>
        </div>
    )
}
