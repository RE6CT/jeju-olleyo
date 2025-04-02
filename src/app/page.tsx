import CategoryCard from '@/components/features/category-card';
import PlanCard from '@/components/features/plan-card';
import SearchCard from '@/components/features/search-card';

export default function Home() {
  const image =
    'https://i.namu.wiki/i/A5upgQXHJ9gexcSq2YbfSTZOj_-LaGlG29qIWdwWAn3k9Q9ooELFPKGFxCVKAF0RqiwL907ZxCmnO2gyweUsZ557HxSr23Pw-52_XF8pgJCTGl797OQrbKvufsZxznnMl_cmiAJMbUutH915FBm-rA.webp';
  const title = 'Lorem';
  const description =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry';
  const className = 'none';
  const location = '치이카와시 치이카와구 치이카와동 치이카와123-123';
  const tag = '카페';
  return (
    <>
      <PlanCard
        image={image}
        title={title}
        description={description}
        className={className}
      />
      <SearchCard image={image} title={title} className={className} />
      <CategoryCard
        image={image}
        title={title}
        description={description}
        className={className}
        location={location}
        tag={tag}
      />
    </>
  );
}
