import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthHeaderProps } from '@/types/auth.type';

/**
 * 인증 관련 페이지의 헤더 컴포넌트
 * @param title 페이지 제목
 * @param description 페이지 설명
 */
const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <header>
      <CardHeader className="space-y-3">
        <h1 className="semibold-28 text-start text-gray-900">{title}</h1>
        <CardDescription className="regular-18 text-start text-gray-900">
          {description}
        </CardDescription>
      </CardHeader>
    </header>
  );
};

export default AuthHeader;
