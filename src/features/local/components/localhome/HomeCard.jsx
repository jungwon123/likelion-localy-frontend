import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import Emotions from "@/shared/components/icons/Emotions";
import { getEmotionData } from "@/features/local/hooks/useEmotionMapper";
import { getDailyFeedback } from "@/features/dashboard/api/dashboardApi";


const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${colors.blue[10]};
  padding: 25px 18px 30px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.blue[20]};
  }
`;

//감정에 따른 텍스트 색상변경 필요
const Mood = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.blue[50]};
  gap: 10px;
  ${font.medium14}
`;

//미션 완료 혹은 미완료일 경우에 따른 텍스트 변경이 필요
const MissionTitle = styled.div`
  ${font.semibold16}
  color: ${colors.gray[900]};
`;

//미션 완료 혹은 미완료일 경우에 따른 텍스트 변경이 필요
const MissionDescription = styled.div`
  ${font.regular12}
  color: ${colors.gray[600]};
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const ProgressBarWrapper = styled.div`
  flex: 1;
`;

const ProgressStatus = styled.div`
  ${font.regular14}
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const ProgressValue = styled.p`
  ${font.regular14}
  color: ${colors.blue[50]};
  margin: 0;
`;

const EmotionsContainer = styled.div`
  position: absolute;
  right: 18px;
`;

/**
 * 홈 미션 카드 컴포넌트
 * 단일 책임: 미션 진행 상태 UI 표시
 * KoBERT 감정 분석 결과를 getDailyFeedback API로 가져와서 표시
 * @param {number} totalMissions - 전체 미션 수
 * @param {number} progressPercent - 진행률 (0-100)
 * @param {function} onClick - 클릭 이벤트 핸들러
 */
export default function HomeCard({
  totalMissions = 4,
  progressPercent = 0,
  onClick
}) {
  // KoBERT 감정 분석 결과 상태
  const [emotionKeyword, setEmotionKeyword] = useState("중립");
  const [isLoading, setIsLoading] = useState(true);

  // API에서 감정 분석 결과 가져오기
  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        setIsLoading(true);
        const response = await getDailyFeedback();

        // mostFrequentEmotion에서 KoBERT 분석 결과 가져오기
        if (response?.mostFrequentEmotion) {
          setEmotionKeyword(response.mostFrequentEmotion);
        }
      } catch (error) {
        console.error("감정 데이터 로딩 실패:", error);
        // 에러 시 기본값 유지
        setEmotionKeyword("중립");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmotionData();
  }, []);

  // 감정 데이터 가져오기
  const emotionData = getEmotionData(emotionKeyword);

  return (
    <CardContainer onClick={onClick}>
      <Mood>{isLoading ? "감정 분석 중..." : emotionData.message}</Mood>
      <MissionTitle>로컬리 미션 완료하기</MissionTitle>
      <MissionDescription>
        당신의 감정에 딱 맞는 장소 미션 {totalMissions}가지를 완료해보세요!
      </MissionDescription>
      <ProgressContainer>
        <ProgressBarWrapper>
          <ProgressBar
            completed={progressPercent}
            bgColor={colors.blue[50]}
            height="10px"
            borderRadius="10px"
            isLabelVisible={false}
          />
        </ProgressBarWrapper>
        <ProgressStatus>
          <ProgressValue>{progressPercent}</ProgressValue>
          /100
        </ProgressStatus>
      </ProgressContainer>
      <EmotionsContainer>
        <Emotions name={isLoading ? "normal" : emotionData.iconName} size={48} />
      </EmotionsContainer>
    </CardContainer>
  );
}
