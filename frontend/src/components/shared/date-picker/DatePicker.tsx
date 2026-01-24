import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui';

export const DatePicker = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">DatePicker</Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="shadow-card-floating rounded-400 flex w-full gap-600 border-none p-4"
      >
        <section className="rounded-300 border-grey-300 w-80 border p-350">
          <div className="size-full">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="size-fit">
                <ChevronLeft className="size-5" />
              </Button>
              <span className="body-small-bold">2026년 1월</span>
              <Button variant="ghost" size="icon" className="size-fit">
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
        </section>
        <div>기간 선택</div>
      </PopoverContent>
    </Popover>
  );
};
