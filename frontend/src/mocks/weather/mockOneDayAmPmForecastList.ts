import { CDN_BASE_URL } from '@/constants/shared';
import type { WeatherForecastOneDayAmPm } from '@/types/weather';

const today = new Date();
const dateList: Date[] = []; // 오늘~+7일까지 date객체 담는 배열
for (let i = 0; i < 7; i++) {
  const date = new Date(today); // 임시 날짜 객체 생성
  date.setDate(today.getDate() + i); // i일 더하기
  dateList.push(date);
}
// [날씨예보 - 주간날씨예보] 임시데이터
export const mockOneDayAmPmForecastList: WeatherForecastOneDayAmPm[] = [
  {
    date: dateList[0],

    am: {
      iconPath: `${CDN_BASE_URL}/assets/images/cloud.svg`,
      temperature: 27,
    },
    pm: {
      iconPath: `${CDN_BASE_URL}/assets/images/rain.svg`,
      temperature: 22,
    },
  },
  {
    date: dateList[1],

    am: {
      iconPath: `${CDN_BASE_URL}/assets/images/sun.svg`,
      temperature: 27,
    },
    pm: {
      iconPath: `${CDN_BASE_URL}/assets/images/rain.svg`,
      temperature: 22,
    },
  },
  {
    date: dateList[2],

    am: {
      iconPath: `${CDN_BASE_URL}/assets/images/cloud.svg`,
      temperature: 27,
    },
    pm: {
      iconPath: `${CDN_BASE_URL}/assets/images/rain.svg`,
      temperature: 22,
    },
  },
  {
    date: dateList[3],

    am: {
      iconPath: `${CDN_BASE_URL}/assets/images/cloud.svg`,
      temperature: 27,
    },
    pm: {
      iconPath: `${CDN_BASE_URL}/assets/images/rain.svg`,
      temperature: 22,
    },
  },

  {
    date: dateList[4],

    am: {
      iconPath: `${CDN_BASE_URL}/assets/images/sun.svg`,
      temperature: 27,
    },
    pm: {
      iconPath: `${CDN_BASE_URL}/assets/images/rain.svg`,
      temperature: 22,
    },
  },
  {
    date: dateList[5],

    am: {
      iconPath: `${CDN_BASE_URL}/assets/images/sun.svg`,
      temperature: 27,
    },
    pm: {
      iconPath: `${CDN_BASE_URL}/assets/images/rain.svg`,
      temperature: 22,
    },
  },
  {
    date: dateList[6],

    am: {
      iconPath: `${CDN_BASE_URL}/assets/images/sun.svg`,
      temperature: 27,
    },
    pm: {
      iconPath: `${CDN_BASE_URL}/assets/images/rain.svg`,
      temperature: 22,
    },
  },
];
