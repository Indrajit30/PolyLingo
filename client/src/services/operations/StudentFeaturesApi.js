import toast from "react-hot-toast";
import { StudentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
// import rzpLogo from '../../assets/Logo/rzp_logo.png'
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import rzpLogo from "../../assets/Logo/rzp_logo.png";


import env from "react-dotenv";
// const dotenv = require('dotenv');
// dotenv.config();


const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY;

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_MAIL_API } =
	StudentEndpoints;

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = src;

		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};

		document.body.appendChild(script);
	});
}

export async function buyCourse(
	token,
	courses,
	userDetails,
	navigate,
	dispatch
) {
	const toastId = toast.loading("Loading...");

	try {
		// const res = await loadScript('https://checkout.razorpay.com/vi/checkout.js')

		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);

		if (!res) {
			toast.error("RazorPay SDK failed to load");
		}

		//initiate the order
		const orderResponse = await apiConnector(
			"POST",
			COURSE_PAYMENT_API,
			{ courses },
			{ Authorization: `Bearer ${token}` }
		);

		if (!orderResponse.data.success) {
			throw Error(orderResponse.data.message);
		}

		// console.log("ORDER RESPONSE IS----", orderResponse);
		// console.log("ORDER RESPONSE data data IS----", orderResponse.data.message);

		const options = {
			key: RAZORPAY_KEY,
			currency: orderResponse.data.message.currency,
			// amount: `${orderResponse.data.data.amount}`,
			amount: `${orderResponse.data.message.amount}`,
			order_id: orderResponse.data.message.id,
			name: "polylingo",
			description: "Thank You for Purchasing the Course",
			image: rzpLogo,
			prefill: {
				name: `${userDetails.firstName}`,
				email: userDetails.email,
			},
			handler: function (response) {
				sendPaymentSuccessEmail(
					response,
					orderResponse.data.message.amount,
					token
				);

				verifyPayment({ ...response, courses }, token, navigate, dispatch);
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
		paymentObject.on("payment.failed", function (response) {
			toast.error("oops, payment failed");
			console.log("PAYMENT OBJECT ERROR... ", response.error);
		});
	} catch (error) {
		console.log("PAYMENT API ERROR....", error);
		toast.error("Could not make Payment");
	}
	toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    console.log("THE RESPONSE RECIVED IS--->",response)
		const answer=await apiConnector(
			"POST",
			SEND_PAYMENT_SUCCESS_MAIL_API,
			{
				orderId: response.razorpay_order_id,
				paymentId: response.razorpay_payment_id,
				amount,
			},
			{
				Authorization: `Bearer ${token}`,
			}
    );
    console.log(answer);
	} catch (error) {
		console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
	}
}
async function verifyPayment(bodyData, token, navigate, dispatch) {
	const toastId = toast.loading("Verifying Payment....");

	dispatch(setPaymentLoading(true));
	try {
		const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
			Authorization: `Bearer ${token}`,
		});

		if (!response.data.success) {
			throw new Error(response.data.message);
		}

		toast.success("Payment successfull, you are added to the course");
		navigate("/dashboard/enrolled-courses");
		dispatch(resetCart());
	} catch (error) {
		console.log("PAYMENT VERIFY ERROR...", error);
		toast.error("Could nor verify Payment");
	}
	toast.dismiss(toastId);
	dispatch(setPaymentLoading(false));
}
