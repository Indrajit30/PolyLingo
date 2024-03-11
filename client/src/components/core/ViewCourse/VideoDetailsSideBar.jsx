import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs"

function VideoDetailsSideBar({ setReviewModal }) {
	const [activeStatus, setActiveStatus] = useState("");
	const [videoBarActive, setVideoBarActive] = useState("");
	const navigate = useNavigate();
	const { sectionId, subSectionId } = useParams();
	const {
		courseSectionData,
		courseEntireData,
		totalNoOfLectures,
		completedLectures,
	} = useSelector((state) => state.viewCourse);

	useEffect(() => {
		const functionCall = () => {
			if (!courseSectionData.length) return;
			const currentSectionIndex = courseSectionData.findIndex(
				(data) => data._id === sectionId
			);
			const currentSubSectionIndex = courseSectionData?.[
				currentSectionIndex
			]?.subSection.findIndex((data) => data._id === subSectionId);
			const activeSubSectionId =
				courseSectionData[currentSectionIndex]?.subSection?.[
					currentSubSectionIndex
				]?._id;

			//set current secion here
			setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
			// set current subsection here
			setVideoBarActive(activeSubSectionId);
		};
		functionCall();

		console.log(activeStatus);
		console.log(videoBarActive);
		// eslint-disable-next-line no-restricted-globals
	}, [courseSectionData, courseEntireData, location.pathname]);

	const [rotate, setRotate] = useState(false);
	console.log("rotate", rotate);

	return (
		<>
			<div className="flex h-[calc(100vh-3.5rem)] w-[screen] lg:w-[320px] lg:max-w-[350px] flex-col lg:border-r-[1px] border-t-[4px] border-t-richblack-700 lg:lg:border-r-richblack-700 bg-richblack-800">
				<div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblue-25">
					{/* buttons */}
					<div className="flex w-full items-center justify-between ">
						<div onClick={() => navigate("/dashboard/enrolled-courses")}
						className="flex h-[35px] w-[35px] items-center cursor-pointer justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90">
							{/* Back */}
							<IoIosArrowBack size={30} />
						</div>
						<div>
							<IconBtn
								text="Add Review"
								customClasses="ml-auto"
								onclick={()=>setReviewModal(true)}
							></IconBtn>
						</div>
					</div>
					<div className="flex flex-col ">
						<p>{courseEntireData?.courseName}</p>
						<p className="text-sm font-semibold text-richblack-500">
							{completedLectures?.length}/{totalNoOfLectures}
						</p>
					</div>
				</div>

				<div className="h-[calc(100vh - 5rem)] overflow-y-auto">
					{courseSectionData.map((course, idx) => (
						<div key={idx}
						className="mt-2 cursor-pointer text-sm text-richblack-5"
							onClick={() => setActiveStatus(course?._id)}>
							<div className="flex justify-between items-centre bg-richblack-600 px-5 py-4">
								<div className="w-[70%] font-semibold">{course?.sectionName}</div>
								<div
									className="flex items-center gap-3"
									onClick={() => setRotate(!rotate)}>
									<RiArrowDropDownLine
										size={30}
										className={`text-richblack-5 ${
											rotate
												? "transition-all duration-200 rotate-0"
												: "text-yellow-50 transition-all duration-200 rotate-180"
										}`}
									/>
								</div>
							</div>

							{/* //sub-sections */}

							<div >
								{activeStatus === course?._id && (
									<div className="transition-[height] duration-500 ease-in-out">
										{course.subSection.map((topic, idx) => (
											<div
												key={idx}
												className={`flex gap-5 p-5 ${
													videoBarActive === topic._id
														? "bg-yellow-200 text-richblack-900"
														: "bg-richblack-900 text-white"
												}`}
												onClick={() => {
													setVideoBarActive(topic?._id);
													navigate(
														`/view-course/${courseEntireData._id}/section/${course?._id}/sub-section/${topic?._id}`
													);
												}}
											>
												<input
                          type="checkbox"
                          onChange={()=>{}}
													checked={completedLectures.includes(topic?._id)}
												/>
												<span>{topic.title}</span>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default VideoDetailsSideBar;
