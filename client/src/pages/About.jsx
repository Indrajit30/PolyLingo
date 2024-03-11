import React from "react";
import HighLightText from "../components/core/HomePage/HighLightText";
import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactForm from "../components/core/AboutPage/ContactForm";
import Footer from '../components/common/Footer'
import ReviewSlider from "../components/common/ReviewSlider";


function About() {
	return (
		<div className="flex flex-col gap-16">
			<div className="bg-richblack-600 ">
				<div className="w-10/12 mx-auto flex flex-col relative max-w-maxContent gap-10">
					<h1 className="text-richblack-5 text-3xl font-bold text-center align-centre mt-6">
						Driving Innovation in Online Education for a{" "}
						<HighLightText text={"Brighter Future"}></HighLightText>
					</h1>
					<p className="text-richblack-300 text-center align-centre -mt-5 mb-8">
						polylingo is at the forefront of driving innovation in online
						education. We're passionate about creating a brighter future by
						offering cutting-edge courses, leveraging emerging technologies, and
						nurturing a vibrant learning community.
          </p>
          
          {/* <div className="flex justify-between  items-center">
            <img height={82} width={82} src={BannerImage1} alt="" />
            <img height={82} width={82} src={BannerImage2} alt="" />
            <img height={82} width={82} src={BannerImage3} alt="" />
          </div> */}

          <div className="h-[50px] md:h-[150px]"></div>
          <div className="grid gap-3 grid-cols-3 w-[100%] absolute bottom-0 left-[50%] translate-x-[-50%]  translate-y-[30%] lg:gap-5">
            <img  src={BannerImage1} alt="" />
            <img  src={BannerImage2} alt="" />
            <img  src={BannerImage3} alt="" />
          </div>
          {/* <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div> */}

				</div>
			</div>
      <div className='w-10/12 mx-auto max-w-maxContent border-b border-richblack-700'>
        <div className=" max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] xl:h-[200px]"></div>
          <Quote></Quote>
        </div>
      </div>

      <div className="w-10/12 mx-auto flex flex-col gap-10 mt-16 lg:flex-row justify-between lg:mt-20">
        <div className="flex flex-col gap-8 lg:w-[50%]">
          <div className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Founding Story</div>
          <div className="flex flex-col gap-8 text-base font-medium text-richblack-300">
            <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
            <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
          </div>
        </div>
        <div>
          <img className="shadow-[0_0_20px_0] shadow-[#FC6767]" src={FoundingStory} alt="" />
        </div>
        
      </div>

      <div className="w-10/12 mt-28 mx-auto flex flex-col gap-14 lg:flex-row justify-between lg:gap-32">
        <div className="flex flex-col gap-6">
          <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Vision</h1>
          <p className="text-base font-medium text-richblack-300 ">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">Our Mission</h1>
          <p className="text-base font-medium text-richblack-300 ">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
        </div>
      </div>

      <div className="bg-richblack-700  grid grid-cols-2 py-2 lg:grid-cols-4 lg:py-8">
        <div className="flex flex-col gap-2 justify-center items-center py-2">
          <div className="text-2xl text-richblack-5 font-bold">5K</div>
          <span className="text-base font-medium text-richblack-300">Active Students </span>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center py-2">
          <div className="text-2xl text-richblack-5 font-bold">10+</div>
          <span className="text-base font-medium text-richblack-300">Mentors </span>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center py-2">
          <div className="text-2xl text-richblack-5 font-bold">200+</div>
          <span className="text-base font-medium text-richblack-300">Courses </span>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center py-2">
          <div className="text-2xl text-richblack-5 font-bold">50+</div>
          <span className="text-base font-medium text-richblack-300">Awards </span>
        </div>
        

      </div>
      <section className="mx-auto mt-20 flex w-10/12 max-w-maxContent flex-col justify-between gap-10 text-white"> 
        <ContactForm></ContactForm>
        {/* <ContactFormSection /> */}
      </section>

      <div className="relative mx-auto my-20 flex w-10/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer></Footer>
		</div>
	);
}

export default About;
