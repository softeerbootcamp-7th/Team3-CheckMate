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
  if (pathname.startsWith(ROUTE_PATHS.DASHBOARD.BASE)) {
    return <DashboardPageLoadingFallback />;
  }

  if (pathname.includes(ROUTE_PATHS.ANALYSIS.SALES)) {
    return <SalesPageLoadingFallback />;
  }

  if (pathname.includes(ROUTE_PATHS.ANALYSIS.MENU)) {
    return <MenuPageLoadingFallback />;
  }

  if (pathname.startsWith(ROUTE_PATHS.DAILY_REPORT)) {
    return <DailyReportPageLoadingFallback />;
  }

  if (pathname.startsWith(ROUTE_PATHS.SETTINGS.BASE)) {
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
