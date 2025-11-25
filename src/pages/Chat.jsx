import styled from "styled-components";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import media from "@/styles/media";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";

const Container = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  ${font.bold28}
  color: ${colors.purple[600]};
  margin-bottom: 40px;
`;

const ResponsiveBox = styled.div`
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s;

  ${media.small`
    background: ${colors.blue[200]};
    ${font.regular14}
  `}

  ${media.medium`
    background: ${colors.green[200]};
    ${font.regular16}
  `}

  ${media.large`
    background: ${colors.purple[200]};
    ${font.regular18}
  `}
`;

export default function ChatPage() {
  return (
    <Container>
      <Title>채팅 화면</Title>
      <ResponsiveBox>
        <strong>채팅 페이지입니다</strong>
      </ResponsiveBox>
      <BottomNavigation></BottomNavigation>
    </Container>
  );
}
