import apiClient from "@/shared/api/client";

/**
 * 홈 데이터 조회 (감정 트렌드 요약)
 * GET /api/home
 * @returns {Promise} 감정 트렌드 데이터
 * Response: { success, code, message, data: { mostEmotion, happinessDiff } }
 */
export const getHomeData = async () => {
  const response = await apiClient.get("/api/home");
  return response.data;
};

/**
 * 최근 북마크 목록 조회
 * GET /api/home/recentBookmarks
 * @returns {Promise} 북마크 데이터
 * Response: { success, code, message, data: [{ bookmarkId, placeId, placeName, category, address, thumbnailImage, bookmarkedAt, bookmarkCount, bookmarkedEmotion }] }
 */
export const getRecentBookmarks = async () => {
  const response = await apiClient.get("/api/home/recentBookmarks");
  return response.data;
};
