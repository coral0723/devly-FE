"use client"

import { Log as ILog, StudyLog } from "@/model/StudyLog"
import { BookOpen, GitPullRequest, Lightbulb, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
  studyLog: StudyLog
}

export default function Log({studyLog}: Props) {
  const router = useRouter();

  const handleLogClick = (log: ILog) => {
    if(log.study === 'pr') {
      router.push(`/review/${log.study}/${log.id}/${log.prId}`);
    } else {
      router.push(`/review/${log.study}?studyId=${log.id}`);
    }
  }

  return (
    <div key={studyLog.date} className="flex flex-col bg-white rounded-xl w-full px-4 py-2 mb-4">
      <div className="text-xl font-bold px-2 pt-2">
        {new Date(studyLog.date).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
          }).replace(/\. /g, '-').replace('.', '')}
      </div>
      <div className="space-y-3 mt-5">
        {studyLog.logs?.map((log) => (
          <div 
            key={log.study} 
            className="flex items-center gap-3 p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg"
            onClick={() => handleLogClick(log)}
          >
            <div
              className={`w-10 h-10 rounded-full bg-${
                log.study === 'word' ? 'emerald' :
                log.study === 'knowledge' ? 'blue' :
                log.study === 'pr' ? 'purple' :
                'orange'
              }-100 flex items-center justify-center`}
            >
              {log.study === 'word' && <BookOpen size={20} className={`text-emerald-600`} />}
              {log.study === 'knowledge' && <Lightbulb size={20} className={`text-blue-600`} />}
              {log.study === 'pr' && <GitPullRequest size={20} className={`text-purple-600`} />}
              {log.study === 'discussion' && <MessageSquare size={20} className={`text-orange-600`} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-medium truncate">{log.title}</p>
            </div>
            <span className={`flex items-end text-sm text-gray-600`}>
              +{log.exp} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}