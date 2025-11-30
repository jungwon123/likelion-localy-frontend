import React from "react";
import PlaceRecommendCarousel from "@/features/local/components/bookmark/PlaceRecommendCarousel";

export default function HomeCard() {
  const mockPlaces = [
    {
      category: "카페",
      name: "장소 이름",
      location: "서울특별시",
    },
    {
      category: "카페",
      name: "장소 이름",
      location: "서울특별시",
    },
    {
      category: "카페",
      name: "장소 이름",
      location: "서울특별시",
    },
  ];

  return (
    <PlaceRecommendCarousel
      title="멋사님에게 추천하는 장소"
      places={mockPlaces}
      imageWidth={148}
      imageHeight={148}
      slidesPerView="auto"
      spaceBetween={24}
      loop={false}
      direction="horizontal"
    />
  );
}
