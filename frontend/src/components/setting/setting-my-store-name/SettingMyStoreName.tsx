export const SettingMyStoreName = ({ storeName }: { storeName: string }) => {
  return (
    <article className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="body-large-semibold text-grey-900">매장명</span>
        <span className="body-medium-medium text-grey-600">
          서비스 안에서 표시될 이름이에요
        </span>
      </div>
      <div className="rounded-200 bg-grey-100 body-large-semibold text-grey-900 px-400 py-250">
        {storeName}
      </div>
    </article>
  );
};
