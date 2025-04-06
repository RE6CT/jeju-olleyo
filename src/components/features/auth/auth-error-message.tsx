/**
 * 인증 관련 에러 메시지를 표시하는 컴포넌트
 * @param props 컴포넌트 속성
 * @param props.messages 표시할 에러 메시지 배열
 * @param props.className 추가 CSS 클래스
 */
const AuthErrorMessage = ({
  messages,
  className = '',
}: {
  messages: string[];
  className?: string;
}) => {
  return (
    <div className={`mb-4 rounded-md p-3 ${className}`}>
      <div className="text-red-600">
        {messages.map((message, index) => (
          <p key={index} className={index > 0 ? 'mt-1' : ''}>
            {message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AuthErrorMessage;
