import apiClient from "@/shared/api/client";

/**
 * 알람 목록 조회
 * GET /api/alarm/readAlarm
 * @returns {Promise} 알람 데이터
 * Response: { success, code, message, data: [{ id, type, title, body, createdAt, read }] }
 */
export const getAlarms = async () => {
  const response = await apiClient.get("/api/alarm/readAlarm");
  return response.data;
};
