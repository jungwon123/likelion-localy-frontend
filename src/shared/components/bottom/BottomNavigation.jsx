import styled from "styled-components";
import { useNavigate } from "react-router";
import { colors } from "@/styles/colors";
import Icon from "./Icon";

export const BottomNavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;

  height: 60px;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid ${colors.gray[200]};
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const BottomNavigationContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  color: ${colors.gray[600]};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    color: ${colors.blue[100]};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NAV_ITEMS = ["home", "message", "folder", "clipboard", "user"];

const Navigate = () => {
  const navigate = useNavigate();
  const NAV_PATHS = {
    home: "/",
    message: "/chat",
    folder: "/local",
    clipboard: "/feedback",
    user: "/mypage",
  };
  return (
    <BottomNavigationContainer>
      {NAV_ITEMS.map((item) => (
        <BottomNavigationContent
          key={item}
          onClick={() => navigate(NAV_PATHS[item])}
        >
          <Icon name={item} size={24} />
        </BottomNavigationContent>
      ))}
    </BottomNavigationContainer>
  );
};

export default Navigate;
