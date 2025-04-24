import React, { useState } from 'react';

const TicketSearchSelector = () => {
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState('economy');

  const handlePassengerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPassengers(Number(e.target.value));
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClassType(e.target.value);
  };

  return (
    <div className="mb-7 mt-9 flex items-start gap-0">
      <span className="mr-[30px] whitespace-nowrap pt-1 text-18 font-medium">
        왕복
      </span>
      <div className="mr-9 min-w-0">
        <select
          value={passengers}
          onChange={handlePassengerChange}
          className="w-32 rounded border-none bg-transparent p-1 text-18"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              인원 {i + 1}명
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={classType}
          onChange={handleClassChange}
          className="w-32 rounded border-none bg-transparent p-1 text-18"
        >
          <option value="economy">이코노미</option>
          <option value="business">비지니스</option>
          <option value="first">퍼스트</option>
        </select>
      </div>
    </div>
  );
};

export default TicketSearchSelector;
