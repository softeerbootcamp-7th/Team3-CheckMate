import { Bike, House, ShoppingBag } from 'lucide-react';

import type { ToggleOption } from '@/types/admin';

export const SALES_TYPE_OPTIONS: ToggleOption[] = [
  { value: 'DINE_IN', label: '홀', icon: House } as const,
  { value: 'DELIVERY', label: '배달', icon: Bike } as const,
  { value: 'TAKE_OUT', label: '포장', icon: ShoppingBag } as const,
] as const;
