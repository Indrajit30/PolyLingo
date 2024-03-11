import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
	setCompletedLectures,
	setCourseEntrieData,
	setCourseSectionData,
	setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailsSideBar from "../components/core/ViewCourse/VideoDetailsSideBar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

function ViewCourse() {
	const [reviewModal, setReviewModal] = useState(false);

	const { token } = useSelector((state) => state.auth);
	const { courseId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		const setCourseSpecificDetails = async () => {
			const courseData = await getFullDetailsOfCourse(courseId, token);
			console.log("courseData", courseData);
			dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
			dispatch(setCourseEntrieData(courseData.courseDetails));
			//warning this line code fatega
			dispatch(setCompletedLectures(courseData.completdVideos));
			let lectures = 0;
			courseData?.courseDetails?.courseContent?.forEach((sec) => {
				lectures += sec.subSection.length;
			});

			dispatch(setTotalNoOfLectures(lectures));
		};

		setCourseSpecificDetails();
	}, []);

	return (
		<>
			{/* <div className="relative flex min-h-[calc(100vh-3.5rem)]">
				<VideoDetailsSideBar setReviewModal={setReviewModal} />

				<div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
					<div className="mx-auto w-11/12 max-w-[1000px] py-10">
						<Outlet />
					</div>
				</div>
			</div>
			{reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />} */}

			<div className="relative flex flex-col-reverse lg:flex-row min-h-[calc(100vh-3.5rem)]">
				<VideoDetailsSideBar setReviewModal={setReviewModal} />
				<div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
					<div className="mx-6">
						<Outlet />
					</div>
				</div>
			</div>
			{reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
		</>
	);
}

export default ViewCourse;
