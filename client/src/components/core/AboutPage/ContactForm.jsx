// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// // import { apiConnector } from "../../../services/apiConnector";
// // import { contactUsEndPoint } from "../../../services/apis";
// import { toast } from "react-hot-toast";
// import CountryCode from "../../../data/countrycode.json";
// // import { useForm } from 'react-hook-form';
// function ContactForm() {
// 	const [loading, setLoading] = useState(false);
// 	const {
// 		register,
// 		handleSubmit,
// 		reset,
// 		formState: { errors, isSubmitSuccessFul },
// 	} = useForm();
// 	useEffect(() => {
// 		if (isSubmitSuccessFul) {
// 			reset({
// 				email: "",
// 				fristName: "",
// 				lastName: "",
// 				message: "",
// 				phoneNo: "",
// 			});
// 		}
// 	}, [reset, isSubmitSuccessFul]);

// 	const submitContactForm = async (data) => {
// 		console.log("Logging Data");
// 		try {
// 			setLoading(true);
// 			// const response = await apiConnector('POST', contactUsEndPoint.CONTACT_US_API, data);
// 			const response = { status: "OK" };
// 			console.log("LOGGINT RESPONSE ", response);
// 			console.log("LOGGINT DATA ", data);
// 			toast.success("Response captured successfully");
// 			setLoading(false);
// 		} catch (error) {
// 			console.log("ERRROR", error.message);
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
// 			<h1 className="text-4xl leading-10 font-semibold text-richblack-5">
// 				Got a Idea? We&apos;ve got the skills. Let&apos;s team up
// 			</h1>
// 			<p className="">
// 				Tell us more about yourself and what you&apos;re got in mind.
// 			</p>

// 			<h1>Get in Touch</h1>
// 			<div>We'd love to here for you, Please fill out thi form.</div>
// 			<form
// 				className="flex flex-col gap-5"
// 				action=""
// 				onSubmit={handleSubmit(submitContactForm)}
// 			>
// 				<div className="flex gap-5 flex-col lg:flex-row">
// 					<div className="flex flex-col gap-2 lg:-w[48%]">
// 						<label htmlFor="firstName" className="lable-style">
// 							First Name
// 						</label>
// 						<input
// 							type="text"
// 							name="firstName"
// 							placeholder="Enter first namr"
// 							id="firstName"
// 							// className="text-richblack-900"
// 							className="form-style"
// 							{...register("firstname", { required: true })}
// 						/>
// 						{errors.fristName && <span>Please Enter Your name</span>}
// 					</div>

// 					<div className="flex flex-col gap-2 lg:w-[48%]">
// 						<label htmlFor="lastName">Last Name</label>
// 						<input
// 							type="text"
// 							name="lastName"
// 							placeholder="Enter last name"
// 							id="lastName"
// 							className="form-style"
// 							{...register("lastname")}
// 						/>
// 					</div>
// 				</div>
// 				<div className="flex flex-col gap-2">
// 					<label htmlFor="email">Email Address</label>
// 					<input
// 						type="email"
// 						name="email"
// 						id="email"
// 						placeholder="Enter email Address"
// 						className="form-style"
// 						{...register("email", { required: true })}
// 					/>
// 					{errors.email && (
// 						<span className="-mt-1 text-[12px] text-yellow-100">
// 							Please enter your Email address.
// 						</span>
// 					)}
// 				</div>
// 				<div className="flex flex-col gap-2">
// 					<label htmlFor="phonenumber">Phone Number</label>
// 					<div className="flex gap-5">
// 						{/* dropdown */}

// 						<div className="flex w-[81px] flex-col gap-2">

// 						<select
// 							name="dropdown"
// 							// className="  bg-white text-richblack-900"
// 							className="form-style w-[150px]"
// 							id="dropdown"
// 							{...register("countrycode", { required: true })}
// 						>
// 							{CountryCode.map((elem, i) => {
// 								return (
// 									<option className="form-style" value={elem.code} key={i}>
// 										{elem.code}-{elem.country}
// 									</option>
// 								);
// 							})}
// 						</select>

// 						</div>
						
// 						<div className="flex w-[calc(100%-90px)] flex-col gap-2">
// 						<input
// 							type="number"
// 							name="phonenumber"
// 							id="phonenumber"
// 							placeholder="12345 67890"
// 							className=" w-[calc(100%-50px)] form-style"
// 							// className="form-style"
// 							{...register("phoneno", {
// 								required: true,
// 								maxLength: { value: 10, message: "Invalid Phone Number" },
// 								minLength: { value: 8, message: "Invalid Phone Number" },
// 							})}
// 							/>
// 							</div>
// 					</div>
// 					{errors?.phoneno && <span>{errors.phoneno.message}</span>}
// 				</div>
// 				<div className="flex flex-col gap-5">
// 					<label htmlFor="message">Message</label>
// 					<textarea
// 						name="message"
// 						id="message"
// 						cols="30"
// 						rows="10"
// 						className="form-style"
// 						placeholder="Enter Your message here"
// 						{...register("message", { required: true })}
// 					></textarea>
// 					{errors.message && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Please enter your Message.
//           </span>
//         )}
// 				</div>

// 				<button
// 					type="submit"
// 					className="rounded-md bg-yellow-50 text-center px-8 py-2 text-[16px] font-semibold text-black"
// 				>
// 					Send Message
// 				</button>

// 				<button
//         disabled={loading}
//         type="submit"
//         className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
//          ${
//            !loading &&
//            "transition-all duration-200 hover:scale-95 hover:shadow-none"
//          }  disabled:bg-richblack-500 sm:text-[16px] `}
//       >
//         Send Message
//       </button>
// 			</form>
// 		</div>
// 	);
// }

// export default ContactForm;

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from "../../../data/countrycode.json";
// import CountryCode from "../../data/countrycode.json"
// import { apiConnector } from "../../services/apiconnector"
// import { contactusEndpoint } from "../../services/apis"
import { toast } from "react-hot-toast"

const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  // const submitContactForm = async (data) => {
  //   // console.log("Form Data - ", data)
  //   try {
  //     setLoading(true)
  //     const res = await apiConnector(
  //       "POST",
  //       contactusEndpoint.CONTACT_US_API,
  //       data
  //     )
  //     console.log("Email Res - ", res)
  //     if(res.data.success){
  //       toast.success(res.data.message);
  //     }
  //     setLoading(false)
  //   } catch (error) {
  //     console.log("ERROR MESSAGE - ", error.message)
  //     toast.error(error.message)
  //     setLoading(false)
  //   }
  // }

	const submitContactForm=()=>{}
  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({
  //       email: "",
  //       firstname: "",
  //       lastname: "",
  //       message: "",
  //       phoneNo: "",
  //     })
  //   }
  // }, [reset, isSubmitSuccessful])

  return (
    <div>
      <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
      </form>
      {
        loading && (
          <div className="mx-auto spinner"></div>
        )
      }
    </div>
  )
}

export default ContactForm
