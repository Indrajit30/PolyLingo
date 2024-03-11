const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const { uploadImageToCloudianry } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
	try {
		const { sectionId, title, description } = req.body;
		const video = req.files.video;

		if (!sectionId || !title || !description || !video) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const uploadDetails = await uploadImageToCloudianry(
			video,
			process.env.FOLDER_NAME
		);

		const subSectionDetails = await SubSection.create({
			title: title,
			description: description,
			timeDuration: `${uploadDetails.duration}`,
			videoUrl: uploadDetails.secure_url,
		});

		console.log("subSectionDetails ", subSectionDetails);

		const updatedSection = await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{
				$push: {
					subSection: subSectionDetails._id,
				},
			},
			{ new: true }
		).populate("subSection");

		//log the updated section after adding the populate query

		return res.status(200).json({
			success: true,
			message: "Sub-Section Created Successfully",
			data: updatedSection,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Error in creating a sub-section",
			error: error.message,
		});
	}
};

exports.updateSubsection = async (req, res) => {
	try {
		const { sectionId, subSectionId, title, description } = req.body;

		console.log(
			"From update subsection....",
			sectionId,
			subSectionId,
			title,
			description
		);

		const subSection = await SubSection.findById(subSectionId);
		if (!subSection) {
			return res.status(404).json({
				success: false,
				message: "SubSection not found",
			});
		}

		if (title !== undefined) {
			subSection.title = title;
		}
		if (description !== undefined) {
			subSection.description = description;
		}
		if (req.files && req.files.videoFile !== undefined) {
			const video = req.files.videoFile;
			const uploadDetails = await uploadImageToCloudianry(
				video,
				process.env.FOLDER_NAME
			);
			subSection.videoUrl = uploadDetails.secure_url;
			subSection.timeDuration = `${uploadDetails.duration}`;
		}

		await subSection.save();

		const updatedSectionDetails = await Section.findById(
			sectionId,
		).populate("subSection");

		return res.status(200).json({
			success: true,
			message: "Sub-Section Updated Successfully",
			data: updatedSectionDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Error in Updating the sub-section",
			error: error.message,
		});
	}
};

exports.updateSubSection = async (req, res) => {
	try {
		const { sectionId, subSectionId, title, description } = req.body;
		console.log(
			"From update subsection....",
			sectionId,
			subSectionId,
			title,
			description
		);
		const subSection = await SubSection.findById(subSectionId);

		if (!subSection) {
			return res.status(404).json({
				success: false,
				message: "SubSection not found",
			});
		}

		if (title !== undefined) {
			subSection.title = title;
		}

		if (description !== undefined) {
			subSection.description = description;
		}
		if (req.files && req.files.videoFile !== undefined) {
			const video = req.files.videoFile;
			const uploadDetails = await uploadImageToCloudinary(
				video,
				process.env.FOLDER_NAME
			);
			subSection.videoUrl = uploadDetails.secure_url;
			subSection.timeDuration = `${uploadDetails.duration}`;
		}

		await subSection.save();

		const updatedSection = await Section.findById(sectionId).populate(
			"subSection"
		);

		return res.json({
			success: true,
			data: updatedSection,
			message: "Section updated successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "An error occurred while updating the section",
		});
	}
};

exports.deleteSubsection = async (req, res) => {
	try {
		// const { subSectionId } = req.params;

		const { sectionId, subSectionId } = req.body;

		const course = await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{
				$pull: {
					subSection: { _id: subSectionId },
				},
			},
			{ new: true }
		);

		await SubSection.findByIdAndDelete(subSectionId);
		const updatedSection = await Section.findById(sectionId).populate(
			"subSection"
		);

		return res.status(200).json({
			success: true,
			data: updatedSection,
			message: "Sub-Section Deleted Successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Error in deleting the sub-section",
			error: error.message,
		});
	}
};
