import type { PropsWithChildren } from 'react';

export const StoreRegisterFormContentLayout = ({
  children,
}: PropsWithChildren) => {
  return (
    <section className="flex flex-col items-center pt-32">
      <div className="flex min-w-95 flex-col gap-12">{children}</div>
    </section>
  );
};
