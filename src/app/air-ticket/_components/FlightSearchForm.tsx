import { Dispatch, SetStateAction } from 'react';
import { Combobox } from '@/components/commons/combo-box';

interface FlightSearchFormProps {
  departureList: { label: string; value: string }[];
  departure: string;
  setDeparture: Dispatch<SetStateAction<string>>;
  formData: { schDate: string; returnDate: string; schArrvCityCode: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  departureList,
  departure,
  setDeparture,
  formData,
  handleChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-3">
    <div>
      <label className="mb-1 block text-sm font-medium">출발지</label>
      <Combobox
        list={departureList}
        value={departure}
        setValue={setDeparture}
        defaultMessage="출발지를 찾을 수 없습니다"
      />
    </div>
    <div>
      <label className="mb-1 block text-sm font-medium">도착지</label>
      <input
        type="text"
        name="schArrvCityCode"
        value="CJU"
        disabled
        className="self-end rounded border bg-gray-100 p-2 text-black"
      />
    </div>
    <div>
      <label className="mb-1 block text-sm font-medium">출발 일자</label>
      <input
        type="date"
        name="schDate"
        onChange={handleChange}
        className="rounded border p-2"
        required
      />
    </div>
    <div>
      <label className="mb-1 block text-sm font-medium">도착 일자</label>
      <input
        type="date"
        name="returnDate"
        onChange={handleChange}
        className="rounded border p-2"
        required
      />
    </div>
    <button
      type="submit"
      className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
    >
      조회 하기
    </button>
  </form>
);
