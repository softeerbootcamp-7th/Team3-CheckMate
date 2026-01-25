import { useEffect, useState } from 'react';

import { BotBubble } from '../bot-bubble/BotBubble';
import { BotLoading } from '../bot-loading/BotLoading';
import { UserBubble } from '../user-bubble/UserBubble';

export const ChatHistory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 2초 뒤 로딩 종료 (mock)
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex h-full flex-col justify-end px-500">
      <div className="flex flex-col gap-1 overflow-y-scroll">
        <UserBubble message="오늘 뭐가 제일 잘 팔렸을까?" />
        {isLoading ? <BotLoading /> : <BotBubble />}
      </div>
    </section>
  );
};
