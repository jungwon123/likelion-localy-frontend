/**
 * JWT 토큰을 파싱하여 payload를 추출
 * @param {string} token - JWT 토큰
 * @returns {object|null} - 파싱된 payload 객체 또는 null
 */
export const parseJwt = (token) => {
  try {
    if (!token) return null;

    // JWT는 header.payload.signature 형식
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    // base64url을 base64로 변환
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // base64 디코딩
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
};

/**
 * JWT 토큰에서 userId 추출
 * @param {string} token - JWT 토큰
 * @returns {string|null} - userId 또는 null
 */
export const getUserIdFromToken = (token) => {
  const payload = parseJwt(token);
  return payload?.sub || payload?.user_id || null;
};

/**
 * localStorage에서 JWT 토큰을 가져와 userId 추출
 * @returns {string|null} - userId 또는 null
 */
export const getCurrentUserId = () => {
  const token = localStorage.getItem("accessToken");
  return getUserIdFromToken(token);
};
