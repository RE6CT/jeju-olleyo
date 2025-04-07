'use client';
const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-red-600">
      <p className="text-lg font-medium">오류 발생: {message}</p>
    </div>
  );
};

export default ErrorMessage;
