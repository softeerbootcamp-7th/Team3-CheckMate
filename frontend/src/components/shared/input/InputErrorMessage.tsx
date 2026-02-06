interface InputErrorMessageProps {
  message?: string;
}

export const InputErrorMessage = ({ message }: InputErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <p className="text-body-small text-others-red animate-shake">*{message}</p>
  );
};
