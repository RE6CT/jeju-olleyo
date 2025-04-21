export const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-black bg-opacity-50">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
    </div>
  );
};
