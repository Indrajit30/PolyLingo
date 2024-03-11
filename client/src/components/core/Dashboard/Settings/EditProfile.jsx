import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from '../../../common/IconBtn';
import { updateProfileDeatils } from "../../../../services/operations/settingsApi";

console.log('hIIIIII');
const storedToken = localStorage.getItem('token');

console.log('Stored Token:', storedToken);

const token12 = storedToken ? JSON.parse(storedToken) : null;

console.log('Parsed Token:', token12);

// Now use the 'token' variable in your request


const genders = ["Male", "Female"];
function EditProfile() {
	const {user} = useSelector((state) => state.profile);
	const {token} = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	
	const submitProfileForm = async (data) => {
		console.log('Form Data ---->> ', data);
		console.log("TOKKKKENN ",token);
		try {
			dispatch(updateProfileDeatils(token12, data));
		} catch (error) {
			console.log("Erroror ", error);
		}
	}
	return (
		<>
			<form onSubmit={handleSubmit(submitProfileForm)}>
				<div className="flex flex-col gap-8 rounded-md border-[1px] bg-richblack-800 border-richblack-600 p-8 px-12">
					<h2 className="text-lg font-semibold text-richblack-5">
						Profile Information
					</h2>
					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label htmlFor="firstName" className="label-style">
								First Name
							</label>
							<input
								className="form-style"
								type="text"
								name="firstName"
								id="firstName"
								placeholder="Enter First Name"
								{...register("firstName", { required: true })}
								defaultValue={user?.firstName}
							/>
							{errors.firstName && <span>Please enter your first name</span>}
						</div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label className="label-style" htmlFor="firstName">
								Last Name
							</label>
							<input
								type="text"
								className="form-style"
								name="lastName"
								id="lastName"
								placeholder="Enter Last Name"
								{...register("lastName", { required: true })}
								defaultValue={user?.lastName}
							/>
							{errors.firstName && <span>Please enter your first name</span>}
						</div>
					</div>

					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label className="label-style" htmlFor="firstName">
								Date of Birth
							</label>
							<input
								type="date"
								className="form-style"
								name="dateOfBirth"
								id="dateOfBirth"
								{...register("dateOfBirth", {
									required: {
										value: true,
										message: "Please enter your Date of Birth",
									},
									max: {
										value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
									},
								})}
								defaultValue={user?.additionalDetails?.dateOfBirth}
							/>
							{errors.dateOfBirth && <span className="-mt-1 text-[12px] text-yellow-100">{errors.dateOfBirth.message}</span>}
						</div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label className="label-style" htmlFor="firstName">
								Gender
							</label>

							<select
								name="gender"
								id="gender"
								className="form-style"
								{...register("gender", { required: true })}
								defaultValue={user?.additionalDetails?.gender}
							>
								{genders.map((elem, i) => (
									<option key={i} value={elem}>
										{elem}
									</option>
								))}
							</select>
							{errors.gender && <span className="-mt-1 text-[12px] text-yellow-100">Please select your gender</span>}
						</div>
					</div>

					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label className="label-style" htmlFor="contactNumber">
								Contact Number
							</label>
							<input
								type="tel"
								className="form-style"
								name="contactNumber"
								id="contactNumber"
								placeholder="Enter Contact Number"
								{...register("contactNumber", {
									required: {
										value: true,
										message: "Please enter your Contact Number",
									},
									maxLength: { value: 12, message: "Invalid Contact Number" },
									minLength: { value: 10, message: "Invalid Contact Number" },
								})}
								defaultValue={user?.additionalDetails?.contactNumber}
							/>
							{errors.contactNumber && (
								<span className="-mt-1 text-[12px] text-yellow-100">{errors.contactNumber.message}</span>
							)}
						</div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label className="label-style" htmlFor="about">
								About
							</label>
							<input
								type="text"
								className="form-style"
								name="about"
								id="about"
								placeholder="Enter Bio Details"
								{...register("about", { required: true })}
								defaultValue={user?.additionalDetails?.about}
							/>
							{errors.about && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									Please enter your About.
								</span>
							)}
						</div>
					</div>
				</div>

				<div className="mt-5 flex justify-end gap-2">
					<button
						onClick={() => {
							navigate("/dashboard/my-profile");
						}}
						className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
					>
						Cancel
					</button>
					<IconBtn type="submit" text="Save" />
				</div>
			</form>
		</>
	);
}

export default EditProfile;
