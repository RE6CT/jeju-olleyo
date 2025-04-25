/**
 * 일정의 기본 이미지를 랜덤하게 반환하는 함수
 * @returns {string} 기본 이미지 URL
 */
export const getDefaultPlanImage = () => {
  const DEFAULT_IMAGES = [
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plan-images/default/plan_default_1.png`,
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plan-images/default/plan_default_2.png`,
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plan-images/default/plan_default_3.png`,
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plan-images/default/plan_default_4.png`,
  ];

  const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
  return DEFAULT_IMAGES[randomIndex];
};
