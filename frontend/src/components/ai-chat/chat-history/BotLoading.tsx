export const BotLoading = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="src/assets/images/ai-mate-loading.svg"
        alt="AI 답변 로딩 아이콘"
        className="size-6 animate-spin"
      />
      <span className="body-small-medium text-grey-500">답변 생각 중...</span>
    </div>
  );
};
