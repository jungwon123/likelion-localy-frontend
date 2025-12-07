import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "@/shared/components/Header/Header";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import BellIcon from "@/shared/components/icons/BellIcon";
import HomeCharacterCard from "../components/HomeCharacterCard";
import QuickActionButtons from "../components/QuickActionButtons";
import EmotionTrendSummary from "../components/EmotionTrendSummary";
import BookmarkCarousel from "../components/BookmarkCarousel";
import { PageWrapper, ScrollableContent } from "../styles/MainPage.styles";
import { getRecentBookmarks, getHomeData } from "../api/homeApi";
import { getProfile } from "@/features/mypage/api/mypageApi";
import notificationWebSocketClient from "@/features/notification/utils/notificationWebSocketClient";
import { getCurrentUserId } from "@/shared/utils/jwtUtils";

/**
 * @component MainPage
 * @description 메인 페이지 - 홈 화면
 */
export default function MainPage() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [emotionData, setEmotionData] = useState(null);
  const [nickname, setNickname] = useState("멋사");
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile
        const profileResponse = await getProfile();
        if (profileResponse.success && profileResponse.data?.nickname) {
          setNickname(profileResponse.data.nickname);
        }

        // Fetch home data (emotion summary)
        const homeDataResponse = await getHomeData();
        if (homeDataResponse.success) {
          setEmotionData(homeDataResponse.data);
        }

        // Fetch bookmarks
        const bookmarkResponse = await getRecentBookmarks();
        if (bookmarkResponse.success) {
          setBookmarks(bookmarkResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      }
    };

    fetchData();
  }, []);

  // WebSocket connection for unread notification count
  useEffect(() => {
    const userId = getCurrentUserId();

    if (!userId) {
      console.warn("User ID not found, cannot connect to notification WebSocket");
      return;
    }

    // WebSocket 연결 및 읽지 않은 알림 개수 구독
    notificationWebSocketClient.connect(
      userId,
      (unreadCount) => {
        // Dev 환경에서만 로깅
        if (import.meta.env.DEV) {
          console.log("🔔 Unread notification count updated:", unreadCount);
        }
        setUnreadCount(unreadCount);
      },
      (error) => {
        console.error("Notification WebSocket error:", error);
      }
    );

    // Cleanup: 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      notificationWebSocketClient.disconnect();
    };
  }, []);

  // Navigation handlers
  const handleNotificationClick = () => navigate("/notifications");
  const handleChatClick = () => navigate("/chat");
  const handleBookmarkClick = () => navigate("/local/bookmark");
  const handleMissionClick = () => navigate("/local/mission");
  const handleEmotionLogClick = () => navigate("/dashboard");
  const handleProfileClick = () => navigate("/mypage");
  const handleViewTrend = () => navigate("/dashboard");
  const handleViewBookmarks = () => navigate("/local/bookmark");

  return (
    <PageWrapper>
      <Header
        leftIcon={null}
        rightIcon={<BellIcon color="#000" size={24} unreadCount={unreadCount} />}
        text="Localy"
        onLeftClick={null}
        onRightClick={handleNotificationClick}
        showBorder={false}
      />
      <ScrollableContent>
        <HomeCharacterCard onClick={handleChatClick} nickname={nickname} />
        <QuickActionButtons
          onBookmarkClick={handleBookmarkClick}
          onMissionClick={handleMissionClick}
          onEmotionLogClick={handleEmotionLogClick}
          onProfileClick={handleProfileClick}
        />
        <EmotionTrendSummary
          onViewMore={handleViewTrend}
          emotionData={emotionData}
        />
        <BookmarkCarousel
          onViewAll={handleViewBookmarks}
          bookmarks={bookmarks}
        />
      </ScrollableContent>

      <BottomNavigation />
    </PageWrapper>
  );
}









