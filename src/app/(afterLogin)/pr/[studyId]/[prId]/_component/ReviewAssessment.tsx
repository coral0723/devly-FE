'use client'

import { Feedback } from "@/model/pr/Feedback"
import { Fragment } from "react"

type Props = {
  feedback: Feedback
}

export default function ReviewAssessment({feedback}: Props) {
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
      <div className="text-sm">
        <h4 className="font-medium mb-2">AI 리뷰</h4>
        <div className="bg-gray-50 p-3 rounded border border-gray-200 text-gray-600 whitespace-pre-line">
          <Fragment>
            {feedback.review}
          </Fragment>
        </div>
      </div>
    </div>
  )
}