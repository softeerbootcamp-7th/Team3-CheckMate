import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      duration={35000}
      position="bottom-center"
      toastOptions={{
        classNames: { toast: 'body-small-semibold!' },
      }}
      style={
        {
          '--normal-bg': 'var(--color-grey-900)',
          '--normal-text': 'var(--color-grey-50)',
          '--normal-radius': 'var(--rounded-400)',
          '--normal-border': 'none',
          fontFamily: 'var(--font-pretendard)',

          // '--normal-bg': 'var(--popover)',
          // '--normal-text': 'var(--popover-foreground)',
          // '--normal-border': 'var(--border)',
          // '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
