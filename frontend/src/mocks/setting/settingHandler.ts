import { HttpResponse } from 'msw';

import { type SuccessResponse } from '@/services/shared';
import type { GetSettingMyStoreInfoResponseDto } from '@/types/setting';

import { mswHttp } from '../shared';

const getHandler = [
  mswHttp.get('/api/setting/my-store-info', () => {
    return HttpResponse.json<SuccessResponse<GetSettingMyStoreInfoResponseDto>>(
      {
        success: true,
        message: 'Success',
        data: {
          storeName: '최고삼 카페',
          salesClosingHour: 13,
          businessHourResponses: [
            {
              dayOfWeek: 'MON',
              openTime: '09:00',
              closeTime: '18:00',
              is24: false,
              closed: false,
              isOver24: false,
            },
            {
              dayOfWeek: 'TUE',
              openTime: '09:00',
              closeTime: '18:00',
              is24: false,
              closed: false,
              isOver24: false,
            },
            {
              dayOfWeek: 'WED',
              openTime: '09:00',
              closeTime: '18:00',
              is24: false,
              closed: false,
              isOver24: false,
            },
            {
              dayOfWeek: 'THU',
              openTime: '09:00',
              closeTime: '18:00',
              is24: false,
              closed: false,
              isOver24: false,
            },
            {
              dayOfWeek: 'FRI',
              openTime: '09:00',
              closeTime: '22:00',
              is24: false,
              closed: false,
              isOver24: false,
            },
            {
              dayOfWeek: 'SAT',
              openTime: '10:00',
              closeTime: '23:30',
              is24: false,
              closed: false,
              isOver24: false,
            },
            {
              dayOfWeek: 'SUN',
              closed: true,
              is24: false,
              isOver24: false,
            },
          ],
        },
      },
      {
        status: 200,
      },
    );
  }),
];

export const settingHandler = [...getHandler];
