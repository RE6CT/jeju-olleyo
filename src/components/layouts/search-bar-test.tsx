import { Command, CommandInput } from '@/components/ui/command';

const SearchBarTest = () => {
  return (
    <>
      <Command className="w-[300px] rounded-lg border">
        <CommandInput placeholder="검색어를 입력해 주세요" />
      </Command>
    </>
  );
};

export default SearchBarTest;
