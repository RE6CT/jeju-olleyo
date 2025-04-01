import { Command, CommandInput } from '@/components/ui/command';
// import {
//   CommandEmpty,
//   CommandGroup,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from '@/components/ui/command';

export const SearchBar = () => {
  return (
    <>
      <Command className="w-[300px] rounded-lg border shadow-md">
        <CommandInput placeholder="검색어를 입력해 주세요" />
        {/* <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem disabled>
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <span>Profile</span>
            </CommandItem>
            <CommandItem>
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList> */}
      </Command>
    </>
  );
};
