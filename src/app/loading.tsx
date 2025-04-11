const Loading = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-16">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <p className="medium-18 mt-4">로딩 중...</p>
    </div>
  );
};

export default Loading;
