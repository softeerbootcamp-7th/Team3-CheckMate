import { XIcon } from 'lucide-react';

import { PeriodTag } from '@/components/shared/edit-card-wrapper/PeriodTag';
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

export const DashboardEditLayout = () => {
  return (
    <div className="flex size-full">
      <section className="flex min-w-160 grow flex-col p-6.25 pt-20">
        <header className="mb-20 pl-5">
          <h1 className="title-large-bold text-grey-900">퇴근</h1>
        </header>
        <div className="grid grow grid-cols-3 grid-rows-3 gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'rounded-400',
                index < 5
                  ? 'bg-grey-0 relative border-none'
                  : 'border-grey-500 border-[1.5px] border-dashed',
              )}
            >
              {index < 5 && (
                <>
                  <Button className="bg-grey-100 rounded-unlimit absolute top-2.5 right-2.5 size-6">
                    <XIcon className="text-grey-700 size-5" />
                  </Button>
                  <div className="flex h-full flex-col items-center justify-center">
                    <img
                      src="placeholder.png"
                      alt="판매유형별 매출 그래프 미니 뷰"
                    />
                    <p className="body-small-medium text-grey-900 mt-200 mb-100">
                      판매유형별 매출
                    </p>
                    <PeriodTag isAdded period={'이번달'} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="bg-special-card-bg w-[800px] pt-20 pr-[20px] pl-12.5">
        <header className="flex items-center justify-between">
          <h1 className="title-large-bold text-grey-900">카드 편집</h1>
          <div>
            <Button>나가기</Button>
            <Button>편집 완료</Button>
          </div>
        </header>
        <main>
          <Tabs defaultValue="sales">
            <TabsList className="my-10">
              <TabsTrigger value={'sales'}>매출분석</TabsTrigger>
              <TabsTrigger value={'menu'}>메뉴분석</TabsTrigger>
              <TabsTrigger value={'weather'}>날씨분석</TabsTrigger>
            </TabsList>
            <TabsContent value={'sales'}>매출카드들</TabsContent>
            <TabsContent value={'menu'}>메뉴카드들</TabsContent>
            <TabsContent value={'weather'}>날씨카드들</TabsContent>
          </Tabs>
        </main>
      </section>
    </div>
  );
};
