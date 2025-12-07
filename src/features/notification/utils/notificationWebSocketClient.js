import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class NotificationWebSocketClient {
  constructor() {
    this.stompClient = null;
    this.subscriptions = new Map();
    this.connected = false;
  }

  connect(userId, onUnreadCountReceived, onError) {
    const token = localStorage.getItem("accessToken");
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "https://api.localy-maker.shop";
    const wsUrl = `${baseUrl}/ws`;

    console.log("Connecting to Notification WebSocket:", wsUrl);
    console.log("User ID:", userId);
    console.log("Token:", token ? "exists" : "missing");

    // STOMP 클라이언트 생성
    this.stompClient = new Client({
      // SockJS를 WebSocket factory로 사용
      webSocketFactory: () =>
        new SockJS(wsUrl, null, {
          transports: ["websocket", "xhr-streaming", "xhr-polling"],
          timeout: 10000,
        }),

      // JWT 토큰을 연결 헤더에 추가
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      // 연결 성공 콜백
      onConnect: (frame) => {
        console.log("✅ Notification STOMP Connected", frame);
        this.connected = true;

        // 읽지 않은 알림 개수 구독 (/topic/alarm/unreadCount/{userId})
        const subscription = this.stompClient.subscribe(
          `/topic/alarm/unreadCount/${userId}`,
          (message) => {
            try {
              const unreadCount = parseInt(message.body, 10);

              // Dev 환경에서만 로깅
              if (import.meta.env.DEV) {
                console.log("🔔 Received unread count:", unreadCount);
              }

              if (onUnreadCountReceived) {
                onUnreadCountReceived(unreadCount);
              }
            } catch (error) {
              console.error("Failed to parse unread count:", error);
            }
          }
        );

        // 구독 정보 저장
        this.subscriptions.set(userId, subscription);
      },

      // 연결 끊김 콜백
      onDisconnect: () => {
        console.log("⚠️ Notification STOMP Disconnected");
        this.connected = false;
      },

      // 에러 콜백
      onStompError: (frame) => {
        console.error("❌ Notification STOMP Error:", {
          command: frame.command,
          headers: frame.headers,
          body: frame.body,
        });
        this.connected = false;
        if (onError) {
          onError(new Error(frame.headers.message || "STOMP connection error"));
        }
      },

      // WebSocket 에러 콜백
      onWebSocketError: (error) => {
        console.error("❌ Notification WebSocket error:", error);
      },

      // 자동 재연결 설정
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      // 디버그 로그 (개발 환경에서만)
      debug: (str) => {
        if (import.meta.env.DEV) {
          console.log("Notification STOMP Debug:", str);
        }
      },
    });

    // 연결 시작
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient) {
      // 모든 구독 해제
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      this.subscriptions.clear();

      // STOMP 연결 종료
      this.stompClient.deactivate();
      this.stompClient = null;
      this.connected = false;
    }
  }

  isConnected() {
    return this.connected && this.stompClient?.connected;
  }
}

export default new NotificationWebSocketClient();
