const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const mailSender = require("../utils/mailSender");
const {
	courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const { paymentSuccess } = require("../mail/templates/paymentSuccess");

//initalalize the razorpay order
exports.capturePayment = async (req, res) => {
	try {
		const { courses } = req.body;
		const userId = req.user.id;

    console.log("user ID TYPE", typeof(userId));
		if (courses.length === 0) {
			return res.json({
				success: false,
				message: "No Courses Selected",
			});
		}

    console.log("COURSE IS", courses);
    let totalAmount = 0;
    
		for (const course_id of courses) {
      console.log("COURSE ID is", course_id);
      // console.log("COURSE ID is NEW Wala", course_id.courseId);
      console.log("COURSE ID TYPE", typeof(course_id));
      // console.log("COURSE ID is NEW Wala", typeof(course_id.courseId));
      let course;
			try {
				course = await Course.findById(course_id);
				if (!course) {
					return res.status(400).json({
						success: false,
						message: `Course with id ${course_id} not found`,
					});
				}
				const uid = new mongoose.Types.ObjectId(userId);
				if (course.studentsEnrolled.includes(uid)) {
					return res.status(400).json({
						success: false,
						message: "You have already enrolled this course",
					});
				}
				totalAmount += course.price;
			} catch (error) {
				console.log(error);
				return res.status(500).json({ success: false, message: error.message });
			}
		}

		const options = {
			amount: totalAmount * 100,
			currency: "INR",
			receipt: Math.random(Date.now()).toString(),
		};

		try {
			const paymentResponse = await instance.orders.create(options);
			res.json({
				success: true,
				message: paymentResponse,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

//verify payment

exports.verifyPayment = async (req, res) => {
	const razorpay_order_id = req.body?.razorpay_order_id;
	const razorpay_payment_id = req.body?.razorpay_payment_id;
	const razorpay_signature = req.body?.razorpay_signature;
	const courses = req.body?.courses;
	const userId = req.user.id;

	if (
		!razorpay_order_id ||
		!razorpay_payment_id ||
		!razorpay_signature ||
		!courses ||
		!userId
	) {
		return res.status(400).json({
			success: false,
			message: "Payment Failed.",
		});
	}

	let body = razorpay_order_id + "|" + razorpay_payment_id;

	const expectedSignature = crypto
		.createHmac("sha256", process.env.RAZORPAY_SECRET)
		.update(body.toString())
		.digest("hex");

	if (expectedSignature === razorpay_signature) {
		await enrollStudents(courses, userId, res);
		return res.status(200).json({
			success: true,
			message: "Payment Verified",
		});
	}
	return res.stats(200).json({
		success: false,
		message: "Payment Failed",
	});
};

const enrollStudents = async (courses, userId, res) => {
	if (!courses || !userId) {
		return res.staus(400).son({
			success: false,
			error: "Course or User not found",
		});
	}

	for (const courseId of courses) {
		try {
			const enrolledCourse = await Course.findByIdAndUpdate(
				{ _id: courseId },
				{
					$push: { studentsEnrolled: userId },
				},
				{ new: true }
			);

			if (!enrolledCourse) {
				return res.status(400).json({
					success: false,
					error: `Couldn't add student to the course`,
				});
			}

			const courseProgress = await CourseProgress.create({
				courseId: courseId,
				userId: userId,
				completedVideos:[],
			})


			const enrolledStudent = await User.findByIdAndUpdate(
				{ _id: userId },
				{ $push: { courses: courseId } },
				{ new: true }
			);

			const emailResponse = await mailSender(
				enrolledStudent.email,
				`Successfully Enrolled into ${enrolledCourse.courseName}`,
				courseEnrollmentEmail(
					enrolledCourse.courseName,
					`${enrolledStudent.firstName}`
				)
			);
			console.log("Email Sent Successfully", emailResponse);
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				error: "Server Error",
			});
		}
	}
};

exports.sendPaymentSuccessEmail = async (req, res) => {
	const { orderId, paymentId, amount } = req.body;

	const userId = req.user.id;

	if (!orderId || !paymentId || !amount || !userId) {
		return res.status(400).json({
			success: false,
			error: "Please provide all required fields.",
		});
	}

	try {
		const enrolledStudent = await User.findById(userId);

		await mailSender(
			enrolledStudent.email,
			`Payment Recived`,
			paymentSuccess(
				`${enrolledStudent.firstName}`,
				amount / 100,
				orderId,
				paymentId
			)
		);
	} catch (error) {
		console.log("error in sending mail", error);
		return res.status(500).json({
			success: false,
			error: "Error in server.",
		});
	}
};




// capture payment ans initaite the razorpay order

// exports.capturePayment = async (req, res) => {
//   try {
//     //get courseid,userid
//     //validate
//     //valid course id
//     //user already pay for the same course
//     //order create
//     //response

//     const userId = req.user.id;
//     const courseId = req.body;

//     if (!courseId) {
//       return res.status(401).json({
//         success:false,
//         message: 'Please provide valid course id'
//       });
//     }

//     let course;
//     try {
//       course = await Course.findById(courseId);
//       if (!course) {
//         return res.status(401).json({
//           success:false,
//           message: 'Could not find the course'
//         });
//       }

//       const uid = new mongoose.Types.ObjectId(userId);

//       if (course.studentsEnrolled.includes(uid)) {
//         return res.status(200).json({
//           success: false,
//           message: "You have already enrolled this course"
//         })
//       }
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }

//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: Math.random(Date.now()).toString(),
//       notes: {
//         courseId: courseId,
//         userId
//       }
//     }

//     try {
//       //initiate payment using razor pay
//       const paymentResponse = await instance.orders.create(options);
//       console.log(paymentResponse);

//       return res.status(200).json({
//         success: true,
//         message: '',
//         courseName: course.courseName,
//         courseDescription: course.courseDescription,
//         thumbnail: course.thumbnail,
//         orderId: paymentResponse.id,
//         currency: paymentResponse.currency,
//         amount: paymentResponse.amount,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: 'could not initiate the order',
//       })
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// exports.verifysignature = async (req, res) => {
//   const webHookSecret = "12345678"

//   const signature = req.headers["x-razorpay-signature"];

//   const shasum = crypto.createHmac("sha256", webHookSecret);
//   shasum.update(JSON.stringify(req.body));

//   const digest = shasum.digest('hex');

//   if (signature === digest) {
//     console.log('Payment is authorized');

//     //get user id and courseid from notes

//     const { courseId, userId } = req.body.payment.entity.notes;

//     try {
//       //fulfill the action

//       // 1 -> find the course and add student in studentsenrolled array
//       // 2 -> find the student and add course id in courses array

//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         {
//           $push: {
//             studentsEnrolled:userId,
//           }
//         },
//         {new:true}
//       )

//       if (!enrolledCourse) {
//         return res.status(500).json({
//           success: false,
//           message: 'course could not be found'
//         })
//       }

//       console.log(enrolledCourse);
//       const enrolledStudent = await User.findOneAndUpdate(
//         { _id: userId },
//         {
//           $push: {
//             courses:courseId
//           }
//         },
//         {new:true}
//       )

//       console.log(enrolledStudent);

//       //student succcessfully registered to course -> send confirmation mail

//       const emailResponse = await mailSender(enrolledStudent.email, "Congragulations, from polylingo :)", "Congragulations, you are onboarded into new polylingo Course");

//       console.log(emailResponse);
//       return res.status(200).json({
//         success: true,
//         message:"Signature verified and Course Added"
//       })
//     } catch (error) {
//       console.log(error);
//       return res.status(500).josn({
//         success: false,
//         error: error.message
//       })
//     }
//   }
//   else {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid signature',
//     });
//   }

// }
