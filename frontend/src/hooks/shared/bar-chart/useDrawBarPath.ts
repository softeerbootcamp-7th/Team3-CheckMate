interface UseDrawBarPathProps {
  barMiddleX: number;
  barTopY: number; // bottom y
  width: number;
  height: number; // upward height
  radius?: number;
}

export const useDrawBarPath = ({
  barMiddleX, // 바의 상단 정중앙 x 좌표
  barTopY, // 바의 상단 정중앙 y 좌표
  width,
  height,
  radius = 0,
}: UseDrawBarPathProps) => {
  // bar의 바닥 y 좌표
  const bottomY = barTopY + height;
  const leftX = barMiddleX - width / 2;
  const rightX = barMiddleX + width / 2;

  const pathD = `
      M ${barMiddleX} ${barTopY}
      H ${leftX + radius}
      Q ${leftX} ${barTopY} ${leftX} ${barTopY + radius}
      V ${bottomY}
      H ${rightX}
      V ${barTopY + radius}
      Q ${rightX} ${barTopY} ${rightX - radius} ${barTopY}
      Z
    `;

  return { pathD };
};
