import { CDN_BASE_URL } from '@/constants/shared';

export const BotLoading = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={`${CDN_BASE_URL}/assets/images/ai_chat_loading.svg`}
        alt="AI 답변 로딩 아이콘"
        className="size-6 animate-spin"
      />
      <span className="body-small-medium text-grey-500">답변 생각 중...</span>
    </div>
  );
};
