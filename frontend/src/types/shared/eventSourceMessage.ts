/**
 * @link https://developer.mozilla.org/ko/docs/Web/API/Server-sent_events/Using_server-sent_events#event
 */
export interface EventSourceMessage {
  // 이벤트 유형 식별
  event: string;
  // 이벤트 데이터 data: 형식
  data: string;
  // EventSource 객체의 마지막 이벤트 ID 값 설정
  id: string;
  // 몇 초 후 재시도할지
  retry?: number;
}
