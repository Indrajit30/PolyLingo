import React, { useState } from "react";
import Banner from "../assets/Images/login.webp";
import bannerBg from "../assets/Images/frame.png";
import Button from "../components/core/HomePage/Buttton";
import toast from "react-hot-toast";
import { setSignupData } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI";

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [accType, setAccType] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		console.log(firstName, lastName, email, password, confirmPassword);

		if (password !== confirmPassword) {
			toast.error("Passwords Do Not Match");
			return;
		}

		const signupData = {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType: accType,
		};
		dispatch(setSignupData(signupData));

		console.log("SIGNUP DATA SET SUCCESSFULLY");

		dispatch(sendOtp(email, navigate));
	}

	return (
		<div className="">
			<div className="w-10/12 mx-auto flex flex-col mt-16 gap-10 md:flex-row-reverse md:gap-16 lg:gap-36">
				{/* <div className="relative authBg p-4 rounded-lg md:w-[50%]">
					<img className="rounded-lg absolute h-[420px]" src={Banner} alt="" />
				</div> */}
				<div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
					<img
						src={bannerBg}
						alt="Pattern"
						width={558}
						height={504}
						loading="lazy"
					/>

					<img
						src={Banner}
						alt="Students"
						width={558}
						height={504}
						loading="lazy"
						className="absolute -top-4 right-4 z-10"
					/>
				</div>
				<div className="flex flex-col gap-5">
					<h1 className="text-white text-3xl font-semibold">
						Join the millions learning on polylingo for free
					</h1>
					<div className="text-white">
						Build skills for today, tomorrow, and beyond.{" "}
						<span className="text-blue-200 font-bold font-edu-sa italic">
							Education to future-proof your career.
						</span>
					</div>
					<div
						className="mx-2 bg-richblack-500 p-[6px] rounded-xl max-w-max gap-10 flex items-center px-5 "
						// className="flex bg-richblack-800 p-1 gap-x-16 my-6 rounded-xl max-w-max items-center"
					>
						<div
							onClick={() => setAccType("Instructor")}
							className={`cursor-pointer flex items-center ${
								accType === "Instructor"
									? " bg-richblack-900 text-yellow-50 p-2 rounded-md"
									: "text-richblack-5"
							}`}
						>
							Instructor
						</div>
						<div
							onClick={() => setAccType("Student")}
							className={`cursor-pointer  ${
								accType === "Student"
									? " bg-richblack-900 text-yellow-50 p-2 rounded-md"
									: "text-richblack-5"
							}`}
						>
							Student
						</div>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
						<div className="flex items-center gap-5">
							<div className="flex flex-col gap-2 w-1/2">
								<span className="text-white text-[1rem]">
									First Name <sup class="text-pink-200">*</sup>
								</span>
								<input
									className="bg-richblack-800 text-richblack-5 text-[15px] px-1 py-2  rounded-[6px] outline-none md:p-3 md:text-[18px]"
									type="text"
									placeholder="Enter First Name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div className="flex flex-col gap-2 w-[50%]">
								<span className="text-white text-[1rem]">
									Last Name <sup class="text-pink-200">*</sup>
								</span>
								<input
									className="bg-richblack-800 text-richblack-5 text-[15px] px-1 py-2  rounded-[6px] outline-none md:p-3 md:text-[18px]"
									type="text"
									placeholder="Enter Last Name"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-white text-[1rem]">
								Email Address <sup class="text-pink-200">*</sup>
							</span>

							<input
								className="bg-richblack-800  text-richblack-5 text-[15px] px-1 py-2  rounded-[6px] outline-none md:p-3  md:text-[18px]"
								type="text"
								placeholder="Enter email adderss"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex gap-5">
							<div className="flex flex-col gap-2 relative mb-5 w-[50%]">
								<span className="text-white text-[1rem]">
									Password <sup class="text-pink-200">*</sup>
								</span>
								<input
									className="bg-richblack-800 text-richblack-5 text-[15px] px-1 py-2  rounded-[6px] outline-none md:p-3 md:text-[18px]"
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="flex flex-col gap-2 relative mb-5 w-[50%]">
								<span className="text-white text-[1rem]">
									Confirm Password <sup class="text-pink-200">*</sup>
								</span>
								<input
									className="bg-richblack-800 text-richblack-5 text-[15px] px-1 py-2  rounded-[6px] outline-none md:p-3 md:text-[18px]e"
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
						</div>

						<button
							type="submit"
							className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900 transition-all duration-200 hover:scale-90"
						>
							Create Account
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
