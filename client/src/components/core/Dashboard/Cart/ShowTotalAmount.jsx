import React from 'react'
import IconBtn from '../../../common/IconBtn'
import { buyCourse } from '../../../../services/operations/StudentFeaturesApi';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function ShowTotalAmount() {
  const { total,cart } = useSelector((state) => state.cart);

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // function handleBuyMyCourse() {
  //   const courses = cart.map((course) => course._id);
  // }


  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    buyCourse(token, courses, user, navigate, dispatch);
		// if (!token) {
		// 	setConfirmationModal({
		// 		text1: "You are not Logged in",
		// 		text2: "Please login to purchase the course",
		// 		btn1Text: "Login",
		// 		btn2Text: "Cancel",
		// 		btn1Handler: () => navigate("/login"),
		// 		btn2Handler: () => setConfirmationModal(null),
		// 	});
		// }
	};
  return (
    <div className='min-w-[280px] rounded-md border flex flex-col border-richblack-700 bg-richblack-800 p-6'>
      <p className='text-richblack-200 text-sm font-medium mb-3 '>Total:</p>
      <p className='text-2xl font-medium mb-5 text-yellow-25'>Rs {total}</p>

      <IconBtn
        text='Buy Now'
        onclick={handleBuyCourse}
        customClasses='w-full justify-centre'
      >

      </IconBtn>
    </div>
  )
}

export default ShowTotalAmount