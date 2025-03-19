"use client"

import { useRouter } from "next/navigation"
import { X, Heart, MessageCircle } from "lucide-react";
import { Avatar } from "antd";
import { faker } from "@faker-js/faker";
import { useState } from "react";

export default function PrSolutionsPage() {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(5);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, name: "이지민", avatar: faker.image.avatar(), text: "좋은 접근법이네요! 저도 비슷하게 풀었어요.", time: "2시간 전" },
    { id: 2, name: "박도현", avatar: faker.image.avatar(), text: "이 부분 조금 더 최적화할 수 있을 것 같아요!", time: "1시간 전" },
    { id: 3, name: "최서연", avatar: faker.image.avatar(), text: "코드가 너무 깔끔해요! 참고하겠습니다.", time: "50분 전" },
    { id: 4, name: "정민준", avatar: faker.image.avatar(), text: "이런 방식으로도 문제를 해결할 수 있군요. 배울 점이 많네요.", time: "45분 전" },
    { id: 5, name: "김지우", avatar: faker.image.avatar(), text: "시간 복잡도 측면에서도 효율적인 것 같아요!", time: "30분 전" },
    { id: 6, name: "이도윤", avatar: faker.image.avatar(), text: "이 풀이가 제일 명확한 것 같아요. 감사합니다!", time: "25분 전" },
    { id: 7, name: "홍서준", avatar: faker.image.avatar(), text: "더 나은 방법을 찾고 있었는데 도움이 많이 됐어요.", time: "20분 전" },
    { id: 8, name: "신하은", avatar: faker.image.avatar(), text: "이런 접근법은 생각도 못했네요. 정말 참신해요!", time: "15분 전" },
  ]);
  const [visibleComments, setVisibleComments] = useState(5);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    
    const newCommentObj = {
      id: comments.length + 1,
      name: "나",
      avatar: faker.image.avatar(),
      text: newComment,
      time: "방금 전"
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment("");
    
    // 새 댓글을 작성하면 해당 댓글이 보이도록 표시 개수 조정
    if (comments.length + 1 > visibleComments) {
      setVisibleComments(visibleComments + 5);
    }
  };

  return (
    <div className="max-w-lg mx-auto h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-4 flex justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              다른 사람 풀이
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              다양한 접근법을 살펴보고 더 나은 해결 방법을 찾아보세요!
            </p>
          </div>
          <button
            className="text-gray-500 cursor-pointer flex items-start"
            onClick={() => router.replace('/home')}
          >
            <X className="w-7 h-7"/>
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* PR Card */}
          <div className="bg-white rounded-xl w-full mb-4 overflow-hidden">
            {/* Profile Section */}
            <div className="px-4 pt-4">
              <div className="flex space-x-2 items-center">
                <Avatar
                  className="w-10 h-10"
                  src={faker.image.avatar()}
                />
                <p className="text-lg">김산호</p>
                <span className="text-purple-600 text-sm">
                Lv. 6
                </span>
              </div>
            </div>
            
            {/* PR Content */}
            <div className="px-4 py-4">
              <p className="text-sm text-gray-500 line-clamp-4">
                ㅇ넘라ㅓ린멍리너ㅣasdfjsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfadsjkofjodsa
                fffffffffffffffffffffffffffffffffddddddddddddddddddd
                dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
              </p>
            </div>
            
            {/* Like and Comment Buttons */}
            <div className="flex justify-between items-center px-4 pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <button 
                  className={`flex items-center space-x-1 ${liked ? "text-purple-500 hover:text-purple-700" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={handleLike}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-purple-500 text-purple-500" : ""}`} />
                  <span>{likeCount}</span>
                </button>
                <button 
                  className={`flex items-center space-x-1 ${showComments ? "text-purple-500 hover:text-purple-700" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageCircle className={`w-5 h-5`} />
                  <span>{comments.length}</span>
                </button>
              </div>
              <div className="flex items-center p-2 bg-purple-100 text-sm text-purple-600 rounded-md hover:cursor-pointer">
                <span>PR 보러 가기</span>
                <span className="ml-1 inline-block animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Comments Section */}
            {showComments && (
              <div className="bg-white">
                {/* Visible Comments */}
                <div className="py-2">
                  {comments.slice(0, visibleComments).map((comment) => (
                    <div key={comment.id} className="flex space-x-2 px-4 py-2">
                      <Avatar
                        className="w-8 h-8"
                        src={comment.avatar}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-sm">{comment.name}</p>
                          <span className="text-xs text-gray-400">{comment.time}</span>
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
                      댓글 더보기 ({comments.length - visibleComments}개)
                    </button>
                  </div>
                )}
                
                {/* New Comment Input */}
                <form 
                  onSubmit={handleSubmitComment} 
                  className="flex space-x-2 px-4 py-3 border-t border-gray-100"
                >
                  <Avatar
                    className="w-8 h-8"
                    src={faker.image.avatar()}
                  />
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <button 
                    type="submit" 
                    className="text-purple-600 font-medium text-sm hover:cursor-pointer"
                    disabled={newComment.trim() === ""}
                  >
                    게시
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}