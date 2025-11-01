'use client'

import WhiteBox from "@/app/_component/WhiteBox"
import { Feedback } from "@/model/pr/Feedback"
import { Fragment, memo } from "react"

type Props = {
  feedback: Feedback
}

export default memo(function ReviewAssessment({feedback}: Props) {
  return (
    <WhiteBox>
      <h4 className="font-medium mb-2 text-sm md:text-base">AI 리뷰</h4>
      <div className="text-xs md:text-sm bg-gray-50 p-3 rounded border border-gray-200 text-gray-600 whitespace-pre-line">
        <Fragment>
          {feedback.review}
        </Fragment>
      </div>
    </WhiteBox>
  )
})