import type { EventSourceMessage } from '@/types/shared';

const createNewMessage = (
  eventType?: string,
  data?: string,
  id?: string,
  retry?: number,
): EventSourceMessage => {
  return {
    event: eventType ?? '',
    data: data ?? '',
    id: id ?? '',
    retry: retry ?? undefined,
  };
};

export const parseRawEvent = (
  rawEvent: string,
  onRetry?: (retry: number) => void,
) => {
  const lines = rawEvent.split('\n');
  let eventType: string | undefined;
  let data = '';
  let id: string | undefined;
  let retry: number | undefined;

  for (const line of lines) {
    if (line.startsWith('event:')) {
      eventType = line.replace('event:', '').trim();
      continue;
    }

    if (line.startsWith('data:')) {
      data += line.replace('data:', '');
      continue;
    }

    if (line.startsWith('id:')) {
      id = line.replace('id:', '').trim();
      continue;
    }

    if (line.startsWith('retry:')) {
      retry = parseInt(line.replace('retry:', '').trim(), 10);
      if (!isNaN(retry)) {
        onRetry?.(retry);
      }
    }
  }

  if (data !== '') {
    return createNewMessage(eventType, data, id, retry);
  }
  return null;
};
