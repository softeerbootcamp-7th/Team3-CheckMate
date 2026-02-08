import { Badge } from '../../shared';

export const NotificationItem = () => {
  return (
    <li>
      <p className="text-grey-900 body-small-medium">
        1월 14일 하루 리포트가 발행되었습니다.
      </p>
      <Badge show={true} position="right">
        <span className="text-grey-500 caption-large-medium">36분 전</span>
      </Badge>
    </li>
  );
};
