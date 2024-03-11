import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

function Upload({
	name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
	const { course } = useSelector((state) => state.auth);
	const [selectedFile, setSelectedFile] = useState(null);
	const [preview, setPreview] = useState(
    viewData ? viewData : editData ? editData : ""
  );
	const inputRef = useRef(null);

	const onDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		if (file) {
			previewFile(file);
			setSelectedFile(file);
		}
	};
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: !video ? "image/*" : "video/*",
		onDrop,
	});

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreview(reader.result);
		};
	};

	useEffect(() => {
    register(name, { required: true });
	}, [register]);
	

	useEffect(() => {
		setValue(name, selectedFile);
	}, [selectedFile, setValue]);

	const handleBrowseClick = () => {
		inputRef.current.click();
	};
	return (
		<div className="flex flex-col space-y-2">
			<label className="text-sm text-richblack-5" htmlFor={name}>
				{label} {!viewData && <sup className="text-pink-200">*</sup>}
			</label>

			<div
				className={`${
					isDragActive ? "bg-richblack-600" : "ring-richblack-700"
				}flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
				onClick={(e) => {
					if (!e.target.tagName.toLowerCase() === "input") {
						e.stopPropagation();
					}
				}}
			>
				{preview ? (
					<div>
						{!video ? (
							<img
								src={preview}
								alt="Preview"
								className="h-full w-full rounded-md object-cover"
							/>
						) : (
							<Player aspectRatio="16:9" playsInline src={preview}></Player>
						)}
						{!viewData && (
							<button
								type="button"
								onClick={() => {
									setPreview("");
									setSelectedFile(null);
									setValue(name, null);
								}}
								className="mt-3 text-richblack-400 underline"
							>
								Cancel
							</button>
						)}
					</div>
				) : (
					<div
						className=" flex w-full flex-col items-center p-6"
						{...getRootProps()}
					>
						<input {...getInputProps()} ref={inputRef} />
						<div
							className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800 "
							onClick={handleBrowseClick}
						>
							<FiUploadCloud className="text-2xl text-yellow-50" />
						</div>

						<p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
							Drag and drop an {!video ? "image" : "video"}, or click to{" "}
							<span className="font-semibold text-yellow-50">Browse</span> a
							file
						</p>
						<ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
							<li>Aspect ratio 16:9</li>
							<li>Recommended size 1024x576</li>
						</ul>
					</div>
				)}
			</div>
			{errors[name] && (
				<span className="ml-2 text-xs tracking-wide text-pink-200">
					{label} is required
				</span>
			)}
		</div>
	);
}

export default Upload;
