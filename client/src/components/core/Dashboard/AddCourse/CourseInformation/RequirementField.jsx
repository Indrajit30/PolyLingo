import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { json } from "stream/consumers";

function RequirementField({
	name,
	label,
	register,
	errors,
	setValue,
	getValues,
}) {
	const { course, editCourse } = useSelector((state) => state.course);
	const [requirement, setRequirement] = useState("");
	const [requirementList, setRequirementList] = useState([]);

	const handleAddRequirement = () => {
		if (requirement) {
			setRequirementList([...requirementList, requirement]);
			setRequirement("");
		}
	};

	console.log("INSTS..", course?.instructions);
	const ans = JSON.stringify(course?.instructions);
	console.log("INSTS1234..", ans);


	const handleRemoveRequirement = (index) => {
		const updatedList = [...requirementList];
		updatedList.splice(index, 1);
		// requirementList.slice(index, 1);
		setRequirementList(updatedList);
	};

	useEffect(() => {
		if (editCourse) {
			setRequirementList(course?.instructions);
		}
		register(name, {
			required: true,
			validate: (value) => value.length > 0,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setValue(name, requirementList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requirementList]);

	// console.log("requirementList", requirementList);

	return (
		<div>
			<label htmlFor="">
				{label} <sup className="text-pink-200">*</sup>
			</label>
			<div className="flex flex-col items-start space-y-2">
				<input
					type="text"
					id={name}
					value={requirement}
					placeholder="Enter Instructions"
					onChange={(e) => setRequirement(e.target.value)}
					className="w-full text-richblack-5 form-style"
				/>
				<button
					className="font-semibold text-yellow-50 ml-2"
					type="button"
					onClick={handleAddRequirement}
				>
					Add
				</button>
				{/* <button type='button' onClick={handleRemoveRequirement}>remove</button> */}
			</div>

			

			

			{requirementList.length > 0 && (
				<ul className="mt-2 list-inside list-disc">
					{requirementList.map((requirement, index) => (
						<li key={index} className="flex items-center text-richblack-5">
							<span>{requirement}</span>
							<button
								type="button"
								className="ml-2 text-xs text-pure-greys-300 "
								onClick={() => handleRemoveRequirement(index)}
							>
								clear
							</button>
						</li>
					))}
				</ul>
			)}
			{errors[name] && (
				<span className="ml-2 text-xs tracking-wide text-pink-200">
					{label} is required
				</span>
			)}

			{/* {requirementList.length > 0 && (
				<ul className="mt-2 list-inside list-disc">
					{requirementList.map((requirement, index) => (
						<li key={index} className="flex items-center text-richblack-5">
							<span>{requirement}</span>
							<button
								type="button"
								className="ml-2 text-xs text-pure-greys-300 "
								onClick={() => handleRemoveRequirement(index)}
							>
								clear
							</button>
						</li>
					))}
				</ul>
			)} */}
		</div>
	);
}

export default RequirementField;
