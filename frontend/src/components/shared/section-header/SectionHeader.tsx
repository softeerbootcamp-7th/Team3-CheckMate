import { SectionTitle } from '../section-title';

interface SectionHeaderProps {
  // sectionTitle 관련 props
  title: string; // 섹션의 제목
  description?: string; // 섹션에 대한 추가 설명

  rightSlot?: React.ReactNode;
}

export const SectionHeader = ({
  title,
  description,
  rightSlot,
}: SectionHeaderProps) => {
  return (
    <header className="flex justify-between gap-600">
      <div className="flex min-w-0 items-center gap-3">
        <SectionTitle title={title} description={description} />
      </div>
      {rightSlot}
    </header>
  );
};
