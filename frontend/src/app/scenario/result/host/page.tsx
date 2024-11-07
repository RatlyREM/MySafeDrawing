'use client'

import Image from 'next/image'
import ExplainQueueBoard from '@/app/scenario/result/host/components/ExplainQueueBoard'
import VotingSidebar from '@/app/scenario/result/components/VotingSidebar'
import VotingResult from '@/app/scenario/result/host/components/VotingResult'
import { useState } from 'react'
import AllAnswers from '@/app/scenario/result/components/AllAnswers'

interface AnswerData {
  id: number
  isCorrect: boolean
  nickname: string
  characterImage: string
  drawingImage: string
}

const waitingData: AnswerData[] = [
  {
    id: 1,
    isCorrect: false,
    nickname: '이구역그림짱은나야',
    characterImage: '/images/tiger.png',
    drawingImage: '/images/drawing.png',
  },
  {
    id: 6,
    isCorrect: false,
    nickname: '아가주호',
    characterImage: '/images/rabbit.png',
    drawingImage: '/images/drawing.png',
  },
  {
    id: 7,
    isCorrect: false,
    nickname: 'hand given tiger',
    characterImage: '/images/tiger.png',
    drawingImage: '/images/drawing.png',
  },
]

export default function ScenarioResultHost() {
  const [isVotingResultVisible, setIsVotingResultVisible] = useState(true)

  const handleApprove = () => {
    // 승인 시 실행할 로직
    setIsVotingResultVisible(false)
  }

  const handleReject = () => {
    // 거절 시 실행할 로직
    setIsVotingResultVisible(false)
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="flex items-center w-full mb-4">
        <h2 className="mx-auto w-2/5 h-20 bg-wood bg-cover bg-left flex items-center justify-center text-5xl text-white rounded-xl shadow-lg">
          작은 불 끄기
        </h2>
        <button className="absolute right-6 flex items-center justify-center">
          <Image
            src="/images/wood-arrow.png"
            alt="next"
            width={241}
            height={88}
            className="h-20 w-auto"
          />
          <p className="absolute text-white text-4xl shadow-lg pr-2">
            다음 단계로
          </p>
        </button>
      </div>

      <div className="-ml-6 mr-auto bg-wood bg-cover w-72 py-3 pr-5 text-right text-4xl text-white rounded-r-lg shadow-lg">
        발언 대기 목록
      </div>
      <button className="flex gap-x-6 w-full overflow-x-auto overflow-y-hidden mt-4 ps-1">
        {waitingData.map((data) => (
          <ExplainQueueBoard key={data.id} data={data} />
        ))}
      </button>

      <div className="-ml-6 mr-auto mt-6 bg-wood bg-cover w-72 py-3 pr-5 text-right text-4xl text-white rounded-r-lg shadow-lg mb-4">
        전체 답변
      </div>
      <AllAnswers />

      <VotingSidebar role="host" />
      {isVotingResultVisible && (
        <VotingResult onApprove={handleApprove} onReject={handleReject} />
      )}
    </div>
  )
}