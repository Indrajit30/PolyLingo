import React from "react";
import Buttton from "./Buttton";
import HighLightText from "./HighLightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
	position,
	heading,
	subheading,
	ctabtn1,
	ctabtn2,
	codeblock,
	backGradient,
	codeColor,
}) {
	return (
		<div className={`flex flex-col ${position} my-20 relative justify-between gap-14 lg:gap-10`}>
			{/* section 1 */}
			<div className="w-[100%] lg:w-[40%] flex flex-col gap-8">
				{heading}
				<p className="text-richblack-300 font-bold ">{subheading}</p>
				<div className="flex gap-7 mt-7">
					<Buttton active={ctabtn1.active} linkto={ctabtn1.link2}>
						<div className="flex gap-2 items-center">
							{ctabtn1.text}
							<FaArrowRight />
						</div>
					</Buttton>
					<Buttton active={ctabtn2.active} linkto={ctabtn2.link2}>
						<div className="flex gap-2 items-center">
							{ctabtn2.text}
							<FaArrowRight />
						</div>
					</Buttton>
				</div>
			</div>

			{/* section 2 */}

			<div className='h-fit flex  w-[100%] py-4 lg:w-[500px] px-2 z-10 code-border gap-1'>
				{backGradient}
				{/* shadow-[5px_5px_0px_0px_rgba(109,40,217)] */}
				{/* BG->Gradient add */}
				<div className="text-centre flex flex-col w-[5%] items-center text-richblue-400 font-inter font-bold">
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>4</p>
					<p>5</p>
					<p>6</p>
					<p>7</p>
					<p>8</p>
					<p>9</p>
					<p>10</p>
					<p>11</p>
				</div>

				<div
					className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
				>
					<TypeAnimation
						style={{ whiteSpace: "pre-line",display:"block" }}
						sequence={[
							// `Line one\nLine Two\nLine Three\nLine Four\nLine Five\nLine Seven`, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
              codeblock,
              2000,
							"",
            ]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            
					></TypeAnimation>
				</div>
			</div>
		</div>
	);
}

export default CodeBlocks;
