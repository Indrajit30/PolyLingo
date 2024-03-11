import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighLightText";
import CourseCard from "./CourseCard";


const tabsNames = [
	"Free",
	"New to Coding",
	"Most Popular",
	"Skill Paths",
	"Career Paths",
];

function ExploreMore() {
	const [currTab, setCurrTab] = useState(tabsNames[0]);
	const [courses, setCourses] = useState(HomePageExplore[0].courses);
	const [currCard, setCurrCard] = useState(
		HomePageExplore[0].courses[0].heading
	);

	const setMyCards = (value) => {
		setCurrTab(value);
		const result = HomePageExplore.filter((course) => course.tag === value);
		setCourses(result[0].courses);
		setCurrCard(result[0].courses[0].heading);
	};
	return (
		<div>
			<div className="font-semibold text-4xl text-center">
				Unlock the
				<HighLightText text={"Power of Languages"}></HighLightText>
			</div>
			<p className="mb-5 text-center text-richblack-300 text-lg  mt-3">
				Get fluent any any language
			</p>
			<div className="hidden lg:flex lg:gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
				{/* {tabsNames.map((elem, i) => {
					return (
						<div
							key={i}
							className={`text-lg flex items-center p-2 mx-2 ${
								currTab === elem
									? "bg-richblack-900 text-richblack-5 font-medium"
									: "text-richblack-200 "
							} rounded-full transition-all duration-200 cursor-pointer px-7 py-2 hover:bg-richblack-900 hover:text-richblack-5`}
							onClick={() => setMyCards(elem)}
						>
							{elem}
						</div>
					);
				})} */}
      </div>
      
      <div className="lg:h-[50px]"></div>

      {/* course coard ka gorup */}
      <div className='flex flex-col gap-10 lg:flex-row'>
        {courses.map((elem, i) => (
          <CourseCard currentCard={currCard} cardData={elem} key={i} setCurrentCard={setCurrCard}></CourseCard>
        ))}
      </div>
		</div>
  );
}

export default ExploreMore;
