import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/catalogPage";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";

function Catalog() {
	const { catalogName } = useParams();
	const [catalogPageData, setCatalogPageData] = useState(null);
	const [categoryId, setCategoryId] = useState("");
	const [active, setActive] = useState(1);

	useEffect(() => {
		const getCategories = async () => {
			const res = await apiConnector("GET", categories.CATEGORIES_API);
			// const category_id = res?.data?.data?.filter(
			// 	(ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
			// )[0]._id;
			const category_id = res?.data?.data?.filter(
				(ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
			)[0]._id;
			setCategoryId(category_id);
			// console.log("CCCAAATTTIIIDDD1.....",category_id);
		};

		getCategories();
	}, [catalogName]);

	console.log("CCCAAATTTIIIDDD2.....", categoryId);

	useEffect(() => {
		const getCategoryDetails = async () => {
			try {
				const res = await getCatalogPageData(categoryId);
				setCatalogPageData(res);
				console.log("RES---", res);
				setCatalogPageData(res);
			} catch (error) {
				console.log(error);
			}
		};
		if (categoryId) {
			getCategoryDetails();
		}
	}, [categoryId]);

	console.log("catalogPageData", catalogPageData);
	// console.log("catalogPageData",catalogPageData.data.selectedCategory._id);
	return (
		<>
			<div className="box-content bg-richblack-800 px-4 py-16">
				<div className="mx-auto minh-[260px] max-w-maxContentTab flex flex-col justify-center gap-4 lg:max-w-maxContent">
					<p className="text-sm text-richblack-300">
						{`Home / Catalog / `}
						<span className="text-yellow-25">{catalogPageData?.data?.selectedCategory?.name}</span>
					</p>
					<p className='text-3xl text-richblack-5'> {catalogPageData?.data?.selectedCategory?.name}</p>
					<p className='max-w-[870px] text-richblack-200'>{catalogPageData?.data?.selectedCategory?.description}</p>
				</div>
			</div>
			<div>
				{/* section1 */}
				<div className="mx-auto flex flex-col gap-5 box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent">
					<div className="text-3xl text-richblack-25">Courses to get you started</div>
					<div className="flex gap-x-3 border-b border-b-richblack-800 text-sm">
						<p onClick={()=>setActive(1)} className={active===1?`px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer`:`px-4 py-2 text-richblack-50 cursor-pointer`}>Most Popular</p>
						<p onClick={()=>setActive(2)} className={active===2?`px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer`:`px-4 py-2 text-richblack-50 cursor-pointer`}>New</p>
						{/* <p>New</p> */}
					</div>
					<div>
						<CourseSlider
							Courses={catalogPageData?.data?.selectedCategory?.courses}
						/>
					</div>
				</div>

				{/* section 2 */}
				<div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
					<p className='section_heading mb-6 md:text-3xl text-xl'>Top Courses in {catalogPageData?.data?.differentCategory?.name}</p>
					<div>
						<CourseSlider
							Courses={catalogPageData?.data?.differentCategory?.courses}
						/>
					</div>
				</div>

				{/* section 3 */}
				<div className=" mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent">
					<div className='section_heading mb-6 md:text-3xl text-xl'>Frequently Bought</div>
					<div className="py-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
							{catalogPageData?.data?.mostSellingCourses
								.slice(0, 4)
								.map((course, ind) => (
									// <div></div>
									<Course_Card course={course} key={ind} Height={"h-[400px]"} />
								))}
						</div>
					</div>
				</div>
			</div>

			<Footer></Footer>
		</>
	);
}

export default Catalog;
