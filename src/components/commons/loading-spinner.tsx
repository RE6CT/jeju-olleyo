export const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-[1px] transition-opacity">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );
};
