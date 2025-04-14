"use client"

import { StudyLog } from "@/model/StudyLog";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Log from "./Log";

type Props = {
  studyLogs: StudyLog[],
  hasNextPage: boolean | undefined,
  onLoadMore: () => Promise<void>,
}

export default function LogContainer({ studyLogs, hasNextPage, onLoadMore }: Props) {
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, onLoadMore]);

  return (
    <div className="flex flex-col px-4 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 215px)' }}>
      {studyLogs.map((studyLog, index) => (
        <Log key={`${new Date(studyLog.date).getTime()}_${index}`} studyLog={studyLog}/>
      ))}
      {hasNextPage && <div ref={ref} className="h-10" />}
    </div>
  )
}