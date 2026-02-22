import {
  CHAT_DAILY_REPORT_QUESTIONS,
  CHAT_DASHBOARD_QUESTIONS,
  CHAT_DEFAULT_QUESTIONS,
  CHAT_MENU_ANALYSIS_QUESTIONS,
  CHAT_SALES_ANALYSIS_QUESTIONS,
  // CHAT_WEATHER_ANALYSIS_QUESTIONS,
} from '@/constants/ai-chat';
import { ROUTE_PATHS } from '@/constants/shared';

export const getRecommendedQuestions = (pathname: string) => {
  if (pathname.startsWith(ROUTE_PATHS.DAILY_REPORT)) {
    return CHAT_DAILY_REPORT_QUESTIONS;
  }
  if (pathname.startsWith(ROUTE_PATHS.DASHBOARD.BASE)) {
    return CHAT_DASHBOARD_QUESTIONS;
  }
  if (pathname.startsWith(ROUTE_PATHS.ANALYSIS.BASE)) {
    if (pathname.includes(ROUTE_PATHS.ANALYSIS.SALES)) {
      return CHAT_SALES_ANALYSIS_QUESTIONS;
    }
    if (pathname.includes(ROUTE_PATHS.ANALYSIS.MENU)) {
      return CHAT_MENU_ANALYSIS_QUESTIONS;
    }
    // if (pathname.includes(ROUTE_PATHS.ANALYSIS.WEATHER)) {
    //   return CHAT_WEATHER_ANALYSIS_QUESTIONS;
    // }
  }
  return CHAT_DEFAULT_QUESTIONS;
};
