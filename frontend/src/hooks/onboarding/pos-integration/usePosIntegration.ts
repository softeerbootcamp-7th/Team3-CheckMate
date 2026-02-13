import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { postPosIntegration } from '@/services/onboarding/pos-integration';
import { sseClient } from '@/services/shared';
import type { EventSourceMessage } from '@/types/shared';

const POS_INTEGRATION_TIMEOUT = 5000;

export const usePosIntegration = () => {
  const [event, setEvent] = useState<EventSourceMessage | null>(null);

  const { mutate } = useMutation({
    mutationFn: postPosIntegration,
  });

  useEffect(() => {
    const abortController = new AbortController();
    sseClient('/api/sse/connection', {
      onmessage: (message) => {
        setEvent(message);
      },
      onerror: (error) => {
        console.error({ error });
      },
      signal: abortController.signal,
    });

    // 5초 뒤 포스 연동 요청
    const timeout = setTimeout(() => {
      mutate();
    }, POS_INTEGRATION_TIMEOUT);

    return () => {
      abortController.abort();
      clearTimeout(timeout);
    };
  }, [mutate]);

  return {
    event,
  };
};
