import LikesList from './components/likes-list';

const LikesPage = async () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <LikesList />
    </div>
  );
};

export default LikesPage;
