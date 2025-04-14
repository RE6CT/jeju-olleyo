'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
<<<<<<< HEAD

type ComboBoxProp = {
  list: List;
  value: string;
  setValue: (newValue: string) => void;
  defaultMessage: string;
};
=======
import { ComboBoxProp } from '@/types/card.type';

>>>>>>> e880b71ee1b84ffdf0a9307d3c441856dc142ca9
/**
 * @param list 검색결과 하단에 보여줄 리스트
 * @param value 검색을 통해 전달할 값
 * @param setValue value의 useState
 * @param defaultMessage 검색 결과가 없을 경우 보여줄 메시지
 *
 * @example
 * ```
 * <Combobox list={list}
 * value = {value}
 * setValue = {setValue}
 * defaultMessage = "검색결과가 없습니다"
 * ></ComboBox>
 * ```
 */
<<<<<<< HEAD
export default function Combobox({
  list,
  value,
  setValue,
  defaultMessage,
}: ComboBoxProp) {
=======
const Combobox = ({ list, value, setValue, defaultMessage }: ComboBoxProp) => {
>>>>>>> e880b71ee1b84ffdf0a9307d3c441856dc142ca9
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
<<<<<<< HEAD
            ? list.find((list) => list.value === value)?.label
            : 'Select framework...'}
=======
            ? list.find((item) => item.value === value)?.label
            : '검색어를 선택해주세요'}
>>>>>>> e880b71ee1b84ffdf0a9307d3c441856dc142ca9
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
<<<<<<< HEAD
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>{defaultMessage}</CommandEmpty>
            <CommandGroup>
              {list.map((list) => (
                <CommandItem
                  key={list.value}
                  value={list.value}
=======
          <CommandInput placeholder="검색어를 선택해주세요" />
          <CommandList>
            <CommandEmpty>{defaultMessage}</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
>>>>>>> e880b71ee1b84ffdf0a9307d3c441856dc142ca9
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
<<<<<<< HEAD
                  {list.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === list.value ? 'opacity-100' : 'opacity-0',
=======
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === item.value ? 'opacity-100' : 'opacity-0',
>>>>>>> e880b71ee1b84ffdf0a9307d3c441856dc142ca9
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
<<<<<<< HEAD
}
=======
};

export default Combobox;
>>>>>>> e880b71ee1b84ffdf0a9307d3c441856dc142ca9
