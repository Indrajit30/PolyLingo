const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//send otp

exports.sendOTP = async (req, res) => {
	try {
		const { email } = req.body;

		const checkUserPresent = await User.findOne({ email });

		if (checkUserPresent) {
			return res.status(401).json({
				success: false,
				message: "User already registered",
			});
		}

		//generate otp
		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		console.log("Otp Generated successfully ", otp);
		let result = await OTP.findOne({ otp: otp });

		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
				lowerCaseAlphabets: false,
				specialChars: false,
			});
			result = await OTP.findOne({ otp: otp });
		}

		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log(otpBody);

		res.status(200).json({
			success: true,
			message: `An OTP has been sent to your Email`,
			otp,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//signup

exports.signup = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;

		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(400).json({
				success: false,
				message: "All fields required",
			});
		}

		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Passwords and confirm password do not match",
			});
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exist please login",
			});
		}

		// const recentOtp = await OTP.find({ email })
		// 	.sort({ createdAt: -1 });
		// const response = await OTP.find({ email })
		// 	.sort({ createdAt: -1 })
		// 	.limit(1);
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

		// const reqOtp = recentOtp[0].otp;
		console.log("otp find in db is ", response);
		if (response[0].otp.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Otp not found",
			});
		} else if (otp !== response[0].otp) {
			return res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const profileDeatils = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			contactNumber,
			accountType,
			additionalDetails: profileDeatils._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			message: "User is registered Successsfully",
			user,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "User can not be registered. Please try again",
		});
	}
};
// login

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(500).json({
				success: false,
				message: "Please enter all fields",
			});
		}

		const user = await User.findOne({ email }).populate("additionalDetails");

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User does not exist",
			});
		}

		if (await bcrypt.compare(password, user.password)) {
			const payload = {
				email: user.email,
				id: user._id,
				accountType: user.accountType,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "2h",
			});

			user.token = token;
			user.password = undefined;

			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};

			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: "user logged in successsfully",
			});
		} else {
			return res.status(401).json({
				success: false,
				message: "Password is incorrect",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Login Failure, please try again",
		});
	}
};
// change pass

exports.changePassword = async (req, res) => {};
