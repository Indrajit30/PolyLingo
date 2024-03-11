// import React from "react";
// // import Swiper from 'swiper';
// import { Swiper, SwiperSlide } from "Swiper/react";
// import { FreeMode, Pagination, Autoplay } from "Swiper"
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import Course_Card from "./Course_Card";

// function CourseSlider({ Courses }) {
// 	console.log(Courses);
// 	return (
// 		<>
// 			{Courses?.length > 0 ? (
// 				<Swiper
// 					slidesPerView={1}
// 					spaceBetween={25}
// 					loop={true}
// 					modules={[FreeMode, Pagination, Autoplay]}
// 					autoplay={{
// 						delay: 2000,
// 						disableOnInteraction: false,
// 					}}
// 					breakpoints={{
// 						1024: {
// 							slidesPerView: 3,
// 						},
// 					}}
// 					className="max-h-[30rem]"
// 				>
// 					{Courses?.map((course, index) => (
// 						<SwiperSlide key={index}>
// 							<Course_Card course={course} Height={"h-[250px]"}></Course_Card>
// 						</SwiperSlide>
// 					))}
// 				</Swiper>
// 			) : (
// 				<div>No Courses Found</div>
// 			)}
// 		</>
// 	);
// }

// export default CourseSlider;


import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Pagination, Autoplay,Navigation,Keyboard } from 'swiper/modules';

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';

import Course_Card from "./Course_Card"

function CourseSlider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          navigation={true}
          keyboard={true}
          loop={true}
          
          pagination={{dynamicMainBullets:true}}
          modules={[FreeMode, Pagination, Autoplay,Navigation,Keyboard]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
          }}
      
          // className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[300px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
