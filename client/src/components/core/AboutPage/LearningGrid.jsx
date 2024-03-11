import React from "react";
import HighLightText from "../HomePage/HighLightText";
import Button from "../HomePage/Buttton";
const LearningGridArray = [
	{
		order: -1,
		heading: "World-Class Learning for",
		highliteText: "Anyone, Anywhere",
		description:
			"polylingo partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
		BtnText: "Learn More",
		BtnLink: "/",
	},
	{
		order: 1,
		heading: "Curriculum Based on Industry Needs",
		description:
			"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
	},
	{
		order: 2,
		heading: "Our Learning Methods",
		description:
			"polylingo partners with more than 275+ leading universities and companies to bring",
	},
	{
		order: 3,
		heading: "Certification",
		description:
			"polylingo partners with more than 275+ leading universities and companies to bring",
	},
	{
		order: 4,
		heading: `Rating "Auto-grading"`,
		description:
			"polylingo partners with more than 275+ leading universities and companies to bring",
	},
	{
		order: 5,
		heading: "Ready to Work",
		description:
			"polylingo partners with more than 275+ leading universities and companies to bring",
	},
];

function LearningGrid() {
	return (
		<div className="grid mx-auto grid-cols-1 lg:gap-10 lg:grid-cols-4">
			{LearningGridArray.map((elem, i) => (
				<div
					key={i}
					className={`${i === 0 && "lg:col-span-2"}
        ${
					elem.order % 2 === 1
						? "mx-auto  p-5 bg-richblack-700 w-[50%] lg:w-full "
						: "mx-auto p-5 bg-richblack-800 w-[50%] lg:w-full"
				}
        ${elem.order === 3 && "lg:col-start-2"}
				${elem.order<0 && 'bg-transparent'}
        `}
				>
					{elem.order < 0 ? (
						<div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
							<h1 className="text-4xl font-semibold">
								{elem.heading}
								<HighLightText text={elem.highliteText} />
							</h1>
							<p className="text-richblack-300 font-medium">
								{elem.description}
							</p>
							<div>
								<Button active={true} linkto={elem.BtnLink}>
									{elem.BtnText}{" "}
								</Button>
							</div>
						</div>
					) : (
						<div className="flex flex-col p-8 gap-5 ">
							<div className="text-richblack-5 text-lg">{elem.heading}</div>
							<p className="text-richblack-300 font-medium">
								{elem.description}
							</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default LearningGrid;
