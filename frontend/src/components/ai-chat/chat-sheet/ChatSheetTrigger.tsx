import { Button } from '@/components/shared/ui/button';
import { SheetTrigger } from '@/components/shared/ui/sheet';

export const ChatSheetTrigger = () => {
  return (
    <SheetTrigger asChild>
      <Button className="bg-grey-0 size-18 rounded-full border-none p-350 pb-400 shadow-[0_0_3.6px_0_rgba(0,0,0,0.15),0_3.6px_7.2px_0_rgba(0,0,0,0.08)]">
        <img
          src="/assets/images/ai-mate-logo-col.png"
          alt="AI mate 로고"
          className="h-9.5 object-contain"
        />
      </Button>
    </SheetTrigger>
  );
};
