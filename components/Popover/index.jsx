import { Popover } from '@headlessui/react';

const PopoverElement = ({ content }) => {
  return (
    <Popover className="relative flex items-center">
      <Popover.Button>
        <svg
          className="w-5 h-5 ml-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"></path>
        </svg>
        <span className="sr-only">Show information</span>
      </Popover.Button>

      <Popover.Panel className="absolute -bottom-[5px] right-[30px] z-10 border border-shades-5 bg-white dark:bg-dark bg-opacity-95 p-3 w-70 dark:text-shades-9">
        <div className="absolute right-0 bottom-[15px] transform translate-x-1/2 translate-y-1/2 -rotate-45 w-4 h-4 bg-white dark:bg-dark bg-opacity-95 border-r border-b border-shades-5"></div>
        {content}
      </Popover.Panel>
    </Popover>
  );
};

export default PopoverElement;
