import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
	addCourseDetails,
	editCourseDetails,
	fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import Upload from "../Upload";

function CourseInformationForm() {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const { course, editCourse } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(false);
	const [courseCategories, setCourseCategories] = useState([]);
	const { step } = useSelector((state) => state.course);
	// const step = 2;

	console.log("editCourse", editCourse);
	useEffect(() => {
		const getCategories = async () => {
			setLoading(true);
			const categories = await fetchCourseCategories();
			// console.log('CATEGOTRIES ',categories);
			if (categories.length > 0) {
				setCourseCategories(categories);
			}
			setLoading(false);
		};

		if (editCourse) {
			setValue("courseTitle", course.courseName);
			setValue("courseShortDesc", course.courseDescription);
			setValue("coursePrice", course.price);
			setValue("courseBenfits", course.whatYouWillLearn);
			setValue("courseCategory", course.category);
			setValue("courseRequirements", course.instructions);
			// setValue("courseTags", course.courseTags);
			setValue("courseImage", course.thumbnail);
		}
		getCategories();
	}, []);

	// console.log("TTTTttt.... ", courseCategories);

	const isFormUpdated = () => {
		const currentValues = getValues();
		// console.log(currentValues);
		if (
			currentValues.courseTitle !== course.courseName ||
			currentValues.courseShortDesc !== course.courseDescription ||
			currentValues.coursePrice !== course.price ||
			currentValues.courseCategory._id !== course.category._id ||
			currentValues.courseImage !== course.thumbnail ||
			// currentValues.courseTags.toString() !== course.tag.toString() ||
			currentValues.courseBenifits !== course.whatYouWillLearn ||
			currentValues.courseRequirements.toString() !==
				course.instructions.toString()
		)
			return true;
		else return false;
	};

	//handle the click of next button
	const onSubmit = async (data) => {
		console.log("submit", data);

		if (editCourse) {
			if (isFormUpdated()) {
				const currentValues = getValues();
				const formData = new FormData();
				console.log("CURRENT VALUES ARE", currentValues);

				formData.append("courseId", course._id);

				if (currentValues.courseTitle !== course.courseName) {
					formData.append("courseName", data.courseTitle);
				}
				if (currentValues.courseShortDesc !== course.courseDescription) {
					formData.append("courseDescription", data.courseShortDesc);
				}
				if (currentValues.coursePrice !== course.price) {
					formData.append("price", data.coursePrice);
				}
				if (currentValues.courseBenifits !== course.whatYouWillLearn) {
					formData.append("whatYouWillLearn", data.courseBenifits);
				}
				if (currentValues.courseImage !== course.thumbnail) {
					formData.append("thumbnailImage", course.courseImage);
				}
				if (currentValues.courseCategory._id !== course.category._id) {
					formData.append("category", data.courseCategory);
				}
				if (
					currentValues.courseRequirements.toString() !==
					course.instructions.toString()
				) {
					formData.append(
						"instructions",
						JSON.stringify(data.courseRequirements)
					);
				}

				setLoading(true);

				const result = await editCourseDetails(formData, token);
				setLoading(false);

				if (result) {
					// dispatch(setEditCourse(false));
					// console.log(step);
					console.log('STARTSSS',step);
					await dispatch(setStep(2));
					dispatch(setCourse(result));
					console.log('ENDSSS',step);
				} else {
					toast.error("No Changes made so far");
				}
				return;
			}
		}

		console.log("START FROM DATA");
		const formData = new FormData();
		formData.append("courseName", data.courseTitle);
		formData.append("courseDescription", data.courseShortDesc);
		formData.append("price", data.coursePrice);
		formData.append("whatYouWillLearn", data.courseBenfits);
		formData.append("instructions", JSON.stringify(data.courseRequirements));
		formData.append("category", data.courseCategory);
		formData.append("status", COURSE_STATUS.DRAFT);
		formData.append("thumbnailImage", data.courseImage);
		console.log("Reached line 140");
		setLoading(true);
		const result = await addCourseDetails(formData, token);
		console.log("OLDStep ", step);
		if (result) {
			dispatch(setStep(2));
			dispatch(setCourse(result));
		}

		console.log("NEWStep ", step);

		console.log("Reached line 148");
		setLoading(false);
	};
	return (
		<form
			action=""
			className="rounded-md text-richblack-5 border-ricblack-700 bg-richblack-800 p-6 space-y-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="courseTitle">
					Course Title <sup className="text-pink-200">*</sup>
				</label>
				<input
					className="form-style w-full"
					// className="text-richblack-800 w-full"
					type="text"
					id="courseTitle"
					placeholder="Enter Course Name"
					{...register("courseTitle", { required: true })}
				/>
				{errors.courseTitle && <span>Course Title is required</span>}
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="courseShortDesc">
					Course Short Description <sup className="text-pink-200">*</sup>
				</label>
				<input
					type="text"
					className="form-style resize-x-none min-h-[130px] w-full"
					id="courseShortDesc"
					placeholder="Enter Short description about the course"
					{...register("courseShortDesc", { required: true })}
				/>
				{errors.courseShortDesc && <span>Course Description is required</span>}
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="coursePrice">
					Course Price <sup className="text-pink-200">*</sup>
				</label>
				<div className="relative">
					<input
						className="form-style  w-full pl-10"
						type="text"
						id="coursePrice"
						placeholder="Enter Course Price"
						{...register("coursePrice", {
							required: true,
							valueAsNumber: true,
						})}
					/>
					<HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
				</div>
				{errors.coursePrice && <span>Course Price is required</span>}
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="courseCategory">
					Course Category <sup className="text-pink-200">*</sup>
				</label>
				<select
					className="form-style w-full"
					name=""
					id="courseCategory"
					defaultValue=""
					{...register("courseCategory", { required: true })}
				>
					<option value="" disabled>
						{" "}
						Choose a Category
					</option>
					{!loading &&
						courseCategories?.map((cat, i) => (
							<option key={i} value={cat?._id}>
								{cat?.name}
							</option>
						))}
				</select>
				{errors.courseCategory && <span  className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required</span>}
			</div>

			{/* create custom component for tags */}

			<Upload
				name="courseImage"
				label="course Thumbnail"
				register={register}
				setValue={setValue}
				errors={errors}
				editData={editCourse ? course?.thumbnail : null}
			></Upload>

			<div className="">
				<label htmlFor="courseBenfits">
					Course Benifits <sup className="text-pink-200">*</sup>
				</label>
				<input
					type="text"
					className="form-style w-full"
					id="courseBenfits"
					placeholder="Enter Benefits of the course"
					{...register("courseBenfits", { required: true })}
				/>
				{errors.courseBenfits && <span className="ml-2 text-xs tracking-wide text-pink-200">Course Benifits is required</span>}
			</div>

			<RequirementField
				name="courseRequirements"
				label="Requirements/Instructions"
				register={register}
				setValue={setValue}
				errors={errors}
				getValues={getValues}
			></RequirementField>

			<div className="flex justify-end gap-x-2">
				{editCourse && (
					<button
						onClick={() => dispatch(setStep(2))}
						className="`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`"
					>
						Continue Without Saving
					</button>
				)}
				<IconBtn text={!editCourse ? "Next" : "Save Changes"} />
			</div>
		</form>
	);
}

export default CourseInformationForm;
