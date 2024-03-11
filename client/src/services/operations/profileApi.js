import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setUser, setLoding } from "../../slices/profileSlice";
import { profileEndpoints } from "../apis";

const { GET_USER_DEATILS_API, GET_USER_ENROLLED_COURSES_API ,GET_INSTRUCTOR_DATA_API} =
	profileEndpoints;

export async function getUserEnrolledCourses(token) {
	const toastId = toast.loading("Loading....");
	let result = [];
	try {
		const response = await apiConnector(
			"GET",
			GET_USER_ENROLLED_COURSES_API,
			null,
			{
				Authorization:`Bearer ${token}`,
			}
		);

    console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............", response)
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES ", response.data);
    result = response.data.data;
    

  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
	const toastId = toast.loading('Loading...');
	let result = []
	
	try {
		const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
    // console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............   ", response.data.data)
    result = response?.data?.data
	} catch (error) {
		console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Could Not Get Instructor Data")
	}
	toast.dismiss(toastId)
  return result
}