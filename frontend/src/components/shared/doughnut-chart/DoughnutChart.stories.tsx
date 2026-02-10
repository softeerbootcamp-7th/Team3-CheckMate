import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { RANKING_COLORS } from '@/constants/shared';
import type { DoughnutChartItem } from '@/types/shared';

import { DoughnutChart } from './DoughnutChart';

const meta = {
  title: 'components/shared/doughnut-chart/DoughnutChart',
  component: DoughnutChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DoughnutChart>;

export default meta;

type Story = StoryObj<typeof DoughnutChart>;

const DoughnutChartStory = () => {
  const [segments, setSegments] = useState<DoughnutChartItem[]>(BASE_SEGMENTS);

  const updateSegment = (index: number, patch: Partial<DoughnutChartItem>) =>
    setSegments((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item,
      ),
    );

  const addSegment = () =>
    setSegments((prev) => [
      ...prev,
      {
        label: `Custom ${prev.length + 1}`,
        value: 10,
        color: '#0EA5E9',
      },
    ]);

  const randomize = () =>
    setSegments((prev) =>
      prev.map((segment) => ({
        ...segment,
        value: Math.round(Math.random() * 60) + 5,
      })),
    );

  return (
    <>
      <DoughnutChart
        title="도넛 차트 접근성 제목"
        chartData={segments}
        animationDuration={600}
      />

      <section aria-label="차트 데이터 조정">
        <p className="body-large-medium mb-2">chartData</p>
        {segments.map((segment, index) => (
          <ControlRow
            key={`${segment.label}-${index}`}
            index={index}
            segment={segment}
            onChange={(patch) => updateSegment(index, patch)}
            onRemove={() =>
              setSegments((prev) => prev.filter((_, idx) => idx !== index))
            }
          />
        ))}
        <button
          onClick={addSegment}
          className="bg-brand-50 rounded-200 body-small-medium my-2 block w-fit px-2"
        >
          슬라이스 추가
        </button>
        <button
          onClick={randomize}
          className="bg-brand-50 rounded-200 body-small-medium block w-fit px-2"
        >
          무작위 값
        </button>
      </section>
    </>
  );
};

export const Playground: Story = {
  render: () => <DoughnutChartStory />,
};

const BASE_SEGMENTS: DoughnutChartItem[] = [
  { label: '카드', value: 237, color: RANKING_COLORS[0] },
  { label: '현금', value: 256, color: RANKING_COLORS[1] },
  { label: '간편결제', value: 753, color: RANKING_COLORS[2] },
  { label: '기타', value: 389, color: RANKING_COLORS[3] },
];

const ControlRow = ({
  index,
  segment,
  onChange,
  onRemove,
}: {
  index: number;
  segment: DoughnutChartItem;
  onChange: (value: Partial<DoughnutChartItem>) => void;
  onRemove: () => void;
}) => (
  <div className="border-b-grey-300 mb-1 grid grid-cols-4 items-center gap-2 border-b">
    <input
      aria-label={`Label ${index}`}
      value={segment.label}
      onChange={(event) => onChange({ label: event.target.value })}
    />
    <input
      type="number"
      min={0}
      value={segment.value}
      onChange={(event) =>
        onChange({ value: Math.max(0, Number(event.target.value)) })
      }
    />
    <input
      type="color"
      value={segment.color || '#000000'}
      onChange={(event) => onChange({ color: event.target.value })}
    />
    <button
      type="button"
      onClick={onRemove}
      className="bg-brand-50 rounded-200 body-small-medium w-fit px-2"
    >
      제거
    </button>
  </div>
);
