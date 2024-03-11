import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { FaPlus } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import {
	setCourse,
	setEditCourse,
	setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
	updateSection,
	createSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

function CourseBuilderForm() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		getValues,
	} = useForm();

	const { course } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);
	const { courseSectionData } = useSelector((state) => state.viewCourse);
	const [editSectionName, setEditSectionName] = useState(null);
	const [loading, setLoading] = useState(false);

	// console.log('COURSE --->', course);
	const dispatch = useDispatch();
	function cancelEdit() {
		setEditSectionName(null);
		setValue("sectionName", "");
	}
	// function goToBack() {
	// 	dispatch(setStep(1));
	// 	setEditCourse(true);
	// }
	const goBack = () => {
		console.log(' back btn clicked')
		dispatch(setStep(1));
		dispatch(setEditCourse(true));
  };
	function goToNext() {
		if (course?.courseContent?.length === 0) {
			toast.error("Please add atleast one course");
			return;
		}
		if (
			course.courseContent.some((section) => section.subSection.length === 0)
		) {
			toast.error("Please add atleast one lecture in each section");
			return;
		}
		dispatch(setStep(3));
	}

	const onSubmit = async (data) => {
		console.log("CourseBulider se ", data);
		console.log("initial sub sec   ", course.courseContent);

		setLoading(true);

		let result;

		if (editSectionName) {
			result = await updateSection(
				{
					sectionName: data.sectionName,
					sectionId: editSectionName,
					courseId: course._id,
				},
				token
			);
		} else {
			result = await createSection(
				{ sectionName: data.sectionName, courseId: course._id },
				token
			);
		}
		console.log("RESULT-1.. ", result);
		if (result) {
			console.log("RESULT-2.. ", result);
			dispatch(setCourse(result));
			setEditSectionName(null);
			setValue("sectionName", "");
			console.log("RESULT-3.. ", result);
		}

		console.log("final sub sec   ", course.courseContent);

		setLoading(false);
	};

	const handleChangeEditSectionName = (sectionId, sectionName) => {
		if (editSectionName === sectionId) {
			cancelEdit();
			return;
		}
		setEditSectionName(sectionId);
		setValue("sectionName", sectionName);
	};
	return (
		<div className="text-rounded-md border-ricblack-700 bg-richblack-800 p-6 space-y-8">
			<p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
			<form action="" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col space-y-2">
					<label htmlFor="sectionName" className="text-sm text-richblack-5">
						Section name <sup className="text-pink-200">*</sup>
					</label>
					<input
						type="text"
						id="sectionName"
						placeholder="Add section name"
						{...register("sectionName", { required: true })}
						className="w-full form-style"
					/>
					{errors.sectionName && (
						<span className='ml-2 text-xs tracking-wide text-pink-200"'>
							{" "}
							Section name is required
						</span>
					)}
				</div>

				<div className="flex gap-8">
					<IconBtn
						type="submit"
						text={!editSectionName ? "Create Section " : "Edit Section Name"}
						outline={true}
					></IconBtn>

					{editSectionName && (
						<button
							type="button"
							onClick={cancelEdit}
							className="text-sm text-richblack-300 underline"
						>
							Cancel edit
						</button>
					)}
				</div>
			</form>

			{course?.courseContent?.length > 0 && (
				<NestedView
					handleChangeEditSectionName={handleChangeEditSectionName}
				></NestedView>
			)}

			<div className="flex justify-end gap-x-3">
				<button
					onClick={goBack}
					className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
				>
					Back
				</button>
				<IconBtn disabled={loading} text="Next" onclick={goToNext}>
					<MdNavigateNext />
				</IconBtn>
			</div>
		</div>
	);
}

export default CourseBuilderForm;
