'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

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
import { cn } from '@/lib/utils';
import { ComboBoxProp } from '@/types/card.type';

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
export const Combobox = ({
  list,
  value,
  setValue,
  defaultMessage,
}: ComboBoxProp) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="relative h-full w-full justify-between pl-10 text-gray-300"
        >
          {value
            ? list.find((item) => item.value === value)?.label
            : '어디서 출발 하시나요?'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="어디서 출발 하시나요?" />
          <CommandList>
            <CommandEmpty>{defaultMessage}</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === item.value ? 'opacity-100' : 'opacity-0',
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
};
