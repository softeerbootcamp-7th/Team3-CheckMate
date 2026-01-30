const HOURS = Array.from({ length: 25 }, (_, index) => index);
const MINUTES = [0, 30];

export const STORE_BUSINESS_HOURS_TIME_LIST = HOURS.flatMap((hour) =>
  MINUTES.map((minute) => ({ hour, minute })),
).slice(0, -1);

export const FINAL_STORE_BUSINESS_HOURS_TIME = {
  hour: HOURS.length - 1, // 24
  minute: MINUTES[0], // 0
};
