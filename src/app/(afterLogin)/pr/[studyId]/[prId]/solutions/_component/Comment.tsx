"use client"

import { Avatar } from "antd";
import { Comment as IComment } from "@/model/pr/solutions/Comment";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
  comment: IComment,
}

export default function Comment({ comment }: Props) {
  return (
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
  )
}