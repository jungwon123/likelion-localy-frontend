import styled from "styled-components";
import Header from "@/shared/components/Header/Header";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import { font } from "@/styles/font";
import { colors } from "@/styles/colors";
import EmotionIcon from "@/shared/components/icons/Emotions";

const Container = styled.div`
    padding: 40px 20px;
    max-width: 800px;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;



const EmotionItem = styled.div`
    display: flex;
    align-items: center;
    margin-top: 100px;
    gap: 10px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ContentTitle = styled.div`
    ${font.bold32}
    color: ${colors.gray[300]};
`;

const ContentDescription = styled.div`
    ${font.medium14}
    color: ${colors.gray[300]};
`;

export default function SpendPointsPage() {
    return (
        <>
            <Header text="포인트 사용" />
            <Container>
                <EmotionItem>
                    <EmotionIcon name="sad" width={60} height={80} />
                </EmotionItem>
                <ContentTitle>앗!</ContentTitle>
                <ContentDescription>Localy가 포인트 사용처를 열심히 알아보는 중이에요.</ContentDescription>

                <ContentContainer>
                    <ContentDescription>곧, 지역사랑상품권을 비롯하여</ContentDescription>
                    <ContentDescription>다양한 혜택으로 찾아올게요!</ContentDescription>
                </ContentContainer>

            </Container>
            <BottomNavigation />
        </>
    );
}
