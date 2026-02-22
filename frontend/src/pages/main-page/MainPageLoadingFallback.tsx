import { useLocation } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { CDN_BASE_URL, ROUTE_PATHS } from '@/constants/shared';

import { DailyReportPageLoadingFallback } from '../daily-report-page';
import { DashboardPageLoadingFallback } from '../dashboard-page';
import { MenuPageLoadingFallback } from '../menu-page';
import { SalesPageLoadingFallback } from '../sales-page';
import { SettingPageLoadingFallback } from '../setting-page';

interface LoadingContentProps {
  pathname: string;
}

const LoadingContent = ({ pathname }: LoadingContentProps) => {
  const {
    DASHBOARD: { BASE: DASHBOARD_BASE },
    ANALYSIS: {
      BASE: ANALYSIS_BASE,
      SALES: ANALYSIS_SALES,
      MENU: ANALYSIS_MENU,
    },
    DAILY_REPORT,
    SETTINGS: { BASE: SETTINGS_BASE },
  } = ROUTE_PATHS;

  const dashboardPath = `${DASHBOARD_BASE}`;
  const analysisSalesPath = `${ANALYSIS_BASE}/${ANALYSIS_SALES}`;
  const analysisMenuPath = `${ANALYSIS_BASE}/${ANALYSIS_MENU}`;
  const dailyReportPath = `${DAILY_REPORT}`;
  const settingsPath = `${SETTINGS_BASE}`;

  if (pathname.startsWith(dashboardPath)) {
    return <DashboardPageLoadingFallback />;
  }

  if (pathname.startsWith(analysisSalesPath)) {
    return <SalesPageLoadingFallback />;
  }

  if (pathname.startsWith(analysisMenuPath)) {
    return <MenuPageLoadingFallback />;
  }

  if (pathname.startsWith(dailyReportPath)) {
    return <DailyReportPageLoadingFallback />;
  }

  if (pathname.startsWith(settingsPath)) {
    return <SettingPageLoadingFallback />;
  }

  return <Spinner className="size-5" />;
};

export const MainPageLoadingFallback = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-special-dashboard-bg flex size-full">
      <div className="bg-special-card-bg h-full w-75">
        <object
          data={`${CDN_BASE_URL}/assets/images/logoWithTitle.svg`}
          className="mt-21 ml-10"
        />
      </div>
      <div className="flex h-full flex-1 justify-center gap-8.5 px-10 pt-8">
        <div className="flex w-[1060px] flex-col gap-8.5">
          <LoadingContent pathname={pathname} />
        </div>
      </div>
    </div>
  );
};
