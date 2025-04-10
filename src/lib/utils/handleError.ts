/**
 * @param context - 에러가 발생한 컨텍스트(예: "로그인 처리", "회원가입")를 전달합니다.
 * @param error - 발생한 에러 객체를 전달합니다.
 * @returns {object} - 표준화된 에러 객체를 반환합니다.
 */
export const handleError = (context: string, error: any) => {
  console.error(`${context} 중 오류 발생:`, error);
  return {
    error: {
      message: error.message || `${context} 중 오류가 발생했습니다.`,
      status: error.status || 500,
    },
  };
};
