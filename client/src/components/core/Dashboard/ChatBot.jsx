import axios from "axios";
import React, { useState } from "react";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { apiConnector } from "../../../services/apiConnector";


export default function ChatBot() {
	const handleClick = () => {
		document.getElementById("text").value =
			"Keith recently came back from a trip to Chicago, Illinois. This midwestern metropolis is found along the shore of Lake Michigan. During his visit, Keith spent a lot of time exploring the city to visit important landmarks and monuments.Keith loves baseball, and he made sure to take a visit to Wrigley Field. Not only did he take a tour of this spectacular stadium, but he also got to watch a Chicago Cubs game. In the stadium, Keith and the other fans cheered for the Cubs. Keith was happy that the Cubs won with a score of 5-4.Chicago has many historic places to visit. Keith found the Chicago Water Tower impressive as it is one of the few remaining landmarks to have survived the Great Chicago Fire of 1871. Keith also took a walk through Jackson Park, a great outdoor space that hosted the World’s Fair of 1892. The park is great for a leisurely stroll, and it still features some of the original architecture and replicas of monuments that were featured in the World’s Fair.During the last part of his visit, Keith managed to climb the stairs inside of the Willis Tower, a 110-story skyscraper. Despite the challenge of climbing the many flights of stairs, Keith felt that reaching the top was worth the effort. From the rooftop, Keith received a gorgeous view of the city’s skyline with Lake Michigan in the background translate this to hindi";
  };
  

  const [queryText, setQueryText] = useState('');

  const [finalAns, setFinalAns] = useState('');

  console.log(queryText);

  const sendBotQuery = async () => {
    try {
      // const res = await axios.post('http://localhost:4000/api/v1/course/botres', queryText);
      const res = await apiConnector('POST', 'http://localhost:4000/api/v1/course/botres', { queryText });
      console.log('RES from bot   ', res)
      setFinalAns(res.data.data);
    } catch (error) {
      console.log('error form bot', error);
    }
  }
  

	return (
		<div className="text-richblack-300">
			<div className="bg-richblack-800 rounded-md p-4 w-[100%]">
				<div className="flex">
					<span className="w-30">
						<HiOutlineCommandLine className="text-5xl" />
					</span>
					<span className="text-4xl mt-1 ml-2 font-bold text-richblack-50">
						Prompt
					</span>
				</div>
				<p className="mb-8">
					Guiding instruction for Ai's intelligent response
				</p>
				<div className="flex justify-between">
					<span className="mt-2">Base prompt</span>
					<button
						onClick={handleClick}
						className="bg-yellow-25 text-yellow-800 p-2 rounded-md hover:bg-yellow-50"
					>
						Prompt Example
					</button>
				</div>
				<textarea
					name=""
          id="text"
          onChange={(e)=>setQueryText(e.target.value)}
					className="mx-2 h-32 w-[90%] sm:w-[92%] md:w-[98.5%] rounded-lg p-4 mt-10 bg-richblack-25 text-black"
				></textarea>
				<button onClick={sendBotQuery} className="w-[90%] sm:w-[92%] md:w-full bg-yellow-25 text-yellow-800 p-2 rounded-lg mt-6 hover:bg-yellow-50">
					Generate Response
				</button>
			</div>
			<div className="bg-richblack-800 rounded-md p-4 mt-4">
       {finalAns.length>0 && <p className="text-xl text-richblack-50">Generated response: {finalAns}</p>}
				{/* <div className="w-full h-[80px] bg-richblack-25 rounded-lg mt-4"></div> */}
			</div>
		</div>
	);
}
