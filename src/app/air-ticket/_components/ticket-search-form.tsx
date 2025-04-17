import { Combobox } from '@/components/commons/combo-box';
import { TicketSearchFormProps } from '../../../types/air-ticket-type';
import { Button } from '@/components/ui/button';

const TicketSearchForm = ({
  departureList,
  departure,
  setDeparture,
  handleChange,
  handleSubmit,
}: TicketSearchFormProps) => {
  return (
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
          placeholder="제주"
          disabled
          className="self-end rounded border bg-gray-100 p-2 text-black placeholder-black"
        />
      </div>
      <input type="hidden" name="schArrvCityCode" value="CJU" />
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
      <div className="pt-6">
        <Button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          조회 하기
        </Button>
      </div>
    </form>
  );
};

export default TicketSearchForm;
