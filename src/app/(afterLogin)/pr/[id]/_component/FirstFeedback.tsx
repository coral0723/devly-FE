'use client'

import { Feedback } from "@/model/Feedback"
import { Fragment } from "react"

type Props = {
  feedback: Feedback
}

export default function FirstFeedback({feedback}: Props) {
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">

      {/* Score Area */}
      <div className="mb-4">
        <span className="font-medium">문법 점수: </span>
        <span className="text-blue-600 font-bold">{feedback.score}/100</span>
      </div>

      <div className="space-y-4">
        {/* Strengths */}
        <div className="text-sm">
          <h4 className="font-medium mb-2">강점</h4>
          <ul className="list-disc pl-4 space-y-2 text-gray-600">
            {feedback.feedbackPoints.strengths.map((strength, idx) => (
              <li key={idx}>
                <p className="mt-1">
                  {strength.example}
                  <br/>
                  <span className="text-gray-500">
                    {strength.content}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="text-sm">
          <h4 className="font-medium mb-2">개선점</h4>
          <ul className="list-disc pl-4 space-y-2 text-gray-600">
            {feedback.feedbackPoints.improvements.map((improvement, idx) => (
              <li key={idx}>
                <span className="text-gray-500">
                  {improvement}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        {feedback.suggestions && (
          <div className="text-sm">
              <h4 className="font-medium mb-2">제안점</h4>
              <ul className="list-disc pl-4 space-y-2 text-gray-600">
                {feedback.suggestions.title && (
                  <li>
                      <div className="font-medium text-gray-700">제목</div>
                      <p className="mt-1">
                          {feedback.suggestions.title}
                      </p>
                  </li>
                )}
                {feedback.suggestions.description && (
                  <li>
                    <div className="font-medium text-gray-700">설명</div>
                    <p className="mt-1 whitespace-pre-line">
                        {feedback.suggestions.description}
                    </p>
                  </li>
                )}
              </ul>
          </div>
        )}

        {/* Better PR Explainer */}
        <div className="text-sm">
          <h4 className="font-medium mb-2">개선된 PR 설명 예시</h4>
          <div className="bg-gray-50 p-3 rounded border border-gray-200 text-gray-600 whitespace-pre-line">
            <Fragment>
              {feedback.betterPRExplainer}
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  )
}