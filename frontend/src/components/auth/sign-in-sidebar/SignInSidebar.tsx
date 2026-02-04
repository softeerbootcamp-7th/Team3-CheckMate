import { CDN_BASE_URL } from '@/constants/shared';

export const SignInSidebar = () => {
  return (
    <div className="size-full">
      <img
        src={`${CDN_BASE_URL}/assets/images/logoWithTitle.svg`}
        alt="Checkmate Logo"
        className="pt-20 pl-10"
      />
    </div>
  );
};
