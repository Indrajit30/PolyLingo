import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";

function MyProfile() {
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();
	console.log(user.firstName);
	console.log(user.lastName);

	return (
		<div className="flex flex-col gap-16">
			<h1 className=" text-3xl font-medium text-richblack-5">My Profile</h1>

			{/* section1 */}
			<div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
				<div className=" flex flex-col items-start lg:flex-row lg:items-center lg:gap-x-4 ">
					<img
						src={user?.image}
						alt={`profile-${user?.firstName}`}
						className="aspect-square w-[80px] rounded-full object-cover"
					/>
					<div className="space-y-2">
						<p className="text-lg font-semibold text-richblack-5">
							{user?.firstName + " " + user?.lastName}
						</p>
						<p className="text-sm text-richblack-300">{user?.email}</p>
					</div>
				</div>

				<IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")}>
					<RiEditBoxLine />
				</IconBtn>
			</div>

			{/* section2 */}
			<div className="flex flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
				<div className="flex items-center justify-between">
					<div className="font-semibold text-lg text-richblack-5">About</div>
					<IconBtn
						text="Edit"
						onclick={() => {
							navigate("/dashboard/settings");
						}}
					>
						<RiEditBoxLine />
					</IconBtn>
				</div>
				<div className="text-richblack-300">
					{user?.additionalDetails?.about ?? "Write Something about Yourself"}
				</div>
			</div>

			{/* section3 */}
			<div className=" flex flex-col gap-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
				<div className="flex justify-between">
					<p className="text-lg font-semibold text-richblack-5">
						Personal Details
					</p>
					<IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")}>
						<RiEditBoxLine />
					</IconBtn>
				</div>

				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-2">
						<p className="text-sm text-richblack-600">First Name</p>
						<p className="text-sm font-medium text-richblack-5">
							{user?.firstName}
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-richblack-600">Last Name</p>
						<p className="text-sm font-medium text-richblack-5">
							{user?.lastName}
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-richblack-600">Email</p>
						<p className="text-sm font-medium text-richblack-5">
							{user?.email}
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-richblack-600">Gender</p>
						<p className="text-sm font-medium text-richblack-5">
							{user?.additionalDetails?.gender ?? "Add Gender"}
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-richblack-600">Phone Number</p>
						<p className="text-sm font-medium text-richblack-5">
							{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-richblack-600">Date Of Birth</p>
						<p className="text-sm font-medium text-richblack-5">
							{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MyProfile;
