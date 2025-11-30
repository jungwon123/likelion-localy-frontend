import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import Header from "@/shared/components/Header/Header";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import BookmarkIcon from "@/shared/components/icons/BookmarkIcon";

const Container = styled.div`
  padding: 40px 20px 80px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const PlaceCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
`;

const PlaceImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background-color: ${colors.gray[200]};
  border-radius: 8px;
`;

const BookmarkIconWrapper = styled.div`
  position: absolute;
  top: 1px;
  right: 1px;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

const PlaceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlaceCategory = styled.div`
  ${font.regular12}
  color: ${colors.gray[600]};
`;

const PlaceName = styled.div`
  ${font.bold14}
  color: ${colors.gray[900]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlaceLocation = styled.div`
  ${font.medium12}
  color: ${colors.gray[900]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;
const SortButton = styled.button`
  ${font.medium14}
  color: ${colors.gray[900]};
  background-color: ${colors.gray[100]};
  border: 1px solid ${colors.gray[300]};
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
`;



// 임시 데이터
const bookmarkedPlaces = [
    {
        category: "카페",
        name: "로컬리 카페",
        location: "서울특별시 강남구",
    },
    {
        category: "식당",
        name: "멋쟁이 식당",
        location: "서울특별시 서초구",
    },
    {
        category: "카페",
        name: "아늑한 북카페",
        location: "서울특별시 마포구",
    },
    {
        category: "관광지",
        name: "한강공원",
        location: "서울특별시 영등포구",
    },
    {
        category: "식당",
        name: "맛있는 집",
        location: "서울특별시 용산구",
    },
    {
        category: "카페",
        name: "감성 카페",
        location: "서울특별시 성동구",
    },
    {
        category: "베이커리",
        name: "빵집 이야기",
        location: "서울특별시 종로구",
    },
    {
        category: "관광지",
        name: "남산타워",
        location: "서울특별시 중구",
    },
    {
        category: "식당",
        name: "전통 한식당",
        location: "서울특별시 강북구",
    },
    {
        category: "카페",
        name: "로컬리 카페",
        location: "서울특별시 강남구",
    },
    {
        category: "식당",
        name: "멋쟁이 식당",
        location: "서울특별시 서초구",
    },
    {
        category: "카페",
        name: "아늑한 북카페",
        location: "서울특별시 마포구",
    },
    {
        category: "관광지",
        name: "한강공원",
        location: "서울특별시 영등포구",
    },
    {
        category: "식당",
        name: "맛있는 집",
        location: "서울특별시 용산구",
    },
    {
        category: "카페",
        name: "감성 카페",
        location: "서울특별시 성동구",
    },
    {
        category: "베이커리",
        name: "빵집 이야기",
        location: "서울특별시 종로구",
    },
    {
        category: "관광지",
        name: "남산타워",
        location: "서울특별시 중구",
    },
    {
        category: "식당",
        name: "전통 한식당",
        location: "서울특별시 강북구",
    },
];

export default function BookmarkPage() {
    const navigate = useNavigate();

    // 모든 장소를 처음에는 북마크된 상태로 초기화
    const [bookmarks, setBookmarks] = useState(
        bookmarkedPlaces.map(() => true)
    );

    const handleLeftClick = () => {
        navigate(-1);
    };

    const toggleBookmark = (idx, e) => {
        e.stopPropagation();
        setBookmarks((prev) => {
            const newBookmarks = [...prev];
            newBookmarks[idx] = !newBookmarks[idx];
            return newBookmarks;
        });
    };

    return (
        <>
            <Header text="북마크" showLeftIcon onLeftClick={handleLeftClick} rightIcon={<BookmarkIcon />} />
            <Container>
                <ButtonGroup>
                    <SortButton>최신순</SortButton>
                    <SortButton>인기순</SortButton>
                </ButtonGroup>
                <GridContainer>
                    {bookmarkedPlaces.map((place, idx) => (
                        <PlaceCard key={idx}>
                            <PlaceImage>
                                <BookmarkIconWrapper onClick={(e) => toggleBookmark(idx, e)}>
                                    <BookmarkIcon
                                        color={bookmarks[idx] ? colors.blue[50] : colors.blue[10]}
                                        size={20}
                                    />
                                </BookmarkIconWrapper>
                            </PlaceImage>
                            <PlaceContent>
                                <PlaceCategory>{place.category}</PlaceCategory>
                                <PlaceName>{place.name}</PlaceName>
                                <PlaceLocation>{place.location}</PlaceLocation>
                            </PlaceContent>
                        </PlaceCard>
                    ))}
                </GridContainer>
            </Container>
            <BottomNavigation />
        </>
    );
}

