const CalendarIcon = ({ fill, size }: { fill: string; size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.96429 1.71429C7.96429 0.767511 7.19677 0 6.25 0C5.30323 0 4.53571 0.767511 4.53571 1.71429V3.42857H2.82143C1.40127 3.42857 0.25 4.57983 0.25 6V8.57143H24.25V6C24.25 4.57983 23.0987 3.42857 21.6786 3.42857H19.9645V1.71429C19.9645 0.767511 19.197 0 18.2502 0C17.3034 0 16.5359 0.767511 16.5359 1.71429V3.42857H7.96429V1.71429ZM24.25 10.7143H0.25V21.4286C0.25 22.8487 1.40127 24 2.82143 24H21.6786C23.0987 24 24.25 22.8487 24.25 21.4286V10.7143Z"
        fill="currentColor"
        className={`text-${fill}`}
      />
    </svg>
  );
};

export default CalendarIcon;
