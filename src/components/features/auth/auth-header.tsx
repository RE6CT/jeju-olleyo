import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthHeaderProps } from '@/types/auth.type';

/**
 * 인증 관련 페이지의 헤더 컴포넌트
 *
 * @param title 페이지 제목
 * @param description 페이지 설명
 */

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <CardHeader className="space-y-4">
      {/* 페이지 제목 */}
      <CardTitle className="text-start text-2xl font-bold">{title}</CardTitle>
      {/* 페이지 설명 */}
      <CardDescription className="text-start">{description}</CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;
