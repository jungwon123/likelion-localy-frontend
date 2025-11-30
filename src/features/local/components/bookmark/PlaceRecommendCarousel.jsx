import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 0px;
  gap: 10px;
`;

const Title = styled.div`
  ${font.bold16}
  color: ${colors.gray[900]};
`;

const PlaceDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlaceImage = styled.div`
  width: ${(props) => props.$width || 148}px;
  height: ${(props) => props.$height || 148}px;
  background-color: ${colors.gray[200]};
  border-radius: 8px;
`;

const PlaceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlaceName = styled.div`
  ${font.bold14}
  color: ${colors.gray[900]};
`;

const PlaceCategory = styled.div`
  ${font.regular12}
  color: ${colors.gray[600]};
`;

const PlaceLocation = styled.div`
  ${font.medium12}
  color: ${colors.gray[900]};
`;

export default function PlaceRecommendCarousel({
    title,
    places = [],
    imageWidth = 148,
    imageHeight = 148,
    slidesPerView = "auto",
    spaceBetween = 24,
    loop = true,
    autoplay = false,
    pagination = false,
    direction = "vertical",
    containerHeight,
}) {
    const autoplayConfig = autoplay
        ? {
            delay: 3000,
            disableOnInteraction: false,
        }
        : false;

    return (
        <Container>
            {title && <Title>{title}</Title>}
            <Swiper
                modules={[Autoplay, Pagination]}
                style={{
                    width: "100%",
                    height: containerHeight || "auto",
                }}
                direction={direction}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                loop={loop}
                autoplay={autoplayConfig}
                pagination={pagination ? { clickable: true } : false}
            >
                {places.map((place, idx) => (
                    <SwiperSlide
                        key={idx}
                        style={
                            slidesPerView === "auto" && direction === "horizontal"
                                ? { width: imageWidth }
                                : undefined
                        }
                    >
                        <PlaceDisplay>
                            <PlaceImage $width={imageWidth} $height={imageHeight} />
                            <PlaceContent>
                                {place.category && <PlaceCategory>{place.category}</PlaceCategory>}
                                {place.name && <PlaceName>{place.name}</PlaceName>}
                                {place.location && <PlaceLocation>{place.location}</PlaceLocation>}
                            </PlaceContent>
                        </PlaceDisplay>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
}

