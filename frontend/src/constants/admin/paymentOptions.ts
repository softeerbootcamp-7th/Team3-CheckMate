import { CreditCard, Ellipsis, SmartphoneNfc, Wallet } from 'lucide-react';

import type { ToggleOption } from '@/types/admin';

export const PAYMENT_OPTIONS: ToggleOption[] = [
  { value: 'CARD', label: '카드', icon: CreditCard },
  { value: 'CASH', label: '현금', icon: Wallet },
  { value: 'EASY_PAY', label: '간편 결제', icon: SmartphoneNfc },
  { value: 'ETC', label: '기타', icon: Ellipsis },
] as const;
