interface StoreBusinessHoursInputErrorMessageProps {
  errorMessage?: string;
}

export const StoreBusinessHoursInputErrorMessage = ({
  errorMessage,
}: StoreBusinessHoursInputErrorMessageProps) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <p className="text-body-small text-others-red animate-shake">
      *{errorMessage}
    </p>
  );
};
