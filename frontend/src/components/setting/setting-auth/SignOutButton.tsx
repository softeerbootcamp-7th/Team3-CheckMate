import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/shared/shadcn-ui';
import { ROUTE_PATHS } from '@/constants/shared';
import { postSignOut } from '@/services/auth';

export const SignOutButton = () => {
  const { mutate: signOut, isPending } = useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      window.location.replace(ROUTE_PATHS.SIGN_IN);
    },
    onError: () => {
      toast.error('로그아웃 다시 시도해주세요.');
    },
  });

  return (
    <Button
      className="rounded-400 bg-special-card-bg body-large-medium text-grey-700 flex h-fit w-full items-center justify-between p-500! hover:underline"
      onClick={() => signOut()}
      disabled={isPending}
    >
      <span className="text-grey-700 body-large-medium! h-full">로그아웃</span>
    </Button>
  );
};
