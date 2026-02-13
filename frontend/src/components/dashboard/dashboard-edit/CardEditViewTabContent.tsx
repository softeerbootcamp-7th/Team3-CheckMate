import type { MetricTabs } from '@/constants/dashboard';

import { CardEditViewTabContentItem } from './CardEditViewTabContentItem';

interface CardEditViewTabContentProps {
  sections: MetricTabs['sections'];
}
export const CardEditViewTabContent = ({
  sections,
}: CardEditViewTabContentProps) => {
  return (
    <main className="overflow-y-auto pb-10">
      {Object.values(sections).map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="title-small-bold text-grey-900 mt-10">
            {section.title}
          </h2>
          <ul>
            {Object.values(section.items).map((item) => (
              <CardEditViewTabContentItem key={item.label} items={item} />
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
};
