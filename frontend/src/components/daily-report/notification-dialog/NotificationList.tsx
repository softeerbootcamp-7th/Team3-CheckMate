import { NotificationItem } from './NotificationItem';

export const NotificationList = () => {
  return (
    <ul className="mt-4 flex h-85 flex-col gap-4 overflow-y-scroll">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          // key는 index로 임시 설정
          <NotificationItem key={index} />
        ))}
    </ul>
  );
};
