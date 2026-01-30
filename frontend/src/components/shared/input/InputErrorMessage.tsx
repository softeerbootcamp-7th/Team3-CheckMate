interface InputErrorMessageProps {
  message?: string;
}

export const InputErrorMessage = ({ message }: InputErrorMessageProps) => {
  return <p className="text-body-small text-others-red">*{message}</p>;
};
