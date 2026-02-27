# 바 차트

# 기본 바 컴포넌트

막대 1개에 해당하는 컴포넌트

- 입력받은 **좌표/크기**(barMiddleX, barTopY, width, height)를 기반으로 실제 SVG `<path d="...">`를 만들어 렌더링
- 애니메이션
    1. **초기 등장 애니메이션**(마운트 시 아래→위로 차오름)
    2. **값/위치 변화 애니메이션**(path의 `d` 변경 시 부드럽게 전환)
- 그 외 UX 옵션
    - Tooltip on/off
    - Gradient on/off
    - Active 강조 색상
    - Hover 시 색상 변경 on/off

---

## svg 구조

루트는 `<g>`이고, 내부에 `<path>` 1개가 들어간다.

- `<g>`: 막대 를 감싸고 있는 요소
    - **transform(scaleY)** 기반 초기 등장 애니메이션의 대상
    - `transformOrigin`을 막대 바닥으로 잡아 아래에서 위로 차오르는 느낌을 만든다.
- `tooltip` 속성이 true라면 `ToolTip` 컴포넌트가 `<path>`  감쌈
- `<path>`: 실제 막대 도형
    - `useDrawBarPath()`가 만든 `pathD`를 `d`에 넣는다.

---
## Path 생성 

`<rect rx>` 대신 `<path d="...">`를 사용해 막대 모양을 직접 생성한다. 

이유: rect의 경우 일부 모서리만 둥글게 처리할 수 없고 모든 모서리에 둥글게가 적용된다 

path d에서 상단 라운드(radius)를 지원하기 위해 **Quadratic Bézier Curve(Q 커맨드)** 를 사용함

: 2차 베지어 곡선. 현재 위치 → 제어점 방향으로 휘어지며 → 도착점까지 이어지는 곡선임

### Path 구조(radius 유무와 상관 없이 동일)
<img width="806" height="587" alt="스크린샷 2026-02-27 오전 3 06 06" src="https://github.com/user-attachments/assets/a9b46fc9-1f85-42f0-8fff-c8bf169e7625" />


1. **바 상단 중앙**에서 시작(M)
2. 왼쪽 상단 라운드 시작점까지 이동
    - 왼쪽 상단 꼭지점보다 **x를 radius만큼 덜 간 지점**으로 이동
3. **Q 커맨드**로 왼쪽 상단 라운드 생성
    - 제어점(control point)을 **왼쪽 상단 꼭지점**으로 두고,
    - 도착점(end point)은 왼쪽 상단 꼭지점보다 **y를 radius만큼 내려간 지점**
4. 왼쪽 하단 꼭지점까지 내려감(L)
5. 오른쪽 하단 꼭지점까지 이동(L)
6. 오른쪽 상단 라운드 시작점까지 올라감(L)
    - 오른쪽 상단 꼭지점보다 **y를 radius만큼 내려간 지점**
7. **Q 커맨드**로 오른쪽 상단 라운드 생성
    - 제어점: 오른쪽 상단 꼭지점
    - 도착점: 상단 중앙(또는 우측 상단 라운드 끝점 → 상단 중앙으로 복귀)
8. 시작점으로 닫기(Z)

### radius값 클램핑
클램핑 = 값을 특정 범위 내로 제한
<img width="509" height="757" alt="스크린샷 2026-02-27 오전 3 06 35" src="https://github.com/user-attachments/assets/5ec1298c-c5e5-490d-94de-e88bf6e8e7a0" />

- 상단 라운드는 Q 커맨드를 이용해 좌표를 계산하며, radius 값은 시작점과 도착점 위치에 직접적으로 반영된다.

⇒ 이때 radius가 막대의 height 또는 width/2를 초과하면 도형이 깨질 수 있기 때문에 `min(radius, width/2, height)`로 클램핑하여 항상 안정적인 렌더링을 보장한다.

---


