const HomeIcon = ({ fill, size }: { fill: string; size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.545455 10.3627C0.197561 10.6869 0 11.1411 0 11.6167V21.4286C0 22.8487 1.15127 24 2.57143 24H10.2857V18.8571C10.2857 17.9103 11.0532 17.1429 12 17.1429C12.9468 17.1429 13.7143 17.9103 13.7143 18.8571V24H21.4286C22.8487 24 24 22.8487 24 21.4286V11.6167C24 11.1411 23.8025 10.6869 23.4545 10.3627L12.5578 0.206352C12.2368 -0.0687838 11.7632 -0.0687841 11.4422 0.206352L0.545455 10.3627Z"
        fill="currentColor"
        className={`text-${fill}`}
      />
    </svg>
  );
};

export default HomeIcon;
