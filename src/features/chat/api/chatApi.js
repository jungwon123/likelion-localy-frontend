import apiClient from "@/shared/api/client";

/**
 * 지난 채팅 메시지 조회
 * JWT 토큰은 apiClient의 인터셉터에서 자동으로 헤더에 추가됨
 * @returns {Promise} 과거 채팅 데이터
 */
export const getPastChatMessages = async () => {
  const response = await apiClient.get("/api/chat/chatMessages/past");
  return response.data;
};

/**
 * 오늘 채팅 메시지 조회
 * JWT 토큰은 apiClient의 인터셉터에서 자동으로 헤더에 추가됨
 * @returns {Promise} 오늘 채팅 데이터
 */
export const getTodayChatMessages = async () => {
  const response = await apiClient.get("/api/chat/chatMessages/today");
  return response.data;
};
