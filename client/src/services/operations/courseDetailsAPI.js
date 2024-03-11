import { toast } from "react-hot-toast";

import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
	GET_ALL_COURSES_API,
	COURSE_DEATILS_API,
	COURSE_CATEGORIES_API,
	EDIT_COURSE_API,
	DELETE_COURSE_API,
	CREATE_COURSE_API,
	CREATE_SECTION_API,
	CREATE_SUBSECTION_API,
	UPDATE_SECTION_API,
	UPDATE_SUBSECTION_API,
	DELETE_SECTION_API,
	DELETE_SUBSECTION_API,
	GET_ALL_INSTRUCTOR_COURSES_API,
	GET_FULL_COURSE_DETAILS_AUTHENTICATED,
	CREATE_RATING_API,
	LECTURE_COMPLETION_API
} = courseEndpoints;

export async function getAllCourses() {
	const toastId = toast.loading("Loading...");
	let result = [];
	try {
		const response = await apiConnector("GET", GET_ALL_COURSES_API);
		result = response?.data?.data;
	} catch (error) {
		console.log("GET_ALL_COURSES_API_ERROR...... ", error);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
	return result;
}

export async function fetchCourseDetails(courseId) {
	const toastId = toast.loading("Loading...");
	let result = null;

	try {
		const response = await apiConnector("POST", COURSE_DEATILS_API, {
			courseId,
		});

		console.log("COURSE_DETAILS_API_RESPONSE.... ", response);

		result = response.data.data;
	} catch (error) {
		console.log("COURSE_DETAILS_API API ERROR............", error);
		result = error.response.data;
	}

	toast.dismiss(toastId);
	//   dispatch(setLoading(false));
	return result;
}

export async function fetchCourseCategories() {
	let result = [];
	try {
		const response = await apiConnector("GET", COURSE_CATEGORIES_API);
		console.log("COURSE_CATEGORIES_API RESPONSE....", response);
		// result = response;
		// console.log('NEXT...',response?.data?.data);
		result = response?.data?.data;
	} catch (error) {
		console.log("COURSE_CATEGORIES_API ERROR.... ", error);
		toast.error(error.message);
	}
	return result;
}


//create Course
export async function addCourseDetails(data, token) {
	let result = null;
	const toastId = toast.loading("Adding Course...");

	try {
		const response = await apiConnector("POST", CREATE_COURSE_API, data, {
			"content-type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		});

		console.log("CREATE COURSE API RESPONSE............", response);
		toast.success("Course Details Added Successfully");
		result = response?.data?.data;
	} catch (error) {
		console.log("CREATE COURSE API ERROR............", error);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
	return result;
}


//edit course
export async function editCourseDetails(data, token) {
	let result = null;
	const toastId = toast.loading("Loading....");
	try {
		const response = await apiConnector("POST", EDIT_COURSE_API, data, {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		});

		console.log("EDIT COURSE API RESPONSE............", response);
		toast.success("Course Details Updated Successfully");
		result = response?.data?.data;
	} catch (error) {
		console.log("EDIT COURSE API ERROR............", error);
		toast.error(error.message);
	}

	toast.dismiss(toastId);
	return result;
}


// create section, subsection
export async function createSection(data, token) {
	let result = null;
	const toastId = toast.loading("Creating Section..");

	try {
		const response = await apiConnector("POST", CREATE_SECTION_API, data, {
			Authorization: `Bearer ${token}`,
		});
		console.log("CREATE SECTION API RESPONSE...... ", response);
		toast.success("Course Section Created");
		result = response?.data?.updatedCourse;
		// result = response;
	} catch (error) {
		console.log("CREATE SECTION API ERROR............", error);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
	return result;
}
export async function createSubSection(data, token) {
	let result = null;
	const toastId = toast.loading("Adding Lecture...");

	try {
		const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
			Authorization: `Bearer ${token}`,
		});
		console.log("CREATE SUB-SECTION API RESPONSE...... ", response);
		toast.success("Lecture Added")
		result = response?.data?.data
		// result = response;
	} catch (error) {
		console.log("CREATE SUB-SECTION API ERROR............", error);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
	return result;
}

// update section subsection
export async function updateSection(data, token) {
	let result = null;
	const toastId = toast.loading("Creating Section..");

	try {
		const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
			Authorization: `Bearer ${token}`,
		});
		console.log("UPDATE SECTION API RESPONSE...... ", response);
		toast.success("Course Section Updated");
		result = response?.data?.data
		// result = response;
	} catch (error) {
		console.log("UPDATE SECTION API ERROR............", error);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
	return result;
}


// export async function updateSubSection(data, token) {
// 	let result = null;
// 	console.log('updateSubSection',data);
// 	const toastId = toast.loading("Loading...");
// 
// 	try {
// 		const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
// 			Authorization: `Bearer ${token}`,
// 		});
// 		console.log("UPDATE SUB-SECTION API RESPONSE...... ", response);
// 		toast.success("Course SubSection Updated");
// 		result = response?.data?.data
// 		// result = response;
// 	} catch (error) {
// 		console.log("UPDATE SUB-SECTION API ERROR............", error);
// 		toast.error(error.message);
// 	}
// 	toast.dismiss(toastId);
// 	return result;
// }

export const updateSubSection = async (data, token) => {
  let result = null
	const toastId = toast.loading("Loading...")
	console.log('updateSubSection',data);

  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// delete section, subsection
export async function deleteSection(data, token) {
	let result = null;
	console.log('DELETEDATA----',data);
	const toastId = toast.loading("Loading...");

	try {
		const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
			Authorization: `Bearer ${token}`,
		});
		console.log("DELETE SECTION API RESPONSE...... ", response);
		toast.success("Course Section Deleted");
		result = response?.data?.dates;
		// result = response;
		console.log('logging result',result);
	} catch (error) {
		console.log("DELETE SECTION API ERROR............", error);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
	return result;
}

export async function deleteSubSection(subSectionId,sectionId, token) {
	let result = null;
	const toastId = toast.loading("Deleting Lecture..");

	try {
		const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, subSectionId,sectionId, {
			Authorization: `Bearer ${token}`,
		});
		console.log("UPDATE SUB-SECTION API RESPONSE...... ", response);
		toast.success("Course SubSection Updated");
		result = response?.data?.data;
		// result = data;
	} catch (error) {
		console.log("UPDATE SUB-SECTION API ERROR............", error);
		toast.error(error.message);
	}
	toast.dismiss(toastId);
	return result;
}


export const fetchInstructorCourses = async (token) => {
	let result = [];
	const toastId = toast.loading('Loading...');
	try {
		const response = await apiConnector('GET', GET_ALL_INSTRUCTOR_COURSES_API, null, {
			Authorization:`Bearer ${token}`
		})
		console.log("INSTRUCTOR COURSES API RESPONSE............", response)
		result = response?.data?.data;
	} catch (error) {
		console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
	}
	toast.dismiss(toastId)
  return result
}

export const deleteCourse = async (data,token) => {
	const toastId = toast.loading('Loading...');

	try {
		const response = await apiConnector('DELETE', DELETE_COURSE_API, data, {
			Authorization:`Bearer ${token}`
		})
		console.log("DELETE COURSE API RESPONSE............", response)
    
    toast.success("Course Deleted")
	}catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

export const getFullDetailsOfCourse = async (courseId, token) => {
  let result = null
	const toastId = toast.loading("Loading...");

	try {
		const response = await apiConnector('POST', GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId }, {
			Authorization:`Bearer ${token}`
		})
		console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
		result = response?.data?.data
  } catch (error) {
		console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
		toast.error(error.message)

  }
  toast.dismiss(toastId)
  return result
}


export const createRating = async (data,token) => {
	const toastId = toast.loading("Loading...")
	let success = false
	
	try {
		const response = await apiConnector('POST', CREATE_RATING_API, data, {
			Authorization: `Bearer ${token}`
		})

		console.log("CREATE RATING API RESPPONSE...........", response)
		toast.success("Rating Created")
    success = true
	} catch (error) {
		success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
    toast.error(error.response.data.message)
	}
	toast.dismiss(toastId)
	return success;
}

export const markLectureAsComplete =async (data,token) => {
	let result = null
	let toastId;
	console.log("mark complete data", data)
	try {
		const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
			Authorization: `Bearer ${token}`
		})

		console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE............", response);


		toastId=toast.success("Lecture Completed")
    result = true
	} catch (error) {
		console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
	}
	toast.dismiss(toastId)
  return result
}