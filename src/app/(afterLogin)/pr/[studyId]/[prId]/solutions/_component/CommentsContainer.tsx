"use client"

import { Comment as IComment } from "@/model/pr/solutions/Comment"
import { Fragment } from "react"
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko';
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../_lib/getComments";
import LoadingSpinner from "@/app/_component/LoadingSpinner";

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
  solutionId: number,
};

export default function CommentsContainer({ solutionId }: Props) {
  const {
    data: comments,
    fetchNextPage,
    hasNextPage
  } = useSuspenseInfiniteQuery<IComment[], object, InfiniteData<IComment[]>, [_1: string, _2: string, number], number>({
    queryKey: ["pr", "solution", solutionId],
    queryFn: getComments,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length;
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if(!comments) {
    return (
      <LoadingSpinner size={"md"}/>
    )
  }

  return (
    <div className="bg-white">
      {/* Visible Comments */}
      <div className="py-2">
        {comments.pages.map((page, idx) => (
          <Fragment key={idx}>
            {page.map((comment) => (
              <Comment key={comment.id} comment={comment}/>
            ))}
          </Fragment>
        ))}
      </div>
      
      {hasNextPage && (
        <div className="flex justify-center py-2 border-t border-gray-100">
          <button 
            onClick={() => fetchNextPage()}
            className="text-purple-600 text-sm font-medium hover:text-purple-800"
          >
            댓글 더보기
          </button>
        </div>
      )}
      
      <CommentInput
        solutionId={solutionId}
      />
    </div>
  )
}