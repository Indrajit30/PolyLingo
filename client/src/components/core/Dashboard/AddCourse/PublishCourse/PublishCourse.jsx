import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";

function PublishCourse() {
	const { register, handleSubmit, setValue, getValues } = useForm();
	const { course } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue('public', true);
    }
  })
  
  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    console.log('START');
    navigate("/dashboard/my-courses")
    console.log('End');
    // navigate to courses page
  }
  const handleCoursePublish = async() => {
    if (course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true ||
      (course.status===COURSE_STATUS.DRAFT && getValues('public')===false)
    ) {
      // no need to update the course
      // no api call to make
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append('courseId', course._id);
    const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    // formData.append('public', getValues('public'));
    formData.append('status', courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }

    setLoading(false);
  }
  const onSubmit = () => {
    handleCoursePublish();
  };

	return (
		<div className="rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700">
			<p className="text-2xl font-semibold text-richblack-5">Publish Course</p>
			<form action="" onSubmit={handleSubmit(onSubmit)}>
				<div className="my-6 mb-8">
					<label htmlFor=""  className="inline-flex items-center text-lg">
						<input
							type="checkbox"
							name=""
							id="public"
							{...register("public")}
              // className="rounded-md h-4 w-4 text-richblack-900"
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
						/>
						<span className="ml-2 text-richblack-400">Make this Course as Public</span>
					</label>
				</div>
				<div className="flex justify-end gap-x-3">
					<button
						disabled={loading}
						onClick={goBack}
						type="button"
						className="flex items-center bg-richblack-300 px-4 py-2 rounded-md"
					>
						Back
					</button>
					<IconBtn disabled={loading} text="Save Changes"></IconBtn>
				</div>
			</form>
		</div>
	);
}

export default PublishCourse;
