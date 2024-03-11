// const BASE_URL = process.env.REACT_APP_BASE_URL
// import env from "react-dotenv";
// const dotenv = require('dotenv');
// dotenv.config();

const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log("BASE_URL...", BASE_URL);
console.log("BASE_URL...2", process.env.REACT_APP_BASE_URL);


export const endpoints = {
	SENDOTP_API: BASE_URL + "/auth/sendotp",
	SIGNUP_API: BASE_URL + "/auth/signup",
	LOGIN_API: BASE_URL + "/auth/login",
	RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
	RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

export const categories = {
	CATEGORIES_API: BASE_URL + "/course/showAllcategories",
};

export const profileEndpoints = {
	GET_USER_DEATILS_API: BASE_URL + "/profile/getUserDetails",
	GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
	GET_INSTRUCTOR_DATA_API:BASE_URL+"/profile/instructorDashboard"
};

export const courseEndpoints = {
	GET_ALL_COURSES_API: BASE_URL + "/course/getAllCourses",
	COURSE_DEATILS_API: BASE_URL + "/course/getCourseDetails",
	EDIT_COURSE_API: BASE_URL + "/course/editCourse",
	COURSE_CATEGORIES_API: BASE_URL + "/course/showAllcategories",
	CREATE_COURSE_API: BASE_URL + "/course/createCourse",
	CREATE_SECTION_API: BASE_URL + "/course/addSection",
	CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
	UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
	UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubsection",
	DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
	DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubsection",
	DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
	GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",

	GET_FULL_COURSE_DETAILS_AUTHENTICATED:
		BASE_URL + "/course/getFullCourseDetails",
	LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
	CREATE_RATING_API: BASE_URL + "/course/createRating",
};

export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

export const profileEdit = {};

export const contactUsEndPoint = {
	CONTACT_US_API: BASE_URL + "/contactus",
};

export const settingsEndpoints = {
	UPDATE_PROFILE_PIC: BASE_URL + "/profile/updateDisplayPicture",
	UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
};

export const StudentEndpoints = {
	COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
	COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
	SEND_PAYMENT_SUCCESS_MAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
};

export const catalogData = {
	CATALOGPAGEDATA_API: BASE_URL + "/course/getcategoryPageDetails",
};
