import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { QuizData } from "../../../../data/quizData";

function Test() {
	const { user } = useSelector((state) => state.profile);

	console.log("QuizData  ", QuizData);

	const [quizData, setQuizData] = useState({});
	const [currQuestion, setCurrQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [clickedOption, setClickedOption] = useState(0);
	const [showResult, setShowResult] = useState(false);

	// function shuffleArray(array) {
	// 	for (let i = array.length - 1; i > 0; i--) {
	// 		const j = Math.floor(Math.random() * (i + 1));
	// 		[array[i], array[j]] = [array[j], array[i]];
	// 	}
	// }

	// Shuffle the Quiz Data
	// shuffleArray(QuizData);

	// Select 10 random questions
	// const selectedQuestions = QuizData.slice(0, 5);

	// console.log(selectedQuestions);

	useEffect(() => {
		setQuizData(QuizData);
	}, []);
	const changeQuestion = async () => {
		updateScore();
		if (currQuestion < quizData.length - 1) {
			setCurrQuestion(currQuestion + 1);
			setClickedOption(0);
		} else {
			setShowResult(true);

			// const res = await markTestGiven(token, user, score);
			// console.log("FROM QUIZ PAGE", res.data.sol);

			// await dispatch(setUser(res.data.sol));
			// localStorage.setItem("user", JSON.stringify(res.data.sol));

			// await dispatch(setTestAttempted(true));
			// localStorage.setItem("testAttempted", true);
			// localStorage.setItem("marks", score);

			// toast.success("You completed the test");
		}
	};

	const updateScore = () => {
		if (clickedOption === quizData[currQuestion].answer) {
			setScore(score + 1);
		}
	};
	return (
		// <div className='border border-white p-2 flex items-center '>
		//   <div className='text-3xl mx-auto font-bold text-richblack-25'>Quiz</div>

		// </div>
		<div className="mx-auto text-richblack-5">
			<h2 className="text-center text-5xl font-bold py-6">Exam Section</h2>

			{user?.attempted === true ? (
				<div className="font-bold text-5xl text-center text-red-500">
					<div>You already attempted the test</div>
					<span className=" text-3xl text-center text-red-500">
						Your marks {user?.marks ? user?.marks : score} out of{" "}
						{quizData.length}
						<br />
					</span>
				</div>
			) : (
				<>
					{/* <div className="flex items-center flex-col ">
						<span className="font-bold">Instructions</span>
						<span>Only one attempt for the quiz.</span>
						<span>You can not give the exam again.</span>
						<span>You can not go to previous question.</span>
						<span>Do not do cheating.</span>
					</div> */}
					<div className="w-[60%] mx-auto border bg-richblack-800 rounded-2xl px-16 py-8">
						{showResult ? (
							<div className="flex flex-col items-center">
								{/* <span>Total Marks === {quizData.length}</span> */}
								{/* <hr /> */}
								{/* <span>Your Marks === {score}</span> */}
								<span className="mb-5 text-4xl font-bold">
									Your Score {score}/{quizData.length}
								</span>
								<div className="flex flex-col items-center gap-2 text-white">
									<span className="text-2xl font-bold text-center mb-4">
										Thankyou for your time and answers.
									</span>
									<span className="text-center">
										We appreciate your participation and interest in our quiz.
										Whether you aced it or found some challenges along the way,
										we're grateful for your time and effort.
									</span>

									<span className="text-center">
										Your engagement helps us improve and tailor future quizzes
										to better suit your interests and knowledge level.
									</span>

									<span className="text-center">
										Stay tuned for more exciting quizzes and updates on our
										website. Thank you once again for being a part of our
										community!
									</span>
									<span>https://www.survivo.com/d</span>
									<button className="px-3 py-2 bg-yellow-100 rounded-md">
										<a href="www.amazon.in">Connect</a>
									</button>
								</div>
							</div>
						) : (
							<div className="flex flex-col ">
								<div className="flex items-center border py-5 rounded-md gap-20 pl-10">
									<span> #{currQuestion + 1}</span>
									<span>{quizData[currQuestion]?.question}</span>
								</div>
								<div className=" flex flex-col items-start py-4 gap-y-8 ">
									{quizData[currQuestion]?.options?.map((elem, i) => (
										<button
											key={i}
											className={`p-1 border outline-none bg-slate-200 rounded-md w-full hover:bg-yellow-400 ${
												clickedOption === i + 1
													? " bg-yellow-400"
													: "bg-slate-200"
											} `}
											onClick={() => setClickedOption(i + 1)}
										>
											{elem}
										</button>
									))}
								</div>
								<span>Clicked Option :{clickedOption}</span>
								<input
									type="button"
									value="Next"
									id="next-button"
									className="mx-auto px-6 py-1 mt-5 text-xl bg-blue-300 cursor-pointer"
									onClick={changeQuestion}
								/>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Test;
