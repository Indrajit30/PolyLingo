import React from "react";
import IconBtn from "../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { addToCart } from "../../slices/cartSlice";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleShare() {
		copy(window.location.href);
		toast.success("Link copied to clipboard");
	}
	function handleAddToCart() {
		if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
			toast.error("You are an Instructor, you cant buy a course");
			return;
		}
		console.log("Dispatch -> add to cart");
		if (token) {
			dispatch(addToCart(course));
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
	return (
		<>
			<div className="flex flex-col gap-4 bg-richblack-700 p-4 text-richblack-5 rounded-md">
				<img
					className="max-h-[300px] min-h-[180px] w-[400px]  overflow-hidden rounded-md object-cover md:max-w-full"
					src={course.thumbnail}
					alt="Thumbnail Image"
				/>

				<div className="px-4">
					<div className="space-x-3 pb-4 text-3xl font-semibold">
						Rs. {course.price}
					</div>
					<div className="flex flex-col gap-2 mx-auto">
						<button
							className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md"
							onClick={
								user && course?.studentsEnrolled.includes(user?._id)
									? () => navigate("/dashboard/enrolled-courses")
									: handleBuyCourse
							}
						>
							{user && course?.studentsEnrolled.includes(user?._id)
								? "Go to Course"
								: "Buy Now"}
						</button>

						{!course?.studentsEnrolled.includes(user?._id) ? (
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
					<div>
						<p className="pb-3 pt-6 text-center text-sm text-richblack-25">
							30-Day Money-Back Guarantee
						</p>
					</div>

					<div>
						<p className={`my-2 text-xl font-semibold `}>
							This Course Includes :
						</p>
						<div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
							{course?.instructions?.map((item, i) => {
								return (
									<p className={`flex gap-2`} key={i}>
										<BsFillCaretRightFill />
										<span>{item}</span>
									</p>
								);
							})}
						</div>
					</div>

					<div className="text-center">
						<button
							className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
							onClick={handleShare}
						>
							<FaShareSquare size={15} /> Share
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default CourseDetailsCard;
