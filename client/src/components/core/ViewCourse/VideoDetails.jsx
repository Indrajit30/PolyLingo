import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player, BigPlayButton  } from "video-react";
import "video-react/dist/video-react.css";
import IconBtn from '../../common/IconBtn';

function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntiredata, completedLectures } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const setVideoSpecificData = async () => {
      if (!courseSectionData.length)
        return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate('/dashboard/enrolled-courses');
      } else {
        const filteredData = courseSectionData.filter(
          (item) => item._id === sectionId
        )
        const filteredVideoData = filteredData?.[0].subSection.filter(
          (data)=>data._id===subSectionId
        )

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false)
      }
    }

    setVideoSpecificData();
  }, [courseSectionData,courseEntiredata,location.pathname]);


  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (el) => el._id == sectionId
    )
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (el) => el._id == subSectionId
    )

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  }

  const idLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (el) => el._id == sectionId
    )
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (el) => el._id == subSectionId
    )

    if (currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1) {
      return true;
    } else {
      return false;
      }
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (el) => el._id == sectionId
    )
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (el) => el._id == subSectionId
    )

    if (currentSubSectionIndex != noOfSubSections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      // navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${courseSectionData[nextSection
      //   ._id]?.subSection[0]?._id}`)
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id;

      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  }


  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (el) => el._id == sectionId
    )
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (el) => el._id == subSectionId
    )

    //same section, previous video
    if (currentSectionIndex != 0) {
      const previousSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`);
    } else {
      //previous Section ka last video
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;
      
      const previousSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;

      const previousSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[previousSubSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubSectionId}`);

    }
  }


  const handleLectureComplete = () => {
    setLoading(true);
    const res = markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  }

  console.log("videoData",videoData)

  return (
    <div>
      {
        !videoData ? (<div>No Data Found</div>)
          : (
            <Player
              ref={playerRef}
              aspectRatio='16:9'
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
              // fluid={false}
              width={900}
              height={450}
            >
              <BigPlayButton position="center" />
              {videoEnded && (
                <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}
                  className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                >
                  {!completedLectures.includes(subSectionId) && (
                    <IconBtn
                      disabled={loading}
                      onclick={() => handleLectureComplete()}
                      text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                    />
                  )}
                  <IconBtn
                    disabled={loading}
                    onclick={() => {
                      if (playerRef?.current) {
                        playerRef?.current?.seek(0)
                        setVideoEnded(false)
                      }
                    }}
                    text="Rewatch"
                    customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                  ></IconBtn>

                  <div className='mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl'>
                    {
                      !isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPreviousVideo}
                          className='blackButton'
                        >Prev</button>
                      )
                    }
                    {!idLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
                  </div>
                </div>
              )}
            </Player>
          )
      }
    </div>
  )
}

export default VideoDetails