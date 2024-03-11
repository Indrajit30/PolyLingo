const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudianry } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");

exports.updateProfile = async (req, res) => {
	try {
		const {
			firstName = "",
			lastName = "",
			gender = "",
			dateOfBirth = "",
			about = "",
			contactNumber = "",
		} = req.body;
		const userid = req.user.id;

		if (!contactNumber || !gender || !userid) {
			return res.status(400).json({
				success: false,
				message: "Please fields are required",
			});
		}

		const userDetails = await User.findById(userid);
		const profileId = userDetails.additionalDetails;

		const user = await User.findByIdAndUpdate(userid, { firstName, lastName });
		await user.save();

		const profileDeatils = await Profile.findById(profileId);

		profileDeatils.dateOfBirth = dateOfBirth;
		profileDeatils.about = about;
		profileDeatils.gender = gender;
		profileDeatils.contactNumber = contactNumber;

		await profileDeatils.save();

		const UpdatedUserDetails = await User.findById(userid)
			.populate("additionalDetails")
			.exec();
		return res.status(200).json({
			success: true,
			message: "Profile Updated Successfully",
			data: UpdatedUserDetails,
			som: profileDeatils,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Error in updating the profile",
			error: error.message,
		});
	}
};

//deleteAccount

exports.deleteAccount = async (req, res) => {
	try {
		const userId = req.user.id;
		const userDetails = await User.findById(userId);

		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const profileId = userDetails.additionalDetails;

		await Profile.findByIdAndDelete({ _id: profileId });

		//remove user form all enrolled courses
		for (let i = 0; i < userDetails.courses.length; i++) {
			let courseId = userDetails.courses[i];

			await Course.findByIdAndUpdate(
				{ _id: courseId },
				{
					$pull: {
						studentsEnrolled: userId,
					},
				},
				{ new: true }
			);
		}

		await CourseProgress.deleteMany({ userId: userId });
		await User.findByIdAndDelete({ _id: userId });

		return res.status(200).json({
			success: true,
			message: "Account Deleted successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Error in Deleting the profile",
			error: error.message,
		});
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const userId = req.user.id;

		const userDetails = await User.findById(userId)
			.populate("additionalDetails")
			.exec();

		return res.status(200).json({
			success: true,
			message: "User Data fetched Successfully",
			userDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			// message: "Error in Deleting the profile",
			error: error.message,
		});
	}
};

exports.changeDisplayPicture = async (req, res) => {
	try {
		const userId = req.user.id;

		const displayPicture = req.files.displayPicture;
		// const user = await User.findById(userId);

		if (!displayPicture) {
			return res.status(500).json({
				success: false,
				message: "No Image Found",
			});
		}

		const uploadedImage = await uploadImageToCloudianry(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		);

		console.log(uploadedImage);

		// user.image = uploadedImage.secure_url;
		// await user.save();

		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: uploadedImage.secure_url },
			{ new: true }
		)
			.populate("additionalDetails")
			.exec();
		return res.status(200).json({
			success: true,
			message: "Profile Picture updated successfully",
			data: updatedProfile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.getEnrolledCourses = async (req, res) => {
	try {
		const userId = req.user.id;

		let userDetails = await User.findOne({ _id: userId })
			.populate({
				path: "courses",
				populate: {
					path: "courseContent",
					populate: {
						path: "subSection",
					},
				},
			})
			.exec();

		userDetails = userDetails.toObject();
		var SubsectionLength = 0;
		for (var i = 0; i < userDetails.courses.length; i++) {
			let totalDurationInSeconds = 0;
			SubsectionLength = 0;
			for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
				totalDurationInSeconds += userDetails.courses[i].courseContent[
					j
				].subSection.reduce(
					(acc, curr) => acc + parseInt(curr.timeDuration),
					0
				);
				userDetails.courses[i].totalDuration = convertSecondsToDuration(
					totalDurationInSeconds
				);
				SubsectionLength +=
					userDetails.courses[i].courseContent[j].subSection.length;
			}
			let courseProgressCount = await CourseProgress.findOne({
				courseID: userDetails.courses[i]._id,
				userId: userId,
			});
			courseProgressCount = courseProgressCount?.completedVideos.length;
			if (SubsectionLength === 0) {
				userDetails.courses[i].progressPercentage = 100;
			} else {
				// To make it up to 2 decimal point
				const multiplier = Math.pow(10, 2);
				userDetails.courses[i].progressPercentage =
					Math.round(
						(courseProgressCount / SubsectionLength) * 100 * multiplier
					) / multiplier;
			}
		}

		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find user with id: ${userId}`,
			});
		}
		return res.status(200).json({
			success: true,
			data: userDetails.courses,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,

		});
	}
};


exports.instructorDashboard = async (req, res) => {
	try {
		
		const courseDetails = await Course.find({ instructor: req.user.id });

		const courseData = courseDetails.map((course) => {
			const totalStudentsEnrolled = course.studentsEnrolled.length;
			const totalAmountGenerated = totalStudentsEnrolled * course.price;

			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})
		res.status(200).send({
			success: true, data: courseData
		})
		
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:'Internal Server error'
		})
	}
}