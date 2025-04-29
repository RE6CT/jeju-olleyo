/**
 * 에러 메시지를 표시하는 컴포넌트
 *
 * @param message 표시할 에러 메시지
 * @returns 에러 메시지 컴포넌트
 */

const ErrorMessage = ({ message }: { message: string | undefined }) => {
  return (
    <div className="flex h-6 min-h-6 items-center">
      {message && (
        <p className="regular-12 md:regular-14 text-red" role="alert">
          {message}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
