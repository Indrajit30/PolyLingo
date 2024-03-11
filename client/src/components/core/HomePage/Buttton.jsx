import React from "react";
import { Link } from "react-router-dom";

function Buttton({ children, active, linkto }) {
	return (
		<Link to={linkto}>
			
			<div className={`text-centre flex items-center justify-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-blue-100 text-black":"bg-richblack-800 text-white" } hover:scale-95 transition-all duration-200`}>
				{children}
			</div>
		</Link>
	);
}

export default Buttton;
