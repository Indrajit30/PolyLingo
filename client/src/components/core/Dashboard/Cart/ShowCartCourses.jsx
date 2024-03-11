import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { removeFromCart } from "../../../../slices/cartSlice";


function ShowCartCourses() {
	const { cart } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	console.log("CART IS", cart);

	return (
		<div className=" w-[70%]">
			{cart.map((course, ind) => (
				<div className="flex items-center justify-between" key={ind}>
					<div className="flex flex-1 flex-col gap-4 xl:flex-row">
						<img
							className="h-[148px] w-[220px] rounded-lg object-cover"
							src={course?.thumbnail}
							alt=""
						/>
						<div className="flex flex-col space-y-1">
							<p className="text-lg font-medium text-richblack-5">
								{course?.courseName}
							</p>
							<p className="text-sm text-richblack-300">
								{course?.category?.name}
							</p>
							<div className="flex items-center gap-2">
								{/* avg rating */}
								<span className="text-yellow-5">4.8</span>

								<ReactStars
									count={5}
									size={20}
									edit={false}
									color="#ffd200"
									emptyIcon={<FaRegStar />}
									fullIcon={<FaRegStar />}
									value={course?.ratingAndReviews?.length}
								></ReactStars>

								<span className="text-richblack-400">
									{course?.ratingAndReviews?.length} Ratings
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-start space-y-5">
						<button
							className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
							onClick={() => dispatch(removeFromCart(course._id))}
						>
							<MdOutlineDelete />
							<span>Remove</span>
						</button>
						<p className="mb-6 text-3xl font-medium text-yellow-100">
							₹ {course?.price}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default ShowCartCourses;
