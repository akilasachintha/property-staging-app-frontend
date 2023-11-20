import {useToastContext} from "context/ToastContext";
import {useAuthContext} from "context/AuthContext";
import {useAxiosContext} from "context/AxiosContext";
import {useNavigate} from "react-router-dom";
import {useLoadingContext} from "context/LoadingContext";

export default function useAuthHook(){
    const {showMessage} = useToastContext();
    const {login, logout} = useAuthContext();
    const {showLoading, hideLoading} = useLoadingContext();
    const axiosInstance = useAxiosContext();
    const navigate = useNavigate();

    const loginHook = async (email: string, password: string) => {
        try{
            if(axiosInstance){
                const response = await axiosInstance.post('/auth/login', {
                    email: email,
                    password: password
                })

                if(response && response.data && response.data.data !== null){
                    showMessage('Login Success', 'success');
                    return login(response.data.data.token, response.data.data.role);
                }
            }
        }catch(error : any){
            console.log(error.message);
        }
    }

    const logoutHook = () => {
        showLoading();

        setTimeout(() => {
            hideLoading();
            showMessage('Successfully Logged Out.', 'success');

            logout();
            navigate('/');
        }, 2000);
    }

    return {loginHook, logoutHook};
}