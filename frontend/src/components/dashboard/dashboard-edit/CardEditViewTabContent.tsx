import type { MetricSection } from '@/constants/dashboard';

import { CardEditViewTabContentItem } from './CardEditViewTabContentItem';

interface CardEditViewTabContentProps {
  sections: MetricSection[];
}
export const CardEditViewTabContent = ({
  sections,
}: CardEditViewTabContentProps) => {
  return (
    <main className="overflow-y-auto pb-10">
      {sections.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="title-small-bold text-grey-900 mt-10">
            {section.title}
          </h2>
          <ul>
            {section.items.map((item) => (
              <CardEditViewTabContentItem key={item.label} items={item} />
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
};
