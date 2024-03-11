// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const User = require("../models/User");

// //auth
// exports.auth = async (req, res, next) => {
// 	try {
// 		// const token = req.cookies.token || req.header("Authorization").replace("Bearer ") || req.body.token;
// 		// const token = req.cookies.token || req.header("Authorization").replace("Bearer ","") ;

//     // const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

//     const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
// 		if (!token) {
// 			return res.status(401).json({
// 				status: false,
//         message: "Token is missing ",

// 			});
// 		}

// 		try {
// 			const decode = jwt.verify(token, process.env.JWT_SECRET);
// 			console.log("Decode ", decode);
//       req.user = decode;
//       console.log('logging token   ',token);
// 		} catch (error) {
// 			return res.status(401).json({
// 				status: false,
//         message: "Token is invalid",
//         error:error,
// 			});
// 		}

// 		next();
// 	} catch (error) {
// 		return res.status(400).json({
// 			status: false,
// 			message: "Somethig went wrong while validating the token",
// 		});
// 	}
// };

// //student
// exports.isStudent = async (req, res, next) => {
//   try {
//     if (req.user.accountType !== "Student") {
//       return res.status(403).json({
//         status: false,
//         message: "This is protected route for students"
//       })
//     }
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       status: false,
//       message:"User role can not be verified, please try again"
//     })
//   }
// }

// exports.isInstructor = async (req, res, next) => {
//   try {
//     if (req.user.accountType !== "Instructor") {
//       return res.status(403).json({
//         status: false,
//         message: "This is protected route for Instructor only"
//       })
//     }
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       status: false,
//       message:"User role can not be verified, please try again"
//     })
//   }
// }

// exports.isAdmin = async (req, res, next) => {
//   try {
//     console.log("--- ",req.user);
//     if (req.user.accountType !== "Admin") {
//       return res.status(403).json({
//         status: false,
//         message: "This is protected route for Admin"
//       })
//     }
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       status: false,
//       message:"User role can not be verified, please try again"
//     })
//   }
// }

const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
	try {
		//extracting..
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		//if token is  missing...
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "TOken is missing",
			});
    }
    
    console.log('TOKEN is ))) ',token);

		//verifying... the token
		try {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			req.user = decode;
		} catch (error) {
			//verification - issue
			return res.status(401).json({
				success: false,
        message: "token is invalid",
        error:error
			});
		}
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Something went wrong while validating the token",
		});
	}
};

//isStudent
exports.isStudent = async (req, res, next) => {
	try {
		if (req.user.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a protected route for Students only",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "User role cannot be verified, please try again",
		});
	}
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
	try {
		if (req.user.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a protected route for Instructor only",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "User role cannot be verified, please try again",
		});
	}
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
	try {
		if (req.user.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a protected route for Admin only",
			});
		}
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "User role cannot be verified, please try again",
		});
	}
};