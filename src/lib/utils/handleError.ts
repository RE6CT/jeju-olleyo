/**
 * 안전한 에러 처리를 위한 함수
 * @param context - 에러가 발생한 컨텍스트(예: "로그인 처리", "회원가입")를 전달합니다.
 * @param error - 발생한 에러 객체를 전달합니다.
 * @returns {object} - 표준화된 에러 객체를 반환합니다.
 */
export const handleError = (context: string, error: unknown) => {
  console.error(`${context} 중 오류 발생:`, error);

  // 에러가 Error 객체인 경우
  if (error instanceof Error) {
    return {
      error: {
        message: error.message,
        status: 500,
      },
    };
  }

  // 에러가 AuthError나 PostgrestError 형태인 경우
  if (typeof error === 'object' && error !== null && 'message' in error) {
    // 타입 가드를 통한 안전한 타입 변환
    const errorObj = error as { message: string; status?: number };
    return {
      error: {
        message: errorObj.message,
        status: errorObj.status || 500,
      },
    };
  }

  // 그 외의 경우
  return {
    error: {
      message: `${context} 중 오류가 발생했습니다.`,
      status: 500,
    },
  };
};
