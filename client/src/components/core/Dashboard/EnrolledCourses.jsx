import React, { useEffect, useState } from "react";
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

function EnrolledCourses() {
	const { token } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [enrolledCourses, setEnrolledCourses] = useState(null);

	const getEnrolledCourses = async () => {
		try {
			const response = await getUserEnrolledCourses(token);
			setEnrolledCourses(response);
		} catch (error) {
			console.log("Unable to fetch enrolled courses");
		}
		
	};

	// console.log(enrolledCourses[0]?.totalDuration)

	// console.log("ENROLLED COURSES", enrolledCourses[0]?.progressPercentage);
	// console.log("ABCDEF....",enrolledCourses[0]?.courseContent[0])
	// console.log("ABCDEF....",enrolledCourses[0]?.courseContent[0]?.subSection?.[0]?._id)
	useEffect(() => {
		getEnrolledCourses();
	},[]);
	return (
		<div className="text-richblack-5">
			<div>Enrolled Courses</div>
			{!enrolledCourses ? (
				<div>Loading...</div>
			) : !enrolledCourses.length ? (
				<p>You have not enrolled in any course yet</p>
			) : (
				<div className="flex flex-col rounded-md  border border-richblack-700">
					<div className="flex px-5 py-4 rounded-md bg-richblack-700 text-richblack-50">
						<p className="w-[50%]">Course Name</p>
						<p className="w-[20%]">Duration</p>
						<p className="w-[30%]">Progress</p>
					</div>

					{enrolledCourses.map((course, ind) => (
						<div key={ind} className="text-white my-[18px] flex border-b border-richblack-700 ">
							<div
								onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
								// onClick={()=>navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?._id}`)}
								className="flex items-center gap-4 px-5 w-[55%] mb-5 cursor-pointer">
								<img
									// className="max-w-[65px]"
									className="h-14 w-14 rounded-lg object-cover"
									src={course?.thumbnail} alt="" />
								<div>
									<p className="text-base font-semibold ">{course.courseName}</p>
									<p className="text-xs text-richblack-300">
										{course?.courseDescription.length > 50
											? `${course.courseDescription.slice(0, 50)}...`
											: course.courseDescription}
									</p>
								</div>
							</div>
							<div className="w-[16%] px-2 py-3 mb-5">{course?.totalDuration}</div>
							<div className="flex w-[34%] flex-col gap-2 px-2 py-3 mr-2 mb-5">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
						</div>
					))}

					{/* {enrolledCourses.map((course, ind) => {
						<div key={ind} className="text-white">
							<div>
								<img src={course?.thumbnail} alt="" />
								<div>
									<p>{course.courseName}</p>
									<p>{course.description}</p>
								</div>
							</div>
							<div>{course?.totalDuration}</div>
							<div>
								<p>Progress :{course.progressPercentage}</p>
								<ProgressBar
									completed={course.progressPercentage}
									height="8px"
									isLabelVisible={false}
								></ProgressBar>
							</div>
						</div>
					})} */}
				</div>
			)}
		</div>
	);
}

export default EnrolledCourses;

// import { useEffect, useState } from "react"
// import ProgressBar from "@ramonak/react-progress-bar"
// import { BiDotsVerticalRounded } from "react-icons/bi"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// // import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
// import { getUserEnrolledCourses } from "../../../services/operations/profileApi";

// export default function EnrolledCourses() {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()

//   const [enrolledCourses, setEnrolledCourses] = useState(null)
//   const getEnrolledCourses = async () => {
//     try {
//       const res = await getUserEnrolledCourses(token);

//       setEnrolledCourses(res);
//     } catch (error) {
//       console.log("Could not fetch enrolled courses.")
//     }
//   };
//   useEffect(() => {
//     getEnrolledCourses();
//   }, [])

//   return (
//     <>
//       <div className="text-3xl text-richblack-50">Enrolled Courses</div>
//       {!enrolledCourses ? (
//         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//           <div className="spinner"></div>
//         </div>
//       ) : !enrolledCourses.length ? (
//         <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
//           You have not enrolled in any course yet.
//           {/* TODO: Modify this Empty State */}
//         </p>
//       ) : (
//         <div className="my-8 text-richblack-5">
//           {/* Headings */}
//           <div className="flex rounded-t-lg bg-richblack-500 ">
//             <p className="w-[45%] px-5 py-3">Course Name</p>
//             <p className="w-1/4 px-2 py-3">Duration</p>
//             <p className="flex-1 px-2 py-3">Progress</p>
//           </div>
//           {/* Course Names */}
//           {enrolledCourses.map((course, i, arr) => (
//             <div
//               className={`flex items-center border border-richblack-700 ${
//                 i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
//               }`}
//               key={i}
//             >
//               <div
//                 className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
//                 onClick={() => {
//                   navigate(
//                     `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
//                   )
//                 }}
//               >
//                 <img
//                   src={course.thumbnail}
//                   alt="course_img"
//                   className="h-14 w-14 rounded-lg object-cover"
//                 />
//                 <div className="flex max-w-xs flex-col gap-2">
//                   <p className="font-semibold">{course.courseName}</p>
//                   <p className="text-xs text-richblack-300">
//                     {course.courseDescription.length > 50
//                       ? `${course.courseDescription.slice(0, 50)}...`
//                       : course.courseDescription}
//                   </p>
//                 </div>
//               </div>
//               <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
//               <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
//                 <p>Progress: {course.progressPercentage || 0}%</p>
//                 <ProgressBar
//                   completed={course.progressPercentage || 0}
//                   height="8px"
//                   isLabelVisible={false}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   )
// }
