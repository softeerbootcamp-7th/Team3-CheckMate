import { useCallback, useEffect, useRef } from 'react';

// Easing 함수
const easeOut = (t: number) => t * (2 - t);

// 각 세그먼트의 현재 시각적 상태
export interface SegmentState {
  startAngle: number;
  endAngle: number;
  midAngle: number; // 라벨 위치용
  labelOpacity: number;
}

// 각 세그먼트의 목표 상태
export interface Segment {
  startAngle: number;
  endAngle: number;
  midAngle: number; // 라벨 위치 계산용
  color: string;
  label: string;
  percentage: number;
}

// 애니메이션 옵션
export interface AnimationOptions {
  duration: number;
  onFrame: (states: SegmentState[]) => void;
  disabled?: boolean;
}

// linear interpolation
const lerp = (start: number, end: number, progress: number): number => {
  return start + (end - start) * progress;
};

export const useDoughnutAnimation = (
  segments: Segment[],
  { duration, onFrame, disabled = false }: AnimationOptions,
) => {
  const currentStatesRef = useRef<SegmentState[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // interpolation 계산 후 애니메이션 콜백 호출
  const runUpdateAnimation = useCallback(() => {
    const startStates = [...currentStatesRef.current];
    // 세그먼트 개수 조정
    if (startStates.length !== segments.length) {
      // 추가
      while (startStates.length < segments.length) {
        startStates.push({
          startAngle: 0,
          endAngle: 0,
          midAngle: 0,
          labelOpacity: 0,
        });
      }
      // 제거
      startStates.splice(segments.length);
    }

    const animate = (timestamp: number) => {
      if (disabled) {
        // 애니메이션이 비활성화된 경우 즉시 최종 상태로 설정
        const finalStates = segments.map((segment) => ({
          startAngle: segment.startAngle,
          endAngle: segment.endAngle,
          midAngle: segment.midAngle,
          labelOpacity: 1,
        }));
        currentStatesRef.current = finalStates;
        onFrame(finalStates);
        return;
      }

      // 애니메이션 시작 시간 설정
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = easeOut(Math.min(1, elapsed / duration)); // 1 넘어가면 제자리로 돌아옴

      // 각 세그먼트별로 interpolation 된 상태 계산
      const interpolatedStates = segments.map((lastState, index) => ({
        startAngle: lerp(
          startStates[index].startAngle,
          lastState.startAngle,
          progress,
        ),
        endAngle: lerp(
          startStates[index].endAngle,
          lastState.endAngle,
          progress,
        ),
        midAngle: lerp(
          startStates[index].midAngle,
          lastState.midAngle,
          progress,
        ),
        labelOpacity: progress, // 0 to 1
      }));

      currentStatesRef.current = interpolatedStates;

      // 프레임 콜백 호출 (ref 반영)
      onFrame(interpolatedStates);

      // 애니메이션 완료 여부 확인
      if (progress >= 1) {
        startTimeRef.current = 0;
        return;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    startTimeRef.current = 0;
    rafIdRef.current = requestAnimationFrame(animate);
  }, [segments, duration, onFrame, disabled]);

  // 세그먼트의 값 변경 시 애니메이션 실행
  useEffect(() => {
    if (segments.length === 0) {
      return;
    }

    // 기존 애니메이션 취소
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    runUpdateAnimation();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [segments, runUpdateAnimation]);
};
