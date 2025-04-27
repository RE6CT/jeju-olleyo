const CalendarIcon = ({ fill, size }: { fill: string; size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 36.6C6 39.66 8.34 42 11.4 42H36.6C39.66 42 42 39.66 42 36.6V22.2H6V36.6ZM36.6 9.6H33V7.8C33 6.72 32.28 6 31.2 6C30.12 6 29.4 6.72 29.4 7.8V9.6H18.6V7.8C18.6 6.72 17.88 6 16.8 6C15.72 6 15 6.72 15 7.8V9.6H11.4C8.34 9.6 6 11.94 6 15V18.6H42V15C42 11.94 39.66 9.6 36.6 9.6Z"
        fill="currentColor"
        className={`text-${fill}`}
      />
    </svg>
  );
};

export default CalendarIcon;
