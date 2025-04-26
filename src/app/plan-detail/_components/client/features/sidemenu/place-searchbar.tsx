'use client';

const CloseIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="0.5" width="20" height="20" rx="10" fill="#C7D5DC" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.13814 5.63814C5.38222 5.39406 5.77794 5.39406 6.02202 5.63814L9.9995 9.61561L13.977 5.63814C14.221 5.39406 14.6168 5.39406 14.8609 5.63814C15.1049 5.88221 15.1049 6.27794 14.8609 6.52202L10.8834 10.4995L14.8609 14.477C15.1049 14.721 15.1049 15.1168 14.8609 15.3609C14.6168 15.6049 14.221 15.6049 13.977 15.3609L9.9995 11.3834L6.02202 15.3609C5.77794 15.6049 5.38221 15.6049 5.13814 15.3609C4.89406 15.1168 4.89406 14.721 5.13814 14.477L9.11561 10.4995L5.13814 6.52202C4.89406 6.27794 4.89406 5.88221 5.13814 5.63814Z"
      fill="#E7EDF0"
    />
  </svg>
);

const PlaceSearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) => {
  return (
    <div className="w-[240px] rounded-[12px] bg-gray-100 px-3 py-2">
      <div className="flex items-center gap-3">
        <img src="/icons/search.svg" alt="검색" className="h-5 w-5" />
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="장소를 검색해 추가하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="medium-14 w-full border-none bg-transparent text-gray-500 placeholder:text-gray-400 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-0 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceSearchBar;
