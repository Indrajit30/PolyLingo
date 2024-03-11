const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { trusted } = require("mongoose");

//reset password token
exports.resetPasswordToken = async (req, res) => {
	try {
		//email,check email,
		//generate token
		// update user in db
		// create url
		// send mail
		const email = req.body.email;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User already donot exist please register",
			});
		}

		const token = crypto.randomBytes(20).toString('hex');
		const updatedDeatails = await User.findOneAndUpdate(
			{ email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 5 * 60 * 1000,
			},
			{ new: true }
		);
		const url = `http://localhost:3000/update-password/${token}`;
		await mailSender(email, "Password Reset", `Password Reset Link: ${url}`);

		return res.json({
			success: true,
			message: "Email sent successfully! Check your Inbox.",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Somethig went wrong while sending the mail",
		});
	}
};

// reset password

exports.resetPassword = async (req, res) => {
	try {
		// const token = req.params.token;
		const { password, confirmPassword, token } = req.body;

		if (password !== confirmPassword) {
			return res.json({
				success: false,
				message: "Passwords do not match",
			});
		}

		const userDetails = await User.findOne({ token: token });

		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is invalid",
			});
		}
		if (userDetails.resetPasswordExpires < Date.now()) {
			return res.json({
				success: false,
				message: "Link has expired, please generate new token",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: hashedPassword },
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "Password reset Successfull",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Something went wrong while sending reset password mail",
		});
	}
};
