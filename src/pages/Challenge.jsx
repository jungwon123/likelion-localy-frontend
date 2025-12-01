import { useState } from "react";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import NewIcon from "@/shared/components/icons/NewIcon";
import Header from "@/shared/components/Header/Header";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import MapIcon from "@/shared/components/icons/MapIcon";
import PlaceRecommendCarousel from "@/features/local/components/bookmark/PlaceRecommendCarousel";
import LocationError from "@/features/local/components/modal/LocationError";
import MissionSucces from "@/features/local/components/modal/MissionSucces";

const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MissionCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    transition: opacity 0.3s;
    padding: 20px 9px;
    background-color: ${colors.blue[10]};
    border-radius: 8px;
`;

const MissionCardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

const MissionCardTitle = styled.div`
    ${font.semibold16}
    color: ${colors.gray[900]};
`;

const MissionCardTime = styled.div`
    ${font.medium14}
    color: ${colors.gray[500]};
`;

const MissionPoint = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    border: 1px solid ${props => props.$isCompleted ? colors.gray[500] : colors.blue[50]};
    gap: 2px;
`;

const PointValue = styled.div`
    ${font.semibold16}
    color: ${colors.gray[900]};
`;

const PointUnit = styled.div`
    ${font.semibold14}
    color: ${colors.gray[900]};
`;


const PlaceCard = styled.div`

    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0px 2px 24px 2px #00000014;
    border-radius: 18px;
    padding: 8px 8px 12px 8px;
`

const PlaceCardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 13px;
    border: 1px solid ${colors.gray[200]};
    border-radius: 18px;
`;

const DetailLabel = styled.div`
    ${font.medium14}
    color: ${colors.gray[900]};

`;

const OpeningHours = styled.div`
    ${font.regular10}
    color: ${colors.gray[900]};
`;

const DetailValue = styled.div`
    ${font.regular10}
    color: ${colors.gray[600]};
    display: flex;
    align-items: flex-end;
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ShortDescriptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const ShortDescription = styled.div`
    ${font.regular14}
    color: ${colors.gray[900]};
    line-height: 1.6;
`;

const CertificationButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 13px 0px;
`;

const CertificationButton = styled.button`
    ${font.medium12}
    color: ${colors.gray[100]};
    border-radius: 6px;
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    background: ${colors.gray[300]};
    min-width: 120px;
    min-height: 36px;
`;

const CertificationText = styled.div`
    ${font.medium12}
    color: ${colors.gray[600]};
`;



const placeData = {
    images: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
    ]
}

// 목업 데이터
const MOCK_MISSIONS = [
    {
        id: 1,
        title: "카페 방문하고 인증하기",
        deadline: "2024.12.31까지",
        point: 100,
        isNew: true,
        isCompleted: false
    },
    {
        id: 2,
        title: "로컬 맛집 리뷰 작성하기",
        deadline: "2024.12.25까지",
        point: 50,
        isNew: false,
        isCompleted: false
    },
    {
        id: 3,
        title: "친구와 함께 방문하기",
        deadline: "2024.12.20까지",
        point: 150,
        isNew: true,
        isCompleted: false
    }
];

const imageSlides = placeData.images?.map((url) => ({ imageUrl: url })) || [];


export default function ChallengePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCertification = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Header text="미션 진행" />
            <Container>

                <MissionCard >
                    <MissionCardContent>
                        <NewIcon />

                        <MissionCardTitle>
                            카페 방문하고 인증하기
                        </MissionCardTitle>
                        <MissionCardTime>
                            2025.12.31까지
                        </MissionCardTime>
                    </MissionCardContent>

                    <MissionPoint >
                        <PointValue>100</PointValue>
                        <PointUnit>P</PointUnit>
                    </MissionPoint>
                </MissionCard>


                <PlaceCard>
                    <PlaceCardContent>
                        {imageSlides.length > 0 && (
                            <PlaceRecommendCarousel
                                places={imageSlides}
                                slidesPerView="auto"
                                spaceBetween={16}
                                direction="horizontal"
                                padding={0}
                            />
                        )}
                        <DescriptionContainer>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <DetailLabel>파이키</DetailLabel>
                                <DetailValue>카페</DetailValue>
                            </div>
                            <OpeningHours>10:00에 영업시작</OpeningHours>

                            <ShortDescriptionContainer>
                                <ShortDescription>아늑하고 감성적인 분위기의 카페</ShortDescription>
                                <MapIcon />
                            </ShortDescriptionContainer>
                        </DescriptionContainer>
                    </PlaceCardContent>
                    <CertificationButtonContainer>
                        <CertificationText>장소 반경 50m 이내에서 버튼을 눌러주세요.</CertificationText>
                        <CertificationButton onClick={handleCertification}>
                            인증하기
                        </CertificationButton>
                    </CertificationButtonContainer>
                </PlaceCard>

            </Container>
            <BottomNavigation />

            {/* 위치 오류 모달 */}
            {/* <LocationError
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                placeName="파이키"
            /> */}
            <MissionSucces
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                placeName="파이키"
            />
        </>
    );
}

