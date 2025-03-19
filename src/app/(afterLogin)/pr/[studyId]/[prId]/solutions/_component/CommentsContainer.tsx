"use client"

import { Comment } from "@/model/pr/solutions/Comment"
import { faker } from "@faker-js/faker";
import { Avatar } from "antd";
import { useState } from "react"
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko';
import CommentInput from "./CommentInput";

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function CommentsContainer() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, name: "이지민", profile: faker.image.avatar(), text: "좋은 접근법이네요! 저도 비슷하게 풀었어요.", time: new Date(2025, 2, 19, 12, 30) },
    { id: 2, name: "박도현", profile: faker.image.avatar(), text: "이 부분 조금 더 최적화할 수 있을 것 같아요!", time: new Date(2025, 2, 19, 13, 45) },
    { id: 3, name: "최서연", profile: faker.image.avatar(), text: "코드가 너무 깔끔해요! 참고하겠습니다.", time: new Date(2025, 2, 19, 14, 20) },
    { id: 4, name: "정민준", profile: faker.image.avatar(), text: "이런 방식으로도 문제를 해결할 수 있군요. 배울 점이 많네요.", time: new Date(2025, 2, 19, 14, 35) },
    { id: 5, name: "김지우", profile: faker.image.avatar(), text: "시간 복잡도 측면에서도 효율적인 것 같아요!", time: new Date(2025, 2, 19, 15, 0) },
    { id: 6, name: "이도윤", profile: faker.image.avatar(), text: "이 풀이가 제일 명확한 것 같아요. 감사합니다!", time: new Date(2025, 2, 19, 15, 15) },
    { id: 7, name: "홍서준", profile: faker.image.avatar(), text: "더 나은 방법을 찾고 있었는데 도움이 많이 됐어요.", time: new Date(2025, 2, 19, 15, 30) },
    { id: 8, name: "신하은", profile: faker.image.avatar(), text: "이런 접근법은 생각도 못했네요. 정말 참신해요!", time: new Date(2025, 2, 19, 15, 45) },
  ])
  const [newComment, setNewComment] = useState<string>("");
  const [visibleComments, setVisibleComments] = useState(5);

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: comments.length + 1,
      name: "나",
      profile: faker.image.avatar(),
      text: newComment,
      time: new Date(),
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");

    // 새 댓글을 작성하면 해당 댓글이 보이도록 표시 개수 조정
    if (comments.length + 1 > visibleComments) {
      setVisibleComments(visibleComments + 5);
    }
  }

  return (
    <div className="bg-white">
      {/* Visible Comments */}
      <div className="py-2">
        {comments.slice(0, visibleComments).map((comment) => (
          <div key={comment.id} className="flex space-x-2 px-4 py-2">
            <Avatar
              className="w-8 h-8"
              src={comment.profile}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-sm">{comment.name}</p>
                <span className="text-xs text-gray-400">{dayjs(comment.time).fromNow(true)} 전</span>
              </div>
              <p className="text-sm text-gray-600">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load More Comments Button */}
      {comments.length > visibleComments && (
        <div className="flex justify-center py-2 border-t border-gray-100">
          <button 
            onClick={() => setVisibleComments(prev => prev + 5)}
            className="text-purple-600 text-sm font-medium hover:text-purple-800"
          >
            댓글 더보기
          </button>
        </div>
      )}
      
      {/* New Comment Input */}
      <CommentInput
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmitComment={handleSubmitComment}
      />
    </div>
  )
}