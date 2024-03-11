import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ReactStars from "react-stars";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import { RxCross2 } from "react-icons/rx";
function CourseReviewModal({ setReviewModal }) {
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const { courseEntrieData } = useSelector((state) => state.viewCourse);
	const {
		register,
		getValues,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setValue("courseExperience", "");
		setValue("courseRating", 0);
	}, []);

	const formData = new FormData();

	console.log("formData", formData);

	const ratingChanged = (newRating) => {
		setValue("courseRating", newRating);
	};

	console.log("courseEntrieData", courseEntrieData);

	const onSubmit = async (data) => {
		// let data = FormData();
		await createRating(
			{
				courseId: courseEntrieData._id,
				rating: data.courseRating,
				review: data.courseExperience,
			},
			token
		);
		setReviewModal(false);
	};
	return (
		<div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
			<div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
				<div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
					<p className="text-xl font-semibold text-richblack-5">Add Review</p>
					<button onClick={() => setReviewModal(false)}>
						<RxCross2 className="text-2xl text-richblack-5" />
					</button>
				</div>

				<div className="p-6">
					<div className="flex items-center justify-center gap-4">
						<img
							src={user?.image}
							alt={user?.firstName + "profile"}
							// className="w-[50px] rounded-full "
							className="aspect-square w-[50px] rounded-full object-cover"
						/>
						<div>
							<p className="font-semibold text-richblack-5">
								{user?.firstName} {" "} {user?.lastName}
							</p>
							<p className="text-sm text-richblack-5">Posting Publicly</p>
						</div>
					</div>

					<form
						action=""
						onSubmit={handleSubmit(onSubmit)}
						className="mt-6 flex flex-col items-centre"
					>
						<ReactStars
							count={5}
							onChange={ratingChanged}
							size={24}
							activeColor="#ffd700"
						/>
						<div className="flex w-11/12 flex-col space-y-2">
							<label
								className="text-sm text-richblack-5"
								htmlFor="courseExperience"
							>
								Add Your Experience <sup className="text-pink-200">*</sup>
							</label>
							<textarea
								name=""
								id="courseExperience"
								placeholder="Add Your Experience here"
								{...register("courseExperience", { required: true })}
								className="form-style resize-x-none min-h-[130px] w-full"
							></textarea>

							{errors.courseExperience && (
								<span className="ml-2 text-xs tracking-wide text-pink-200">
									Please add your experience
								</span>
							)}
						</div>

						<div className="mt-6 flex w-11/12 justify-end gap-x-2">
							<button
								className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
								onClick={() => setReviewModal(false)}
							>
								Cancel
							</button>
							<IconBtn text="Save"></IconBtn>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CourseReviewModal;
