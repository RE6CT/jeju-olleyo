const Loading = () => {
  return (
    <>
      <div
        className="fixed left-1/4 top-1/4 h-[123px] w-[127px] -translate-y-1/2 animate-rollAcross"
        role="status"
        aria-label="로딩 중"
      >
        <img src="/character/happy.png" alt="해피귤" />
        <span className="sr-only">로딩 중...</span>
      </div>
    </>
  );
};

export default Loading;
