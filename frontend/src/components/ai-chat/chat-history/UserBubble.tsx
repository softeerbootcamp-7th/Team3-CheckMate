import { memo, type RefObject } from 'react';

interface UserBubbleProps {
  message: string;
  ref: RefObject<HTMLDivElement | null>;
}
export const UserBubble = memo(({ message, ref }: UserBubbleProps) => {
  return (
    <div
      ref={ref}
      className="bg-grey-200 rounded-300 rounded-tr-0 w-fit max-w-[90%] self-end py-250 pr-400 pl-350"
    >
      <p className="body-small-medium text-grey-900 whitespace-break-spaces">
        {message}
      </p>
    </div>
  );
});
