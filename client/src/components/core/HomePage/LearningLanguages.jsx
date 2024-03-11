import React from "react";
import HighLightText from "./HighLightText";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import Buttton from "./Buttton";


function LearningLanguages() {
	return (
		<div className='bg-richblack-5'>
			<div className="flex flex-col gap-5 py-10 text-centre items-center mx-auto">
				<div className="flex items-center  text-4xl font-semibold">
					Your swiss knife for
					<HighLightText text={" learning new languages"}></HighLightText>
				</div>
				<p className=" text-richblack-600 mx-auto text-base">
					Using spin making learning multiple languages easy. with 20+ languages
					progress tracking, custom schedule and more.
				</p>

				<div className="flex flex-col items-center justify-center lg:flex-row ">
					<img
						src={Compare_with_others}
						alt=""
						className="object-contain lg:-mb-10 -mt-0 "
					/>
					<img
						src={Plan_your_lessons}
						alt=""
						className="object-contain  lg:-ml-36 -mt-16"
					/>
        </div>
        <Buttton active={true} linkto={'/login'} >Learn More</Buttton>
			</div>
		</div>
	);
}

export default LearningLanguages;
