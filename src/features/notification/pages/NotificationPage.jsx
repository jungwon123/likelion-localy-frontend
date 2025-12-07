import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "@/shared/components/Header/Header";
import Footer from "@/shared/components/Footer/Footer";
import ChevronLeftIcon from "@/shared/components/icons/ChevronLeftIcon";
import NotificationTabs from "../components/NotificationTabs";
import NotificationCard from "../components/NotificationCard";
import { PageWrapper, ScrollableContent } from "../styles/Page.styles";
import { getAlarms } from "../api/notificationApi";

/**
 * @component NotificationPage
 * @description 알림 페이지
 */
export default function NotificationPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);

  // Fetch alarms on component mount
  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const response = await getAlarms();

        // Dev 환경에서만 API 응답 로깅
        if (import.meta.env.DEV) {
          console.log("📢 Alarms API Response:", {
            success: response.success,
            code: response.code,
            message: response.message,
            dataCount: response.data?.length,
            data: response.data,
          });
        }

        if (response.success && response.data) {
          // Transform API data to notification format
          const transformedNotifications = response.data.map((alarm) => ({
            id: alarm.id,
            type: alarm.type, // Keep uppercase (ANNOUNCEMENT or GENERAL)
            isNew: !alarm.read,
            sender: "Localy",
            date: new Date(alarm.createdAt).toLocaleDateString("ko-KR", {
              month: "long",
              day: "numeric",
            }),
            title: alarm.title,
            description: alarm.body,
          }));

          // Dev 환경에서만 변환된 데이터 로깅
          if (import.meta.env.DEV) {
            console.log("🔄 Transformed Notifications:", transformedNotifications);
          }

          setNotifications(transformedNotifications);
        }
      } catch (error) {
        console.error("Failed to fetch alarms:", error);
      }
    };

    fetchAlarms();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Filter notifications based on active tab
  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((notif) => notif.type === "ANNOUNCEMENT");

  return (
    <PageWrapper>
      <Header
        leftIcon={<ChevronLeftIcon color="#0D0D0D" size={16} />}
        rightIcon={null}
        text="알림"
        onLeftClick={handleBack}
        onRightClick={null}
        showBorder={false}
      />
      <ScrollableContent>
        <NotificationTabs activeTab={activeTab} onTabChange={handleTabChange} />
        {filteredNotifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </ScrollableContent>
      <Footer />
    </PageWrapper>
  );
}
