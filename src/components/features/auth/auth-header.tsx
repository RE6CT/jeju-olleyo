import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthHeaderProps } from '@/types/auth.type';

/**
 * 인증 관련 페이지의 헤더 컴포넌트
 * @param title 페이지 제목
 * @param description 페이지 설명
 */
const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <CardHeader className="space-y-2">
      <CardTitle className="text-start">{title}</CardTitle>
      <CardDescription className="text-start text-sm">
        {description}
      </CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;
