import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthHeaderProps } from '@/types/auth.type';

/**
 * 인증 관련 페이지의 헤더 컴포넌트
 * @param title 페이지 제목
 * @param description 페이지 설명
 */
const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <CardHeader className="space-y-3">
      <CardTitle className="semibold-28 text-start text-gray-900">
        {title}
      </CardTitle>
      <CardDescription className="regular-18 text-start text-gray-900">
        {description}
      </CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;
