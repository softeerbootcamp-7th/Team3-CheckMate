import { cn } from '@/utils/shared';

interface StateWrapperProps {
  children: React.ReactNode;
  className?: string;
}

// 상태 표시용 래퍼 컴포넌트 (로딩중, 에러 등)
// 카드 형식(배경, 테두리 둥글게 등)의 껍데기. 정 가운데에 children를 배치 -> 오류 메시지나 스피너 등을 가운데 배치
export const StateWrapper = ({ children, className }: StateWrapperProps) => {
  return (
    <section
      className={cn(
        'rounded-400 bg-special-card-bg flex flex-col items-center justify-center px-8 pt-6 pb-9',
        className,
      )}
    >
      {children}
    </section>
  );
};
