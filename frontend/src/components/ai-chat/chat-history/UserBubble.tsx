import { memo, type RefObject } from 'react';

interface UserBubbleProps {
  message: string;
  userBubbleRef?: RefObject<HTMLDivElement | null>;
}
export const UserBubble = memo(
  ({ message, userBubbleRef }: UserBubbleProps) => {
    return (
      <div
        ref={userBubbleRef}
        className="bg-grey-200 rounded-300 rounded-tr-0 w-fit max-w-[90%] self-end py-250 pr-400 pl-350"
      >
        <p className="body-small-medium text-grey-900 whitespace-break-spaces">
          {message}
        </p>
      </div>
    );
  },
);

UserBubble.displayName = 'UserBubble';
