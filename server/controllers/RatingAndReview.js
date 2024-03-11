const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");

exports.createRating = async (req, res) => {
	try {
		//userid
		//data body
		//user enrolled or not
		//check if user already give rating
		//create
		//update course with the id of rating

		const userId = req.user.id;
		const { rating, review, courseId } = req.body;

		const courseDetails = await Course.findOne({
			_id: courseId,
			studentsEnrolled: { $elemMatch: { $eq: userId } },
		});

		if (!courseDetails) {
			return res.status(401).json({
				success: false,
				message: "Student is not enrolled in this course",
			});
		}

		const alreadyReviewed = await RatingAndReview.findOne({
			user: userId,
			course: courseId,
		});

		if (alreadyReviewed) {
			return res.status(409).json({
				success: false,
				message: "You have already given a review for this course",
			});
		}

		//create rating and review
		const ratingReview = await RatingAndReview.create({
			rating: rating,
			review: review,
			user: userId,
			course: courseId,
		});

		//update course and student

		const updatedCourse = await Course.findByIdAndUpdate(
			{ _id: courseId },
			{
				$push: {
					RatingAndReview: ratingReview._id,
				},
			},
			{ new: true }
		);
		console.log(updatedCourse);
		// const updatedStudent = await User.findOne(
		//   { _id: userId },
		//   {
		//     $push: {
		//       RatingAndReview: ratingReview._id
		//     }
		//   }
		// )

		return res.status(200).json({
			success: true,
			message: "Rating and Review created successfully",
			data: ratingReview,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
exports.getAverageRating = async (req, res) => {
	try {
		const courseId = req.body.courseId;

		const result = await RatingAndReview.aggregate([
			{
				$match: {
					course: mongoose.Types.ObjectId(courseId),
				},
			},
			{
				$group: {
					_id: null,
					averageRating: { $avg: "$rating" },
				},
			},
		]);

		if (result.length > 0) {
			return res.status(200).json({
				success: true,
				averageRating: result[0].averageRating,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Average rating found is zero",
			averageRating: 0,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// exports.getAllRatingCourseSpecific = async (req, res) => {
// 	try {
// 		const courseId = req.body.courseId;
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).json({
// 			success: false,
// 			message: error.message,
// 		});
// 	}
// };


exports.getAllRating = async (req, res) => {
	try {

		// const allRating = await RatingAndReview.find({}).populate('user course');
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      }).exec();
    
    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    })
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
