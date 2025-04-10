/**
 * 에러 메시지를 표시하는 컴포넌트
 *
 * @param message 표시할 에러 메시지
 * @returns 에러 메시지 컴포넌트
 */

const ErrorMessage = ({ message }: { message: string | undefined }) => (
  <p className="mt-1 text-xs text-red-500">{message}</p>
);

export default ErrorMessage;
