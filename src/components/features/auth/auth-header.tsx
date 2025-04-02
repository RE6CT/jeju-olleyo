import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthHeaderProps } from '@/types/auth.type';

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-center text-2xl font-bold">{title}</CardTitle>
      <CardDescription className="text-center">{description}</CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;
