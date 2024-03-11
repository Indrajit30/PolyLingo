import { useDispatch } from "react-redux";
import { setLoading, setToken , setIsAuthenticated } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
const {
	SENDOTP_API,
	SIGNUP_API,
	LOGIN_API,
	RESETPASSWORDTOKEN_API,
	RESETPASSWORD_API,
} = endpoints;
// const dispatch = useDispatch();

export function sendOtp(email, navigate) {
	return async (dispatch) => {
		const toastId=toast.loading('Loading....')
		dispatch(setLoading(true));
		try {
			const response =await apiConnector('POST', SENDOTP_API, { email });
			console.log('SEND OTP API RESPONSE...', response);

			toast.success('OTP Sent Successfully')
			navigate('/verify-email')
		} catch (error) {
			console.log("SENDOTP API ERROR............", error)
      toast.error(error.response.data.message)
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	
	}
}

export function signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate) {
	return async (dispatch) => {
		const toastId = toast.loading('Loading...');
		dispatch(setLoading(true));
		try {
			const response = apiConnector('POST', SIGNUP_API,
				{ firstName, lastName, email, password, confirmPassword, accountType,otp }
			);
			console.log('SIGNUP API RESPONSE...', response);
			toast.success('Signup Successfull');
			navigate('/login')
		} catch (error) {
			console.log("SIGNUP API ERROR............", error)
      toast.error(error.response.data.message)
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	
	}
}

export function login(email,password,navigate) {
	return async (dispatch) => {
		const toastId = toast.loading('Loading...');
		dispatch(setLoading(true));
		try {
			const response = await apiConnector('POST', LOGIN_API, { email, password });
			console.log('LOGIN API RESPONSE...', response);
			console.log('LOGIN API RESPONSE DATA...', response.data);
			console.log('LOGIN API RESPONSE USER...', response.data.user);
			toast.success('Login Successfull');

			dispatch(setToken(response.data.token));
			dispatch(setUser(response.data.user));
			dispatch(setIsAuthenticated(true));

			console.log('setting started');
			localStorage.setItem('token', JSON.stringify(response.data.token));
			localStorage.setItem('user', JSON.stringify(response.data.user));
			console.log('setting ended');

			navigate('/dashboard/my-profile')
		} catch (error) {
			console.log("LOGIN API ERROR............", error)
			console.log("RES", error.response.data.message);
			
			toast.error(error.response.data.message);
		}
		console.log('loading false-1');
		dispatch(setLoading(false));
		console.log('loading false-2');
		toast.dismiss(toastId);
	}
}

export function logout() {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			await localStorage.removeItem('token');
			await localStorage.removeItem('user');
			dispatch(setToken(null));
			dispatch(setUser({}));
			dispatch(setIsAuthenticated(false));
			window.location.reload();
		} catch (err) {
			console.log('Error in Logging out: ', err);
		}
		dispatch(setLoading(false))
	};
}


export function getPasswordResetToken(email, setEmailSent) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = apiConnector("POST", RESETPASSWORDTOKEN_API, { email });
			console.log("RESET PASSWORD TOKEN RESPONSE....", response);
			// if (!response.data.success) {
			// 	throw new Error(response.data.message);
			// }
			toast.success("Reset Email Sent");
			setEmailSent(true);
		} catch (error) {
			console.log("RESET PASSWORD TOKEN ERROR", error);
			toast.error("FAILED to send email for reseting password");
		}
		dispatch(setLoading(false));
	};
}

export function resetPassword(password, confirmPassword, token) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = apiConnector("POST", RESETPASSWORD_API, {
				password,
				confirmPassword,
				token,
			});
			console.log("RESET PASSWORD RESPONSE ", response);
			toast.success("Password successfully changed");
		} catch (error) {
			console.log("RESET PASSWORD ERROR", error);
			toast.error("FAILED to reset password");
		}
		dispatch(setLoading(false));
	};
}
