import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketClient {
  constructor() {
    this.stompClient = null;
    this.subscriptions = new Map();
    this.connected = false;
  }

  connect(userId, onMessageReceived, onError) {
    const token = localStorage.getItem("accessToken");
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.localy-maker.shop";
    const wsUrl = `${baseUrl}/ws`;

    console.log("Connecting to Chat WebSocket:", wsUrl);
    console.log("User ID:", userId);
    console.log("Token:", token ? "exists" : "missing");

    // STOMP 클라이언트 생성
    this.stompClient = new Client({
      // SockJS를 WebSocket factory로 사용
      webSocketFactory: () => new SockJS(wsUrl, null, {
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
        timeout: 10000,
      }),

      // JWT 토큰을 연결 헤더에 추가
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      // 연결 성공 콜백
      onConnect: (frame) => {
        console.log("✅ Chat STOMP Connected", frame);
        this.connected = true;

        // 채팅 응답 구독 (/topic/chat/{userId})
        const subscription = this.stompClient.subscribe(
          `/topic/chat/${userId}`,
          (message) => {
            try {
              const data = JSON.parse(message.body);
              console.log("📩 Received chat message:", data);
              if (onMessageReceived) {
                onMessageReceived(data);
              }
            } catch (error) {
              console.error("Failed to parse message:", error);
            }
          }
        );

        // 구독 정보 저장
        this.subscriptions.set(userId, subscription);
      },

      // 연결 끊김 콜백
      onDisconnect: () => {
        console.log("⚠️ Chat STOMP Disconnected");
        this.connected = false;
      },

      // 에러 콜백
      onStompError: (frame) => {
        console.error("❌ Chat STOMP Error:", {
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
        console.error("❌ Chat WebSocket error:", error);
      },

      // 자동 재연결 설정
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      // 디버그 로그 (개발 환경에서만)
      debug: (str) => {
        if (import.meta.env.DEV) {
          console.log("Chat STOMP Debug:", str);
        }
      },
    });

    // 연결 시작
    this.stompClient.activate();
  }

  sendMessage(userId, message) {
    if (!this.stompClient || !this.connected) {
      console.warn("STOMP not connected");
      return Promise.reject(new Error("STOMP not connected"));
    }

    return new Promise((resolve, reject) => {
      try {
        const token = localStorage.getItem("accessToken");
        const payload = {
          userId: userId,
          sender: "USER",
          message: message,
          timestamp: new Date().toISOString(),
        };

        console.log("📤 Sending chat message:", payload);

        // STOMP publish 메서드 사용 (/app/send/)
        this.stompClient.publish({
          destination: "/app/send/",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        // 메시지 전송 성공 응답
        resolve({
          success: true,
          message: "요청이 성공적으로 처리되었습니다.",
          data: {
            sender: "USER",
            message: message,
            timestamp: payload.timestamp,
          },
        });
      } catch (error) {
        console.error("Failed to send message:", error);
        reject(error);
      }
    });
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

export default new WebSocketClient();
