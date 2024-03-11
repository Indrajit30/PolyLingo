import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { FiUpload } from "react-icons/fi";
import { updateDispalyPic } from "../../../../services/operations/settingsApi";

function ChangeProfilePic() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const [loading, setLoading] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [previewSource, setPreviewSource] = useState(null);

	const dispatch = useDispatch();
	const fileInputRef = useRef(null);

	function handleClick() {
		fileInputRef.current.click();
	}

	function handlefileChange(e) {
		const file = e.target.files[0];
		// console.log('FILE..',file);
		// if (!file || !file.type.includes("image")) return;
		if (file) {
			setImageFile(file);
			previewFile(file);
		}
	}

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};
	console.log("IMAGE_FILE", imageFile);

	const handleFileUpload = () => {
		try {
			console.log("UPLOADING.....");
			setLoading(true);
			const formdata = new FormData();
			formdata.append("displayPicture", imageFile);
			console.log("dispalyPicture", imageFile);

			dispatch(updateDispalyPic(token, formdata)).then(() => {
        setLoading(false)
      })

			// setLoading(false);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		if (imageFile) {
			previewFile(imageFile);
		}
	}, [imageFile]);
	return (
		<>
			<div className="flex items-center gap-8 p-8 px-12 bg-richblack-800 border-[1px] border-richblack-600">
				<img
					className="w-[5rem] h-[5rem] rounded-full  object-cover"
					src={previewSource || user?.image}
					alt="profile"
				/>
				<div className="flex flex-col gap-3">
					<p className="text-md font-medium text-richblack-5">
						Change Profile Picture
					</p>

					<div className="flex items-center gap-4">
						<input
							type="file"
							ref={fileInputRef}
							onChange={handlefileChange}
							className="hidden"
							accept="image/png , image/gif, image/jpeg"
						/>
						<button
							onClick={handleClick}
							disabled={loading}
							className="cursor-pointer rounded-md bg-richblack-700 text-richblack-50 px-5 py-2 "
						>
							Select
						</button>

						<IconBtn
							text={loading ? "Uploading..." : "Upload"}
							onclick={handleFileUpload}
						>
							{!loading && <FiUpload className="text-lg text-richblack-900" />}
						</IconBtn>
						{/* <button onClick={handleFileUpload}>BBBBB</button> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default ChangeProfilePic;
