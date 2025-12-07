import {
  SummaryContainer,
  SummaryHeader,
  SummaryTitle,
  ChevronButton,
  TrendContent,
  TrendMain,
  TrendSub,
} from "../styles/EmotionTrendSummary.styles";
import ChevronLeftIcon from "@/shared/components/icons/ChevronLeftIcon";

/**
 * @component EmotionTrendSummary
 * @description 주간 감정 트렌드 요약 섹션
 * @param {function} onViewMore - 더보기 클릭 핸들러 (대시보드로 이동)
 * @param {Object} emotionData - 감정 트렌드 데이터
 * @param {string} emotionData.mostEmotion - 가장 많이 느낀 감정
 * @param {number} emotionData.happyPer - 행복지수 변화 퍼센트
 */
const EmotionTrendSummary = ({ onViewMore, emotionData }) => {
  const renderContent = () => {
    if (!emotionData) {
      return <TrendSub>감정 트렌드 데이터를 불러오는 중...</TrendSub>;
    }

    const { mostEmotion, happyPer } = emotionData;

    // mostEmotion이 '없음'인 경우
    if (mostEmotion === "없음") {
      return <TrendSub>이번주 느낀 감정을 Localy와 공유해주세요!</TrendSub>;
    }

    return (
      <>
        <TrendMain>
          이번주 가장 많이 느낀 감정은
          <br />'{mostEmotion}'이에요.
        </TrendMain>
        <TrendSub>지난주 대비 행복지수가 {happyPer}% 올랐어요. </TrendSub>
      </>
    );
  };

  return (
    <SummaryContainer>
      <SummaryHeader>
        <SummaryTitle>주간 감정 트렌드 요약</SummaryTitle>
        <ChevronButton onClick={onViewMore} aria-label="더보기">
          <ChevronLeftIcon color="#181818" size={14} rotate={180} />
        </ChevronButton>
      </SummaryHeader>
      <TrendContent>{renderContent()}</TrendContent>
    </SummaryContainer>
  );
};

export default EmotionTrendSummary;
