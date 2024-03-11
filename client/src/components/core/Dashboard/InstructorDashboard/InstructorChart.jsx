import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function InstructorChart({ courses }) {
	const [currentChart, setCurrentChart] = useState("students");
	// const [currentChart, setCurrentChart] = useState("instructor");

	const getRandomColors = (numColors) => {
		const colors = [];
		for (let i = 0; i < numColors; i++) {
			const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
				Math.random() * 256
			)},${Math.floor(Math.random() * 256)})`;
			colors.push(color);
		}
		return colors;
		// console.log("colors",colors);
	};

	// const data = {
	//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	//   datasets: [
	//     {
	//       label: '# of Votes',
	//       data: [12, 19, 3, 5, 2, 3],
	//       backgroundColor: [
	//         'rgba(255, 99, 132, 0.2)',
	//         'rgba(54, 162, 235, 0.2)',
	//         'rgba(255, 206, 86, 0.2)',
	//         'rgba(75, 192, 192, 0.2)',
	//         'rgba(153, 102, 255, 0.2)',
	//         'rgba(255, 159, 64, 0.2)',
	//       ],
	//       borderColor: [
	//         'rgba(255, 99, 132, 1)',
	//         'rgba(54, 162, 235, 1)',
	//         'rgba(255, 206, 86, 1)',
	//         'rgba(75, 192, 192, 1)',
	//         'rgba(153, 102, 255, 1)',
	//         'rgba(255, 159, 64, 1)',
	//       ],
	//       borderWidth: 1,
	//     },
	//   ],
	// };

	//create data for student info

	const studentData = {
		labels: courses.map((course) => course.courseName),
		datasets: [
			{
				label: "number of students",
				data: courses.map((course) => course.totalStudentsEnrolled),
				backgroundColor: getRandomColors(courses.length),
			},
		],
	};
	//create data for income info
	const incomeData = {
		labels: courses.map((course) => course.courseName),
		datasets: [
			{
				label: `income from `,
				data: courses.map((course) => course.totalAmountGenerated),
				backgroundColor: getRandomColors(courses.length),
			},
		],
	};

	// options
	const options = { maintainAspectRatio: false };
	getRandomColors(10);
	return (
		// <div>InstructorChart</div>
		<div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6 ">
			<p className="text-lg font-bold text-richblack-5">Visualize</p>

			<div className="space-x-4 font-semibold">
				<button
					onClick={() => setCurrentChart("students")}
					className={`rounded-sm p-1 px-3 transition-all duration-200 
          ${
						currentChart === "students"
							? "bg-richblack-700 text-yellow-50"
							: "text-yellow-400"
					} `}
				>
					Students
				</button>
				<button
					onClick={() => setCurrentChart("income")}
					className={`rounded-sm p-1 px-3 transition-all duration-200 
          ${
						currentChart === "income"
							? "bg-richblack-700 text-yellow-50"
							: "text-yellow-400"
					} `}
				>
					Income
				</button>
			</div>

			<div className="relative mx-auto aspect-square h-full w-full">
        <Pie
          height={200}
          data={currentChart === "students" ? studentData : incomeData}
          options={options}
				></Pie>
			</div>
		</div>
	);
}

export default InstructorChart;
