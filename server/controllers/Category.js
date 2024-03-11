const Category = require("../models/Category");
const Courses = require("../models/Course");
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name || !description) {
			return res.status(400).json({
				success: false,
				error: "All fields required",
			});
		}
		const categoryDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(categoryDetails);
		return res.status(200).json({
			success: true,
			message: "Category created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
		const allCategories = await Category.find(
			{},
			{ name: true, description: true }
		);
		res.status(200).json({
			success: true,
			data: allCategories,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;
		console.log("categoryId-----", categoryId);

		const selectedCategory = await Category.findById({ _id: categoryId })
			.populate({
				path: "courses",
				match: { status: "Published" },
				populate: "ratingAndReview",
			})
			.exec();
		console.log("SELECTED------category COURSE", selectedCategory);

		if (!selectedCategory) {
			return res.status(400).json({
				success: false,
				message: "No such category found!",
			});
		}

		// Get courses for other categories

		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		});

		let differentCategory = await Category.findOne({
			_id: categoriesExceptSelected[
				getRandomInt(categoriesExceptSelected.length)
			]._id,
		})
			.populate({
				path: "courses",
				match: { status: "Published" },
			})
			.exec();

		const allCategories = await Category.find()
			.populate({
				path: "courses",
				match: { status: "Published" },
				populate: {
					path: "instructor",
				},
			})
			.exec();

		const allCourses = allCategories.flatMap((category) => category.courses);

		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		console.log("mostSellingCourses COURSE", mostSellingCourses);

		return res.status(200).json({
			success: true,
			data: {
				selectedCategory,
				differentCategory,
				mostSellingCourses,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
