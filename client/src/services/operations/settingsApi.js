import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../slices/authSlice";
const { UPDATE_PROFILE_PIC, UPDATE_PROFILE_API } = settingsEndpoints;

// const dispatch = useDispatch();

// const { token } = useSelector((state) => state.auth);

export  function updateDispalyPic(token, formData) {
	return async(dispatch) => {
		const toastId = toast.loading("Loading.....");
		console.log("API FORMDATA ", formData);
		dispatch(setLoading(true));
		try {
			const response = await apiConnector("PUT", UPDATE_PROFILE_PIC, formData, {
				"content-type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			});

			console.log("UPDATE_PROFILE_PIC API RESPONSE......", response);
			console.log("UPDATE_PROFILE_PIC API PICTURE LINE......", response.data.data);
			dispatch(setUser( response?.data?.data ));
			toast.success("Display Picture Updated Successfully");
			// dispatch(setUser(response.data.data))
		} catch (error) {
			console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
			toast.error("Could Not Update Display Picture");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function updateProfileDeatils(token, formData) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading.....");
		dispatch(setLoading(true));
		try {
			const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
				Authorization: `Bearer ${token}`,
			});
			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			console.log("UPDATE_PROFILE_API API RESPONSE............", response);
			console.log("UPDATE_PROFILE API resultejnf............", response.data.data);
			toast.success("Profile Updated successfully");
			dispatch(setUser(response.data.data));
			// dispatch(setUser(response.data.data));
		} catch (error) {
			console.log("UPDATE_PROFILE_API API ERROR............", error);
			toast.error("Could Not Update Profile");
		}
		dispatch(setLoading(false));

		toast.dismiss(toastId);
	};
}
