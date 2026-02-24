import { SheetTrigger } from '@/components/shared/shadcn-ui';
import { Button } from '@/components/shared/shadcn-ui';
import { CDN_BASE_URL } from '@/constants/shared';

export const ChatSheetTrigger = () => {
  return (
    <SheetTrigger asChild className="fixed bottom-15 left-10">
      <Button className="bg-grey-0 size-18 rounded-full border-none p-350 pb-400 shadow-[0_0_3.6px_0_rgba(0,0,0,0.15),0_3.6px_7.2px_0_rgba(0,0,0,0.08)]">
        <img
          src={`${CDN_BASE_URL}/assets/images/ai_chat_column.png`}
          className="h-9.5 w-11"
        />
      </Button>
    </SheetTrigger>
  );
};