### 트러블슈팅: 이전 데이터가 0이었다가 값이 생기는 막대에서  `d` 애니메이션이 끊기는 문제

- 문제 상황
    
    초기 구현에서는 radius 유무에 따라 **서로 다른 d 커맨드 구조**를 사용했다.
    
    - radius가 있을 때: `Q` 커맨드 포함
    - radius가 없을 때: `Q` 없이 `H/V/L` 중심의 직선 경로로 구성
    
    이 상태에서 **이전 값이 0인 막대**는 `height=0 → radius도 0으로 조정`되며 “Q 없는 버전”의 d로 렌더링된다.
    
    이후 값이 생기면 radius가 다시 유효해지고 “Q 있는 버전”의 d로 바뀌는데, 이때 **d 문자열의 커맨드 시퀀스 구조가 달라**져 브라우저가 보간(interpolation)을 수행하지 못하고 애니메이션이 끊겨 보인다.
    
- 원인
    
    `d` 속성 애니메이션은 단순히 숫자 값만 바뀌는 게 아니라, **커맨드의 종류/개수/순서(시퀀스)** 가 유사해야 부드럽게 보간된다.
    
    (예: `M L L L Z` → `M Q L L Q Z` 처럼 구조 자체가 바뀌면 보간이 깨질 수 있음)
    

- 해결
    
    radius 유무로 `d` 시퀀스를 분기하지 않고, **radius가 0이어도 동일한 커맨드 시퀀스를 유지**한다.
    
    - radius=0일 때도 `Q` 커맨드를 사용
    - 단 곡률이 0이 되도록 제어점/도착점을 동일선상으로 두어 사실상 직선처럼 보이게 처리
    
    결과적으로,
    
    > 값이 0 → 값이 생김(0→양수) 같은 케이스에서도
    > 
    > 
    > d 구조가 유지되어 `d` transition 애니메이션이 자연스럽게 이어진다.
    > 

---

---

## 애니메이션 적용

### **초기 등장 애니메이션**: scaleY변화, useLayoutEffect, requestAnimationFrame 사용

- 첫 랜더링  시 “막대가 아래에서 위로 차오르는” 모션
- 방식: `<g>`에 `scaleY(0 → 1)` 적용
- useLayoutEffect를 쓰는 이유
    
    “paint 되기 전에 scaleY(0)이 먼저 적용”되어야 깜빡임이 없기 떄문
    
    - `useEffect`로 하면 첫 paint에서 scaleY(1) 상태로 한번 그려졌다가
        
        다음 tick에 scaleY(0)→1로 바뀌면서 **깜빡임/점프**가 발생할 수 있다.
        
    - `useLayoutEffect`는 paint 전에 실행되므로
        - 최초 렌더 직후 바로 `scaleY(0)` 세팅 → “처음부터 안 보이는 상태”로 시작 가능
- requestAnimationFrame을 쓰는 이유
    - 같은 프레임에서 `scaleY(0)`과 `scaleY(1)`을 연달아 넣으면
        
        브라우저가 상태 변화를 “한 번의 계산”으로 합쳐버려 transition이 안 걸릴 수 있다.
        
    - 그래서 다음 프레임으로 넘겨서
        - 첫 프레임: scaleY(0) 확정
        - 다음 프레임: transition 설정 후 scaleY(1) 로 **애니메이션이 확실히 발생**하게 만든다.

- transformOrigin 설정
    
    ```
    transformOrigin:`${barMiddleX}px${barTopY+height}px`
    ```
    
    - 막대의 바닥 중앙을 기준점으로 잡는다.
    - scaleY가 커질 때 위로 차오르는 느낌

### d 변화 애니메이션: `<path>`에 `transition: d ...`를 부여

값/좌표가 바뀌어 `pathD(d)`가 바뀔 때 뚝 끊기지 않고 부드럽게 변화

```
pathRef.current.style.transition=`d${DURATION}ms ease-in-out`;
```

---
