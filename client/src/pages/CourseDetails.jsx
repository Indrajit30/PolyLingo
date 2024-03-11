import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operations/StudentFeaturesApi";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import CourseDetailsCard from "../components/course/CourseDetailsCard";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../utils/constants";
import { addToCart } from "../slices/cartSlice";
import CourseAccordionBar from "../components/course/CourseAccordianBar";

function CourseDetails() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { loading } = useSelector((state) => state.profile);
	const { paymentLoading } = useSelector((state) => state.course);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { courseId } = useParams();
	const [confiramtionModal, setConfirmationModal] = useState(null);

	const [showCourse, setShowCourse] = useState(null);

	async function getCourse(courseId) {
		const res = await fetchCourseDetails(courseId);
		setShowCourse(res);
	}
	useEffect(() => {
		getCourse(courseId);
	}, [courseId]);

	// console.log("COURSE TO SHOW IS...", showCourse.courseContent.subSection);

	const [avgReviewCount, setAvgReviewCount] = useState(0);
	useEffect(() => {
		const count = GetAvgRating(showCourse?.ratingAndReview);
		setAvgReviewCount(count);
	}, [showCourse]);

	const [totalLectures, setTotalLectures] = useState(0);
	let lectures;
	useEffect(() => {
		lectures = 0;
		showCourse?.courseContent?.forEach((sec) => {
			lectures += sec.subSection.length || 0;
		});
		setTotalLectures(lectures);
	}, [showCourse]);

	const [isActive, setIsActive] = useState(Array(0));
	const handleActive = (id) => {
		setIsActive(
			!isActive.includes(id)
				? isActive.concat(id)
				: isActive.filter((e) => e != id)
		);
	};

	const handleBuyCourse = () => {
		if (token) {
			if (courseId) {
				buyCourse(token, [courseId], user, navigate, dispatch);
			}
			// console.log("CONGRATSSSSSSS")
		}
		if (!token) {
			setConfirmationModal({
				text1: "You are not Logged in",
				text2: "Please login to purchase the course",
				btn1Text: "Login",
				btn2Text: "Cancel",
				btn1Handler: () => navigate("/login"),
				btn2Handler: () => setConfirmationModal(null),
			});
		}
	};

	function handleAddToCart() {
		if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
			toast.error("You are an Instructor, you cant buy a course");
			return;
		}
		console.log("Dispatch -> add to cart");
		if (token) {
			dispatch(addToCart(showCourse));
			return;
		}
		console.log("first");
		setConfirmationModal({
			text1: "You are not logged-in",
			text2: "Please Login to Add to Cart",
			btn1Text: "Login",
			btn2Text: "Cancel",
			btn1Handler: () => navigate("/login"),
			btn2Handler: () => setConfirmationModal(null),
		});
	}
	if (loading || !showCourse) {
		return <div>Loading...</div>;
	}

	const {
		_id: course_id,
		courseName,
		courseDescription,
		thumbnail,
		price,
		whatYouWillLearn,
		ratingAndReview,
		instructor,
		studentsEnrolled,
		createdAt,
		courseContent,
	} = showCourse;

	console.log(
		course_id,
		courseName,
		courseDescription,
		thumbnail,
		price,
		whatYouWillLearn,
		ratingAndReview,
		instructor,
		studentsEnrolled,
		createdAt
	);

	// console.log("COURSE TO SHOW IS...", showCourse.totalDuration);

	function formattedDate(date) {
		return new Date(date).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	}

	return (
		<div>
			<div className="relative w-full bg-richblack-800">
				<div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
					<div className="mx-auto grid minh-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
						<div className="relative block max-h-[30rem] lg:hidden">
							<div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
							<img
								src={thumbnail}
								alt="course thumbnail"
								className="aspect-auto max-h-[480px] w-full"
							/>
						</div>
						<div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
							<div>
								<p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
									{courseName}
								</p>
							</div>
							<p className={`text-richblack-200`}>{courseDescription}</p>
							<div className="text-md flex flex-wrap items-center gap-2">
								<span className="text-yellow-25">{avgReviewCount}</span>
								<RatingStars Review_Count={avgReviewCount} Star_Size={24} />
								<span>{`(${ratingAndReview.length} reviews)`}</span>
								<span>{`${studentsEnrolled.length} students enrolled`}</span>
							</div>
							<div>
								<p className="">
									Created By {`${instructor.firstName} ${instructor.lastName}`}
								</p>
							</div>
							<div className="flex flex-wrap gap-5 text-lg">
								<p className="flex items-center gap-2">
									{" "}
									<BiInfoCircle /> Created at {formatDate(createdAt)}
								</p>
								<p className="flex items-center gap-2">
									{" "}
									<HiOutlineGlobeAlt /> English
								</p>
							</div>
						</div>
						<div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
							<p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
								Rs. {price}
							</p>
							{/* <button className="yellowButton" onClick={handleBuyCourse}>
								Buy Now
							</button>
							<button onClick={handleAddToCart} className="blackButton">
								Add to Cart
							</button> */}
							<div className="flex flex-col gap-2 mx-auto">
								<button
									className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md"
									onClick={
										user && showCourse?.studentsEnrolled.includes(user?._id)
											? () => navigate("/dashboard/enrolled-courses")
											: handleBuyCourse
									}
								>
									{user && showCourse?.studentsEnrolled.includes(user?._id)
										? "Go to Course"
										: "Buy Now"}
								</button>

								{!showCourse?.studentsEnrolled.includes(user?._id) ? (
									<button
										className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md"
										onClick={handleAddToCart}
									>
										Add to Cart
									</button>
								) : (
									<div />
								)}
							</div>
						</div>
					</div>
					<div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
						<CourseDetailsCard
							course={showCourse}
							setConfirmationModal={setConfirmationModal}
							handleBuyCourse={handleBuyCourse}
						/>
					</div>
				</div>
			</div>

			<div className="mx-auto box-content px-4 text-start text-richblack-5  lg:w-[1260px]">
				<div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
					<div className="my-8 border border-richblack-600 p-8">
						<p className="text-3xl font-semibold">What you'll learn</p>
						<div className="mt-5">{whatYouWillLearn}</div>
					</div>

					<div className="max-w-[830px]">
						<div className="flex flex-col gap-3">
							<p className="font-semibold text-2xl">Course Content</p>
							<div className="flex justify-between gap-2">
								<div className="flex gap-2">
									<span>
										{courseContent.length} {`section(s)`}
									</span>
									<span>
										{totalLectures} {`lecture(s)`}
									</span>
									{/* <span>{showCourse.totalDuration} total length</span> */}
								</div>
								<div>
									<button
										className="text-yellow-25"
										onClick={() => setIsActive([])}
									>
										Collapse all sections
									</button>
								</div>
							</div>
						</div>

						<div className="py-4">
							{courseContent?.map((course, index) => (
								<CourseAccordionBar
									course={course}
									key={index}
									isActive={isActive}
									handleActive={handleActive}
								/>
							))}
						</div>

						{/* Author Details */}
						<div className="mb-12 py-4">
							<p className="text-[28px] font-semibold">Author</p>
							<div className="flex items-center gap-4 py-4">
								<img
									src={
										instructor.image
											? instructor.image
											: `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
									}
									alt="Author"
									className="h-14 w-14 rounded-full object-cover"
								/>
								<p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
							</div>
							<p className="text-richblack-50">
								{instructor?.additionalDetails?.about}
							</p>
						</div>
					</div>
				</div>
				{/* <div className="flex flex-col text-white">
				<div className="relative flex flex-col justify-start">
					<p>{courseName}</p>
					<p>{courseDescription}</p>
					<div>
						<span>{avgReviewCount}</span>
						<RatingStars
							ReviewCount={avgReviewCount}
							StarSize={24}
						></RatingStars>
						<span>{`${ratingAndReview.length} reviews `}</span>
						<span>{`${ratingAndReview.length} students enrolled`}</span>
					</div>

					<div>
						<p>Created By {instructor?.firstName}</p>
					</div>
					<div>
						<p>Created at {formatDate(createdAt)}</p>
						<p> English</p>
					</div>

					<div>
						<CourseDetailsCard
							course={showCourse}
							setConfirmationModal={setConfirmationModal}
							handleBuyCourse={handleBuyCourse}
						/>
					</div>
				</div>

				<div>
					<p>What You Will learn</p>
					<div>{whatYouWillLearn}</div>
				</div>

				<div>
					<div>
						<p>Course Content : </p>
					</div>
					<div className="flex gap-x-3 justify-between">
						<div>
							<span>{courseContent.length} sections</span>
							<span>{totalLectures} lectures</span>
						</div>
						<div>
							<button onClick={() => setIsActive([])}>
								Collapse all Sections
							</button>
						</div>
					</div>
				</div>

				{confiramtionModal && (
					<ConfirmationModal modalData={confiramtionModal} />
				)}
			</div> */}
			</div>
		</div>
	);
}

export default CourseDetails;
