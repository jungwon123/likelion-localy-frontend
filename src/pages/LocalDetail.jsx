import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import Header from "@/shared/components/Header/Header";
import PlaceRecommendCarousel from "@/features/local/components/bookmark/PlaceRecommendCarousel";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import BookmarkIcon from "@/shared/components/icons/BookmarkIcon";
const DetailContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    & > *:last-child {
        border-bottom: none;
    }
`;

const InfoSection = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${colors.gray[200]};
    padding: 16px;
    gap: 40px;
`;



const Category = styled.div`
    ${font.regular14}
    color: ${colors.gray[600]};
`;



const DetailLabel = styled.div`
    ${font.medium14}
    color: ${colors.gray[900]};
    min-width: 80px;
    flex-shrink: 0;
`;

const DetailValue = styled.div`
    ${font.regular14}
    color: ${colors.gray[600]};
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;


const ShortDescription = styled.div`
    ${font.regular14}
    color: ${colors.gray[700]};
    line-height: 1.6;
`;

const LongDescriptionContainer = styled.div`
    padding: 0px 16px;
`;
const Description = styled.div`
    ${font.regular14}
color: ${colors.gray[600]};
line - height: 1.6;
    border: 1px solid ${colors.gray[200]};
    border-radius: 8px;
    padding: 16px;
`;



// 목업 데이터
const MOCK_DATA = {
    placeId: 123,
    placeName: "파이키 카페",
    category: "카페",
    address: "서울시 강남구 테헤란로 123",
    latitude: 37.5665,
    longitude: 126.9780,
    phoneNumber: "0507-0000-0000",
    openingHours: "매일 10:00 - 19:00",
    images: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
    ],
    shortDescription: "아늑하고 감성적인 분위기의 카페",
    longDescription: "조용하고 편안한 분위기에서 커피와 디저트를 즐길 수 있는 공간입니다. 인테리어가 예쁘고 음료와 베이커리의 퀄리티가 훌륭합니다.",
    isBookmarked: false,
    bookmarkCount: 157
};

export default function LocalDetailPage() {
    const { id } = useParams();
    const [placeData, setPlaceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaceDetail = async () => {
            try {
                setLoading(true);

                // 개발 중에는 목업 데이터 사용
                // TODO: 실제 API 연동 시 아래 주석 해제
                /*
                const response = await fetch(`/ api / places / ${ id } `);
                const result = await response.json();
                
                if (result.success) {
                    setPlaceData(result.data);
                }
                */

                // 목업 데이터 사용 (개발용)
                setTimeout(() => {
                    setPlaceData(MOCK_DATA);
                    setLoading(false);
                }, 500);

            } catch (error) {
                console.error("장소 상세 정보 조회 실패:", error);
                setLoading(false);
            }
        };

        if (id) {
            fetchPlaceDetail();
        }
    }, [id]);

    if (loading) {
        return (
            <>
                <Header text="로딩 중..." />
                <DetailContainer>로딩 중...</DetailContainer>
                <BottomNavigation />
            </>
        );
    }

    if (!placeData) {
        return (
            <>
                <Header text="오류" />
                <DetailContainer>장소 정보를 불러올 수 없습니다.</DetailContainer>
                <BottomNavigation />
            </>
        );
    }

    // images 배열을 PlaceRecommendCarousel에 맞게 변환
    const imageSlides = placeData.images?.map((url) => ({ imageUrl: url })) || [];

    return (
        <>
            <Header text={placeData.placeName} rightIcon={<BookmarkIcon />} />
            <DetailContainer>
                {/* 이미지 스와이퍼 */}
                {imageSlides.length > 0 && (
                    <PlaceRecommendCarousel
                        places={imageSlides}
                        slidesPerView="auto"
                        spaceBetween={16}
                        direction="horizontal"
                        padding={16}
                    />
                )}

                {/* 기본 정보 */}
                <InfoSection>
                    <DetailLabel>카테고리</DetailLabel>
                    <Category>{placeData.category}</Category>

                </InfoSection>


                {/* 주소 */}
                {placeData.address && (
                    <InfoSection>
                        <DetailLabel>위치</DetailLabel>
                        <DetailValue>{placeData.address}</DetailValue>
                    </InfoSection>
                )}

                {/* 영업시간 */}
                {placeData.openingHours && (
                    <InfoSection>
                        <DetailLabel>영업시간</DetailLabel>
                        <DetailValue>{placeData.openingHours}</DetailValue>
                    </InfoSection>
                )}


                {/* 전화번호 */}
                {placeData.phoneNumber && (
                    <InfoSection>
                        <DetailLabel>전화번호</DetailLabel>
                        <DetailValue>{placeData.phoneNumber}</DetailValue>
                    </InfoSection>
                )}


                {/* 상세 설명 */}
                {placeData.longDescription && (
                    <DescriptionContainer>
                        <InfoSection style={{ borderBottom: 'none' }}>
                            <DetailLabel>장소 소개</DetailLabel>
                            <ShortDescription>{placeData.shortDescription}</ShortDescription>
                        </InfoSection>
                        <LongDescriptionContainer>
                            <Description>{placeData.longDescription}</Description>
                        </LongDescriptionContainer>
                    </DescriptionContainer>
                )}

            </DetailContainer >
            <BottomNavigation />
        </>
    );
}