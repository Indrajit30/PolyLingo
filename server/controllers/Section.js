const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
	try {
		//data
		//validation ->data
		//create section
		//update course with section id
		const { sectionName, courseId } = req.body;

		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "All fields required",
			});
		}
		const newSection = await Section.create({ sectionName });
		// let updatedCourse = await Course.findByIdAndUpdate(courseId,{ $push:{sections : newSection._id}},{
		const updatedCourse = await Course.findByIdAndUpdate(
			{ _id: courseId },
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		//HW how to populate section and subsection
		return res.status(200).json({
			success: true,
			message: "Section Created Successfully",
			updatedCourse,
			// data: updatedCourseDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Error in creationg a section",
			error: error.message,
		});
	}
};

exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId, courseId } = req.body;

		if (!sectionName || !sectionId) {
			return res.status(400).json({
				success: false,
				message: "All fields required",
			});
		}

		const section = await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{
				sectionName: sectionName,
			},
			{ new: true }
		);
		const course = await Course.findById(courseId)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		return res.status(200).json({
			success: true,
			message: "Section Updated Successfully",
			data: course,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Error in updating the section",
			error: error.message,
		});
	}
};

// exports.deleteSection = async (req, res) => {
// 	try {
// 		const { sectionId, courseId } = req.body;

// 		console.log("hgjfkdl.....",sectionId,courseId);

// 		await Course.findByIdAndUpdate(courseId ,{
// 				$pull: {
// 					courseContent:  sectionId ,
// 				},
// 			}
// 		);

// 		const section = await Section.findById(sectionId);
// 		console.log(sectionId, courseId);
// 		if(!section) {
// 			return res.status(404).json({
// 				success:false,
// 				message:"Section not Found",
// 			})
// 		}
		
// 		await SubSection.deleteMany({ _id: { $in: section.subSection } });
		
// 		await Section.findByIdAndDelete(sectionId);

// 		const course = await Course.findById(courseId)
// 			.populate({
// 				path: "courseContent",
// 				populate: {
// 					path: "subSection",
// 				},
// 			})
// 			.exec();
// 		return res.status(200).json({
// 			success: true,
// 			message: "Section Deleted Successfully",
// 			data: course,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Error in deleting the section",
// 			error: error.message,
// 		});
// 	}
// };


exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			dates:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   