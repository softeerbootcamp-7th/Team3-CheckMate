import { Button } from '@/components/shared/shadcn-ui';

interface SignInButtonProps {
  onClick?: () => void;
}
export const SignInButton = ({ onClick }: SignInButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="rounded-300 bg-grey-200 flex h-fit w-80 items-center justify-start gap-12 px-5 py-[16.5px]"
      onClick={onClick}
    >
      <img src="/assets/icons/google.svg" alt="Google" />
      <span className="body-large-medium text-grey-900">
        Google 계정으로 로그인
      </span>
    </Button>
  );
};
