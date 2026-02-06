import { ROUTE_PATHS } from '../shared';

const CHAT_DAILY_REPORT_QUESTIONS = [
  '오늘 핵심 3가지만 요약해줘',
  '객단가 변화가 의미하는 바가 뭐야?',
  '내일 주의할 점만 알려줘',
] as const;

const CHAT_DASHBOARD_QUESTIONS = [
  '지금 상태를 한 줄로 요약해줘',
  '이 화면에서 주의할 포인트가 있을까?',
  '지금 뭐부터 확인하면 좋을지 우선순위로 알려줘',
] as const;

const CHAT_SALES_ANALYSIS_QUESTIONS = [
  '오늘 실매출이 어떻게 움직였어?',
  '매출 변화의 핵심 지표 1개만 꼽아줘',
  '시간대별 매출 패턴 해석해줘',
] as const;

const CHAT_MENU_ANALYSIS_QUESTIONS = [
  '매출 기준 랭킹 요약해줘',
  '매출 vs 주문수 순위 차이가 있어?',
  '최근 인기 조합을 어떻게 활용할까?',
] as const;

const CHAT_WEATHER_ANALYSIS_QUESTIONS = [
  '오늘 날씨가 주문에 미친 영향 요약해줘',
  '강수일과 비강수일 차이를 한 문장으로 정리해줘',
  '기온별 주문건수 패턴을 해석해줘',
] as const;

const CHAT_DEFAULT_QUESTIONS = [
  '지금 상태를 한 줄로 요약해줘',
  '이 화면에서 주의할 포인트가 있을까?',
  '지금 뭐부터 확인하면 좋을지 우선순위로 알려줘',
] as const;

export const getChatRecommendedQuestions = (pathname: string) => {
  if (pathname.startsWith(ROUTE_PATHS.DAILY_REPORT)) {
    return CHAT_DAILY_REPORT_QUESTIONS;
  }
  if (pathname.startsWith(ROUTE_PATHS.DASHBOARD)) {
    return CHAT_DASHBOARD_QUESTIONS;
  }
  if (pathname.startsWith(ROUTE_PATHS.ANALYSIS.BASE)) {
    if (pathname.includes(ROUTE_PATHS.ANALYSIS.SALES)) {
      return CHAT_SALES_ANALYSIS_QUESTIONS;
    }
    if (pathname.includes(ROUTE_PATHS.ANALYSIS.MENU)) {
      return CHAT_MENU_ANALYSIS_QUESTIONS;
    }
    if (pathname.includes(ROUTE_PATHS.ANALYSIS.WEATHER)) {
      return CHAT_WEATHER_ANALYSIS_QUESTIONS;
    }
  }
  return CHAT_DEFAULT_QUESTIONS;
};
