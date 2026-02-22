import { Monitor, Smartphone, TabletSmartphone } from 'lucide-react';

import type { ToggleOption } from '@/types/admin';

export const ORDER_CHANNEL_OPTIONS: ToggleOption[] = [
  { value: 'POS', label: 'POS', icon: Monitor },
  { value: 'KIOSK', label: '키오스크', icon: TabletSmartphone },
  { value: 'DELIVERY_APP', label: '배달앱', icon: Smartphone },
] as const;
