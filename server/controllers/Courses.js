const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudianry } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.createCourse = async (req, res) => {
	try {
		//fetch
		const {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			category,
			instructions,
			tag,
		} = req.body;

		let status = req.body.status;

		// const category = req.params.id;
		const thumbnail = req.files.thumbnailImage;

		//validate

		// if (
		// 	!courseName ||
		// 	!courseDescription ||
		// 	!whatYouWillLearn ||
		// 	!price ||
		// 	!category
		// 	// !thumbnail
		// ) {
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "Please fill all fields",
		// 	});
		// }

		if (!status || status === undefined) {
			status = "Draft";
		}

		//validate-instructor,tag
		const userId = req.user.id;
		const instructorDetails = await User.findById(userId);
		console.log("Instructor Deatils ", instructorDetails);
		//verify that userId and instructorDetails._id are same or not
		if (!instructorDetails) {
			return res.status(401).json({
				success: false,
				message: "Instructor Details not found!",
			});
		}

		//check tag is valid

		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(401).json({
				success: false,
				message: "Category Details not found!",
			});
		}

		const thumbnailImage = await uploadImageToCloudianry(
			thumbnail,
			process.env.FOLDER_NAME
		);

		const newCourse = await Course.create({
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			instructions,
			// tag,
			instructor: instructorDetails._id,
			category: categoryDetails._id,
			status,
			thumbnail: thumbnailImage.secure_url,
		});

		//update course schema
		const updatedUser = await User.findByIdAndUpdate(
			{ _id: instructorDetails._id },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		//update category schema

		const updatedCategory = await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

		console.log("===== ", updatedCategory);

		return res.status(200).json({
			success: true,
			message: "Course created Successfully",
			data: newCourse,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: "Error in creating course",
			error: error.message,
		});
	}
};

exports.editCourse = async (req, res) => {
	try {
		// const {
		// 	courseName,
		// 	courseDescription,
		// 	whatYouWillLearn,
		// 	price,
		// 	category,
		// 	instructions,
		// 	tag,
		// 	courseId
		// } = req.body;

		// const thumbnail = req.files.thumbnailImage;

		// const course = await Course.findByIdAndUpdate({ _id: courseId },
		// 	{
		// 		CourseName: courseName,
		// 		courseDescription: courseDescription,
		// 		whatYouWillLearn: whatYouWillLearn,
		// 		price: price,
		// 		category: category,
		// 		instructions: instructions,
		// }
		// )

		const { courseId } = req.body;
		const updates = req.body;
		const course = await Course.findById(courseId);

		if (!course) {
			return res.status(404).json({ error: "Course not found" });
		}

		if (req.files) {
			console.log("Thumbnail Update");
			const thumbnail = req.files.thumbnail;
			const thumbnailImage = await uploadImageToCloudianry(
				thumbnail,
				process.env.FOLDER_NAME
			);

			course.thumbnail = thumbnailImage.secure_url;
		}

		for (const key in updates) {
			if (updates.hasOwnProperty(key)) {
				if (key === "tag" || key === "instructions") {
					course[key] = JSON.parse(updates[key]);
				} else {
					course[key] = updates[key];
				}
			}
		}

		await course.save();

		const updatedCourse = await Course.findOne({ _id: courseId })
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			.populate("ratingAndReview")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		res.json({
			success: true,
			message: "Course Updated Successfully",
			data: updatedCourse,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

exports.showAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				instructor: true,
				thumbnail: true,
				ratingAndReview: true,
				studentsEnrolled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			message: "Data for all courses fetched successfully",
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Cannot detch course Data",
			error: error.message,
		});
	}
};

exports.getCourseDetails = async (req, res) => {
	try {
		const { courseId } = req.body;

		const courseDetails = await Course.findById({ _id: courseId })
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			.populate("ratingAndReview")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		if (!courseDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find the given course with ${courseId}`,
			});
		}
		return res.status(200).json({
			success: true,
			message: "Course details fetched successfully",
			data: courseDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			// message: "Cannot get course Details",
			message: error.message,
		});
	}
};

exports.getInstructorCourses = async (req, res) => {
	try {
		const instId = req.user.id;

		// const instructorCourses = await Course.find({ instructor: instId }).sort({
		// 	createdAt: -1,
		// });

		const instructorCourses = await Course.find({
			instructor: instId,
		}).sort({ createdAt: -1 });

		res.status(200).json({
			success: true,
			data: instructorCourses,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failde to retrive instructor courses",
			error: error.message,
		});
	}
};

exports.deleteCourse = async (req, res) => {
	try {
		const { courseId } = req.body;
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				message: "Course not found",
			});
		}

		const studentsEnrolled = course.studentsEnrolled;
		for (const studentId of studentsEnrolled) {
			await User.findByIdAndUpdate(studentId, {
				$pull: { courses: courseId },
			});
		}

		const courseSections = course.courseContent;
		for (const sectionId of courseSections) {
			const section = await Section.findById(sectionId);
			if (section) {
				const subSections = section.subSection;
				for (const subSectionId of subSections) {
					await SubSection.findByIdAndDelete(subSectionId);
				}
			}
			await Section.findByIdAndDelete(sectionId);
		}

		await User.findByIdAndUpdate(course.instructor._id, {
			$pull: { courses: courseId },
		});

		await Course.findByIdAndDelete(courseId);

		// for (let i = 0; i < courseContent.length; i++) {
		// 	const secId = courseContent[i];

		// 	const section = await Section.findById(secId);

		// 	await SubSection.deleteMany({ _id: { $in: section.subSection } });

		// 	await Section.findByIdAndDelete(secId);
		// }

		return res.status(200).json({
			success: true,
			message: "Course Deleted Successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

exports.getFullCourseDetails = async (req, res) => {
	try {
		const { courseId } = req.body;
		const userId = req.user.id;

		const courseDetails = await Course.findOne({ _id: courseId })
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			.populate("ratingAndReview")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		const courseProgressCount = await CourseProgress.findOne({
			courseId: courseId,
			userId: userId,
		});
		console.log("courseProgressCount : ", courseProgressCount);

		if (!courseDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find course with id: ${courseId}`,
			});
		}

		let totalDurationInSeconds = 0;
		courseDetails.courseContent.forEach((content) => {
			content.subSection.forEach((subSection) => {
				const timeDurationInSeconds = parseInt(subSection.timeDuration);
				totalDurationInSeconds += timeDurationInSeconds;
			});
		});

		const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

		return res.status(200).json({
			success: true,
			data: {
				courseDetails,
				totalDuration,
				completdVideos: courseProgressCount?.completedVideos
					? courseProgressCount?.completedVideos
					: [],
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
