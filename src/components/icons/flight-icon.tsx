const FlightIcon = ({ fill, size }: { fill: string; size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        d="M4.52273 6.94772L9.7155 1.68311C10.103 1.29064 10.093 0.663185 9.6955 0.280713C9.29798 -0.101759 8.66045 -0.0917594 8.27293 0.300712L3.08016 5.56282L1.05255 5.13036L0 6.19778L2.85765 7.2102L3.96271 10L5.01526 8.93508L4.52023 6.94772H4.52273Z"
        fill="currentColor"
        className={`text-${fill}`}
      />
      <path
        d="M8.3772 3.0421L6.93211 1.65948L1.4414 1.25L0.75 1.97246L4.85792 3.82684L6.30301 5.20947L8.33673 9.23122L9.02813 8.50877L8.3772 3.0421Z"
        fill="currentColor"
        className={`text-${fill}`}
      />
      <g opacity="0.5" filter="url(#filter0_f_1411_22062)">
        <path
          d="M4.79297 3.82714L4.85778 3.8564L6.25412 5.19238L8.36103 3.05632L6.93197 1.68903L6.9049 1.68701L4.79297 3.82714Z"
          fill="currentColor"
          className={`text-${fill}`}
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1411_22062"
          x="4.29297"
          y="1.18701"
          width="4.56836"
          height="4.50537"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.25"
            result="effect1_foregroundBlur_1411_22062"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default FlightIcon;
