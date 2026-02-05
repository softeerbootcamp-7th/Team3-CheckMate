import { Button } from '@/components/shared/shadcn-ui';
import { API_BASE_URL } from '@/constants/shared';

export const SignInButton = () => {
  const handleClickSignInWithGoogle = async () => {
    const searchParams = new URLSearchParams();
    searchParams.set('redirectUrl', `${window.location.origin}/sign-in`);

    const googleAuthUrl = `${API_BASE_URL}/auth/google?${searchParams.toString()}`;
    window.location.href = googleAuthUrl;
  };
  return (
    <Button
      variant="ghost"
      className="rounded-300 bg-grey-200 flex h-fit w-80 items-center justify-start gap-12 px-5 py-[16.5px]"
      onClick={handleClickSignInWithGoogle}
    >
      <img src="/assets/icons/google.svg" alt="Google" />
      <span className="body-large-medium text-grey-900">
        Google 계정으로 로그인
      </span>
    </Button>
  );
};
