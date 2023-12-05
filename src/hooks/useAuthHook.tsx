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
                    const { token, role, fullName } = response.data.data;
                    return login(token, role, fullName);
                }
            }
        }catch(error : any){
            console.log(error.message);
        }
    }

    const registerHook = async (firstName: string, lastName: string, email: string, password: string, phoneNumber: string, bankAccountNumber: number, bsb: number) => {
        try{
            if(axiosInstance){
                const response = await axiosInstance.post('/auth/register', {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    role: 'Agent',
                    phoneNumber: phoneNumber,
                    bankAccountNumber: bankAccountNumber.toString(),
                    bsb: bsb.toString()
                });

                if(response && response.data && response.data.data !== null){
                    showMessage('Registration successful. Please check your email to confirm your identity.', 'success');
                    navigate('/');

                    return true;
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

    const confirmEmailHook = async (id: string | undefined, token: string | undefined) => {
        try {
            if(axiosInstance){
                const query = `?id=${id}&token=${token}`;
                const response = await axiosInstance.get(`/auth/confirm${query}`);

                if(response && response.data && response.data.data !== null){
                    showMessage('Email confirmed successfully.', 'success');
                    return true;
                }

                if(response && response.data && response.data.error !== null){
                    return false;
                }
            }
        } catch (error: any) {
            showMessage('Email confirmation failed.', 'error');
            return false;
        }
    }

    const forgotPasswordHook = async (email: string) => {
        try {
            if(axiosInstance){
                const response = await axiosInstance.post('/auth/forgot', {
                    email: email
                });

                if(response && response.data && response.data.data !== null){
                    showMessage('Reset password email sent.', 'success');
                    return true;
                }

                if(response && response.data && response.data.error !== null){
                    return false;
                }
            }
        } catch (error: any) {
            showMessage('Reset password email failed.', 'error');
            return false;
        }
    }

    const resetPasswordHook = async (id: string | undefined, token: string | undefined, password: string) => {
        try {
            if(axiosInstance){
                const response = await axiosInstance.post(`/auth/reset`, {
                    id: id,
                    token: token,
                    password: password
                });

                if(response && response.data && response.data.data !== null){
                    showMessage('Password reset successfully.', 'success');
                    navigate('/');
                    return true;
                }

                if(response && response.data && response.data.error !== null){
                    return false;
                }
            }
        } catch (error: any) {
            showMessage('Password reset failed.', 'error');
            return false;
        }
    }

    const editProfileHook = async (firstName: string, lastName: string, bankAccountNumber: number, bsb: number) => {
        try {
            if (axiosInstance) {
                const response = await axiosInstance.put(`user`, {
                    firstName: firstName,
                    lastName: lastName,
                    bankAccountNumber: bankAccountNumber.toString(),
                    bsb: bsb.toString()
                });

                if (response && response.data && response.data.isSuccess) {
                    showMessage('Profile edited successfully.', 'success');
                    return true;
                }

                if (response && response.data && response.data.error !== null) {
                    return false;
                }
            }
        } catch (error: any) {
            showMessage('Profile edit failed.', 'error');
            return false;
        }
    }

    const getProfileHook = async () => {
        try {
            if (axiosInstance) {
                const response = await axiosInstance.get(`/user`);

                if (response && response.data && response.data.data !== null) {
                    return response.data.data;
                }

                if (response && response.data && response.data.error !== null) {
                    return false;
                }
            }
        } catch (error: any) {
            showMessage('Profile edit failed.', 'error');
            return false;
        }
    }

    const changePasswordHook = async (currentPassword: string, password: string, confirmPassword: string) => {
        try {
            if (axiosInstance) {
                const response = await axiosInstance.post(`/auth/change`, {
                    oldPassword: currentPassword,
                    newPassword: password,
                });

                if (response && response.data && response.data.isSuccess) {
                    showMessage('Password changed successfully.', 'success');
                    return true;
                }

                if (response && response.data && response.data.error !== null) {
                    return false;
                }
            }
        } catch (error: any) {
            showMessage('Password change failed.', 'error');
            return false;
        }
    }

    return {loginHook, logoutHook, registerHook, confirmEmailHook, forgotPasswordHook, resetPasswordHook, getProfileHook, editProfileHook, changePasswordHook};
}