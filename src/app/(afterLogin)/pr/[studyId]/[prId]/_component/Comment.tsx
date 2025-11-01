"use client"

import WhiteBox from "@/app/_component/WhiteBox"
import { PrComments } from "@/model/pr/PrComments"

type Props = {
  currentStep: number,
  prComments: PrComments,
}

export default function Comment({ currentStep, prComments }: Props) {
  return (
    <WhiteBox>
      <h3 className="font-medium mb-2 text-sm md:text-base">{currentStep === 1 ? "PR 설명 작성" : "리뷰어 답변"}</h3>
      <p className="text-xs md:text-sm text-gray-600">
        {currentStep === 1 ? prComments.comments[0].content : "리뷰어의 코멘트에 답변해주세요."}
      </p>
    </WhiteBox>
  )
}