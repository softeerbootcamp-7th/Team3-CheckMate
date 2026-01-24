interface UserBubbleProps {
  message: string;
}
export const UserBubble = ({ message }: UserBubbleProps) => {
  return (
    <div className="bg-grey-200 rounded-300 rounded-tr-0 w-fit self-end py-250 pr-400 pl-350">
      <p className="body-small-medium text-grey-900">{message}</p>
    </div>
  );
};
