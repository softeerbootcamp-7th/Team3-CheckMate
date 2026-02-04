export const checkStoreBusinessHoursIsOver24 = (
  openTime?: string,
  closeTime?: string,
): boolean | undefined => {
  if (openTime === undefined || closeTime === undefined) {
    return undefined;
  }

  const [openHour, openMinute] = openTime.split(':').map(Number);
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);

  if (openHour < closeHour) {
    return false;
  }

  if (openHour === closeHour && openMinute < closeMinute) {
    return false;
  }

  return true;
};
