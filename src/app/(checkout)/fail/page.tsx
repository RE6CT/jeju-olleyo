const FailPage = ({
  searchParams,
}: {
  searchParams: {
    code?: string;
    message?: string;
  };
}) => {
  const { code, message } = searchParams;

  return (
    <div>
      <h2>결제 실패</h2>
      <p>{`실패 사유: ${message}`}</p>
    </div>
  );
};

export default FailPage;
