import { useNavigate } from "react-router";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import Header from "@/shared/components/Header/Header";
import HomeCard from "@/features/local/components/localhome/HomeCard";
import MissionPlace from "@/features/local/components/localhome/MissionPlace";
import Recommend from "@/features/local/components/localhome/Recommend";
import Banner from "@/features/local/components/localhome/Banner";
import PlaceCarousel from "@/features/local/components/localhome/PlaceCarousel";
import BookmarkIcon from "@/shared/components/icons/BookmarkIcon";


const Container = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  ${font.bold28}
  color: ${colors.purple[600]};
  margin-bottom: 40px;
`;

const sampleItems = [
  { name: "장소 이름" },
  { name: "장소 이름" },
  { name: "장소 이름" },
  { name: "장소 이름" },
  { name: "장소 이름" },
  { name: "장소 이름" },
];

export default function LocalPage() {
  const navigate = useNavigate();


  const handleRightClick = () => {
    navigate("/bookmark");
  };


  return (
    <>
      <Header text="로컬 적용 가이드" rightIcon={<BookmarkIcon />} onRightClick={handleRightClick} />


      <Container>
        <HomeCard />
        <PlaceCarousel
          title="멋사님에게 추천하는 장소"
          items={sampleItems}
          variant="circle"
          itemSize={76}
          pagination={false}
          slidesPerView={"auto"}
          spaceBetween={20}
        />
        <Recommend />
        <Banner />
        <PlaceCarousel
          title="최근에 북마크 한 장소"
          items={sampleItems}
          variant="rectangle"
          itemSize={76}
          pagination={false}
          slidesPerView={"auto"}
          spaceBetween={20}
        />

        <BottomNavigation></BottomNavigation>
      </Container>
    </>
  );
}
