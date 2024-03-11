import React, { useState } from "react";
import Banner from "../assets/Images/login.webp";
import bannerBg from "../assets/Images/frame.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authAPI";
import { useNavigate,Link } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(login(email, password, navigate));
	}

	return (
		<div className="">
			<div className="w-10/12 mx-auto flex flex-col mt-16 gap-10 md:flex-row-reverse md:gap-16 lg:gap-36">
				{/* <div className="relative authBg rounded-lg md:w-[50%]">
					<img className="rounded-lg absolute top-6 left-6" src={Banner} alt="" />
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
					<h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
					<div className="text-white">
						First step towards learning languages {" "}
						<span className="text-blue-200 font-bold font-edu-sa italic">
							Education to future-proof your career.
						</span>
					</div>
					<form
						action=""
						onSubmit={handleSubmit}
						className="flex flex-col gap-5"
					>
						<div className="flex flex-col gap-2">
							<span className="text-white text-[1rem]">
								Email Address <sup class="text-pink-200">*</sup>
							</span>
							<input
								className="bg-richblack-600 text-[18px] px-3 py-3  rounded-[12px] outline-none text-richblack-5"
								type="email"
								value={email}
								placeholder="Enter email adderss"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-2 relative mb-5">
							<span className="text-white text-[1rem]">
								Password <sup class="text-pink-200">*</sup>
							</span>
							<input
								className="bg-richblack-600 text-[18px] px-3 py-3 rounded-[12px] outline-none text-richblack-5"
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<span onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<AiFillEyeInvisible fontSize={24} />
								) : (
									<AiFillEye fontSize={24} />
								)}
							</span>
							<span
								className="text-xl text-white cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<div>Hide Hassword</div>
								) : (
									<div>Show Password</div>
								)}
							</span>
							<Link to='/forgot-password'>
								<span className="absolute text-[14px] text-blue-200 -bottom-5 right-0 ">
									Forgot Password
								</span>
								
							</Link>
						</div>

						<button
							type="submit"
							className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900 transition-all duration-200 hover:scale-90"
						>
							Sign In
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
