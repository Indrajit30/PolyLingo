import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	FreeMode,
	Pagination,
	Autoplay,
	Navigation,
	Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";
import ReactStars from "react-rating-stars-component"
import { FaStar } from "react-icons/fa"



function ReviewSlider() {
	const [reviews, setReviews] = useState([]);
	const truncateWords = 15;
	useEffect(() => {
		const fetchAllReviews = async () => {
			const response = await apiConnector(
				"GET",
				ratingsEndpoints.REVIEWS_DETAILS_API
			);

			console.log("Review Slider Response...", response);
			const reqData = response?.data?.data;
			console.log("ALL reqData", reqData);
			setReviews(reqData);
		};
		fetchAllReviews();
	}, []);

	console.log("ALL REVIEWS222", reviews);

	
	return (
		{reviews} ? <h1></h1>:
		<div className="text-white my-16">
			<div className="h-[190px] max-w-maxContent">
				<Swiper
					slidesPerView={3}
					spaceBetween={24}
					loop={true}
					autoplay={{ delay: 2000 }}
					freeMode={true}
					navigation={true}
					// modules={[FreeMode, Pagination, Autoplay]}
					modules={[FreeMode, Pagination, Autoplay, Navigation, Keyboard]}
					className="w-full"
					breakpoints={{
						1024: {
							slidesPerView: 4,
						},
					}}
				>
					{reviews.map((review, index) => (
						<SwiperSlide key={index}>
							<div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
								<div className="flex items-center gap-4">
									<img
										src={
											review?.user?.image
												? review?.user?.image
												: `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`
										}
										className="h-9 w-9 object-cover rounded-full"
										alt=""
									/>

									<div className="flex flex-col">
										<span className="font-semibold text-richblack-5">
											{review?.user?.firstName} {review?.user?.lastName}
										</span>
										<h2 className="text-[12px] font-medium text-richblack-500">
											{review?.course?.courseName}
										</h2>
									</div>
                </div>
                <p className="font-medium text-richblack-25">
                  {review?.review.split(" ").length>truncateWords ? `${review?.review.split(" ").slice(0,truncateWords).join(" ")}...`:`${review?.review}`}
                </p>
                <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
							</div>

							{/* <img src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`}
                className='h-9 w-9 object-cover rounded-full'
                  alt="" />
                <p>{review?.course?.courseName}</p>
                <p className='flex items-center'>{review?.user?.firstName} {review?.user?.lastName}</p> */}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default ReviewSlider;
