// src/components/shared/images/images.stories.tsx
export default {
  title: 'components/shared/images/images',
};

const CDN_BASE_URL = import.meta.env.VITE_CDN_HOST;
const PATH = '/assets/images';
const images = [
  'logoWithTitle.svg',
  'ai_chat_column.png',
  'ai_chat_row.svg',
  'google.svg',
  'analysis.svg',
  'dashboard.svg',
  'robot.svg',
  'report.svg',
  'pos.svg',
  'check.svg',
  'congratulation.svg',
  'warning.svg',
  'empty_dashboard.png',
  'empty_ingridient.svg',
  'up.svg',
  'down.svg',
  'graph_down.svg',
  'graph_up.svg',
  'line_graph.svg',
  'bar_graph.svg',
  'donut_chart.svg',
  'number.svg',
  'weather.svg',
  'pos_not_connected.svg',
  'precipitation.svg',
  'sun.svg',
  'sun_cloud.svg',
  'cloud.svg',
  'rain.svg',
  'heavy_rain.svg',
  'snow.svg',
];

export const ImageGallery = () => {
  const handleImageClick = (filename: string) => {
    navigator.clipboard.writeText(`${CDN_BASE_URL}${PATH}/${filename}`);
  };
  return (
    <div className="p-5">
      <p className="body-small-regular text-grey-600">
        S3에 저장된 {images.length}개의 정적 이미지입니다. 각 이미지 클릭 시
        이미지의 링크를 복사할 수 있습니다.
      </p>
      <div className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {images.map((filename) => (
          <div
            key={filename}
            className="border-grey-200 bg-grey-0 rounded-md border p-2.5 text-center"
          >
            <div className="bg-grey-0 flex h-30 w-full items-center justify-center">
              <img
                src={`${CDN_BASE_URL}${PATH}/${filename}`}
                alt={filename}
                className="max-h-full max-w-full cursor-pointer object-contain"
                onClick={() => handleImageClick(filename)}
              />
            </div>
            <span className="body-small-regular text-grey-600 word-break-all">
              {filename}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
