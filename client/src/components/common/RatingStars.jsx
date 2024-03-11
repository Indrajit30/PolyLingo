import React, { useEffect, useState } from 'react'
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ ReviewCount, StarSize }) {
  const [starCount, setStarCount] = useState({ full: 0, half: 0, empty: 0 });

  useEffect(() => {
    const wholeStars = Math.floor(ReviewCount) || 0;
    setStarCount({
      full: wholeStars,
      half: ReviewCount - wholeStars > 0 ? 1 : 0,
      empty: 5 - (wholeStars + starCount.half),
    })
  }, [ReviewCount]);

  return (
    <div className="flex gap-1 text-yellow-100">
      {[...new Array(starCount.full)].map((_, i) => {
        return <TiStarFullOutline key={i} size={StarSize || 20} />
      })}
      {[...new Array(starCount.half)].map((_, i) => {
        return <TiStarHalfOutline key={i} size={StarSize || 20} />
      })}
      {[...new Array(starCount.empty)].map((_, i) => {
        return <TiStarOutline key={i} size={StarSize || 20} />
      })}
    </div>
  )
}

export default RatingStars