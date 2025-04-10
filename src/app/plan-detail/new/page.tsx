import PlanForm from './_components/plan-form';

const PlanDetailNewPage = () => {
  return (
    <div className="flex flex-col">
      <div className="border-b px-9">
        {/* 헤더 영역 */}
        <div className="flex gap-3 pt-6">
          <span className="font-pretendard text-28 font-bold leading-[130%]">
            내 일정 만들기
          </span>
          {/* TODO: 이미지 추가 */}
        </div>
        <PlanForm />
      </div>
    </div>
  );
};

export default PlanDetailNewPage;
