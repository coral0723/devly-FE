"use client"

export default function Solution() {
  return (
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
            <span>8</span>
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
      
      {showComments && (
        <CommentsContainer/>
      )}
    </div>
  )
}