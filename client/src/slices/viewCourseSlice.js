import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
	courseSectionData: [],
	courseEntrieData: [],
	completedLectures: [],
	totalNoOfLectures: 0,
};
const viewCourseSlice = createSlice({
	name: "viewCourse",
	initialState: initialState,
	reducers: {
		setCourseSectionData: (state, action) => {
			state.courseSectionData = action.payload;
		},
		setCourseEntrieData: (state, action) => {
			state.courseEntrieData = action.payload;
		},
		setCompletedLectures: (state, action) => {
			state.completedLectures = action.payload;
		},
		setTotalNoOfLectures: (state, action) => {
			state.totalNoOfLectures = action.payload;
		},
		updateCompletedLectures: (state, action) => {
			state.completedLectures = [...state.completedLectures, action.payload];
		},
	},
});

export const {
	setCourseSectionData,
	setCourseEntrieData,
	setCompletedLectures,
	setTotalNoOfLectures,
	updateCompletedLectures,
} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;
