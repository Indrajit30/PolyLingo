import React from 'react'

function HighLightText({text}) {
  return (
    // <div className='text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '>
    //   {" "}
    //   {text}
    // </div>
    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
    {" "}
    {text}
  </span>
  )
}

export default HighLightText