# 프론트엔드 README

CheckMate 프론트엔드의 기술 선택 배경, 프로젝트 구조, 개발 규칙을 정리한 문서입니다.

## 문서 목적

1. 팀 내 기술 선택 배경을 빠르게 공유
2. 유지보수 시 의사결정 기준 제공
3. 대체 기술 검토 시 비교 기준 확보

---

## 빠른 시작

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm storybook
```

---

## 프론트엔드 기술 스택

### 1) 기초 스택

#### React 19

Meta가 지속적으로 개발하는 UI 라이브러리로, 장기 유지보수 관점에서 안정성이 높습니다.

- 컴포넌트 기반 구조로 기능 분리와 재사용이 쉽습니다.
- 선언적 UI 패턴으로 DOM 직접 조작을 줄여 로직에 집중할 수 있습니다.
- 생태계가 커서 레퍼런스, 서드파티 라이브러리, 문제 해결 사례가 풍부합니다.

#### Vite 7

빠른 개발 서버 구동과 HMR 성능을 제공하는 빌드 도구입니다.

- 의존성 사전 번들링(Esbuild 기반)으로 초기 구동 속도가 빠릅니다.
- Native ESM 기반으로 변경된 모듈 중심으로 갱신되어 개발 피드백 루프가 짧습니다.
- 프로젝트 규모가 커져도 개발 중 체감 성능 저하를 최소화할 수 있습니다.
- 결과적으로 DX(개발 경험) 개선 효과가 커서 채택했습니다.

#### TypeScript 5

정적 타입 검사를 통해 런타임 오류를 사전에 줄이기 위해 사용합니다.

- 타입 불일치를 컴파일 단계에서 발견할 수 있습니다.
- API 응답/폼 데이터/도메인 모델을 명시적으로 관리할 수 있습니다.
- 협업 시 코드 의도를 명확히 전달해 유지보수 비용을 줄일 수 있습니다.

#### pnpm

패키지 매니저는 `pnpm` 을 선택했습니다.

- npm, yarn에서는 유령 의존성 문제, 과도한 디스크 점유, 패키지 설치 속도 저하 이슈를 경험할 수 있습니다.
- Yarn Berry는 zero-install 전략의 장점이 있지만, Git에 모든 디펜던시가 업로드되고 IDE 관련 추가 설정 오버헤드가 있습니다.
- pnpm은 전역 저장소 기반으로 디스크 공간 효율이 높고, 심볼릭 링크 기반 구조로 유령 의존성 문제를 줄일 수 있습니다.
- 결과적으로 설치 성능, 저장소 관리 효율, 의존성 안정성 측면에서 pnpm이 프로젝트에 더 적합했습니다.

### 2) 스타일링과 UI 시스템

#### Tailwind CSS 4

유틸리티 퍼스트 방식의 스타일링 도구입니다.

- 제로 런타임 CSS로 런타임 오버헤드가 작습니다.
- 클래스 네이밍 비용을 줄여 개발 속도를 높입니다.
- 팀원 공통 사용 경험이 있어 온보딩 비용이 낮았습니다.

#### shadcn/ui + Radix UI

접근성과 일관성을 확보하기 위한 컴포넌트 기반 UI 구성입니다.

- Radix UI 기반으로 접근성 요구사항 대응이 용이합니다.
- shadcn/ui 패턴을 통해 공통 UI를 빠르게 확장할 수 있습니다.
- Tailwind CSS 와 결합이 자연스러워 디자인 시스템 일관성 유지에 유리합니다.

### 3) 라우팅

#### React Router 7

React 생태계에서 검증된 라우팅 라이브러리입니다.

- 성숙한 문서와 사례가 많아 개발/디버깅 효율이 높습니다.
- 다양한 라이브러리와 호환성이 좋습니다.
- 팀의 기존 경험을 활용해 단기간 내 안정적으로 적용할 수 있었습니다.

#### 대안 검토: TanStack Router

- 타입 안전성 측면의 장점은 분명했습니다.
- 다만 팀 경험 부족과 짧은 개발 기간(5주) 내 학습 비용을 고려해 이번 프로젝트에서는 React Router를 선택했습니다.

### 4) 데이터 패칭 및 상태 관리

#### TanStack Query 5 (서버 상태)

비동기 통신과 서버 상태 동기화를 담당합니다.

- 캐싱, 재요청, stale 관리 등 서버 상태 관리 기능이 내장되어 있습니다.
- 불필요한 네트워크 요청을 줄이고 UI-서버 상태 불일치를 완화합니다.
- 선언적 데이터 패칭 패턴으로 코드 일관성과 가독성을 높입니다.

### 5) 폼 상태 관리

#### React Hook Form

폼 입력, 검증, 제출 상태를 효율적으로 관리합니다.

- 비제어 컴포넌트 기반으로 성능 부담을 줄일 수 있습니다.
- 필요 시 제어 컴포넌트 패턴도 함께 사용할 수 있습니다.
- 복잡한 폼 로직을 표준화해 구현 비용과 실수 가능성을 낮춥니다.

### 6) 테스트 전략

#### MSW

현재 프로젝트에서는 실제 테스트 코드 운영까지는 진행하지 못했습니다.

다만, API 의존성을 줄이고 개발/검증 환경의 재현성을 확보하기 위해 `MSW` 를 도입했습니다.

- 백엔드 준비 상태와 무관하게 프론트엔드 화면 개발이 가능합니다.
- 성공/실패/예외 응답을 시뮬레이션해 UI 분기 처리를 검증할 수 있습니다.
- 향후 테스트 체계를 확장할 때(Mock 기반 단위/통합 테스트) 그대로 활용 가능한 기반입니다.

### 7) 컴포넌트 문서화

#### Storybook (+ Chromatic)

공통 컴포넌트 문서화와 시각적 검증을 위해 사용합니다.

- 컴포넌트를 독립적으로 개발/검증할 수 있습니다.
- 팀원 간 UI 계약(Props, 상태, 동작)을 명확히 공유할 수 있습니다.
- 시각적 변경 추적을 통해 회귀를 빠르게 확인할 수 있습니다.

### 8) 코드 품질 관리

#### ESLint + Prettier + Husky + lint-staged + Commitlint

코드 품질과 협업 규칙을 자동으로 강제합니다.

- ESLint/Prettier로 코드 스타일과 잠재 이슈를 사전에 검출합니다.
- lint-staged + Husky로 커밋 전 자동 검사를 수행합니다.
- Commitlint로 커밋 메시지 규칙을 통일해 이력 가독성을 높입니다.

### 9) 보조 라이브러리(운영 품질 강화)

#### react-error-boundary

에러 격리를 통해 일부 화면 오류가 전체 장애로 확산되는 것을 완화합니다.

#### sonner

일관된 토스트 UI로 사용자 피드백 전달 품질을 높입니다.

#### lucide-react

아이콘 체계를 통일해 UI 일관성과 유지보수성을 높입니다.

---

## 프로젝트 구조 (실제 코드 기준)

아래 구조는 현재 `frontend/src` 의 실제 디렉토리를 기준으로 정리했습니다.

```text
src
├─ components
│  ├─ admin
│  ├─ ai-chat
│  ├─ auth
│  ├─ daily-report
│  ├─ dashboard
│  ├─ ingredient
│  ├─ menu
│  ├─ onboarding
│  ├─ sales
│  ├─ setting
│  ├─ shared
│  └─ weather
├─ pages
│  ├─ admin-page
│  ├─ daily-report-page
│  ├─ dashboard-edit-page
│  ├─ dashboard-page
│  ├─ ingredient-consumption-rank-page
│  ├─ ingredient-page
│  ├─ main-page
│  ├─ menu-page
│  ├─ menu-sales-rank-page
│  ├─ onboarding
│  ├─ privacy-page
│  ├─ root-error-fallback
│  ├─ sales-page
│  ├─ setting-page
│  ├─ sign-in-page
│  ├─ terms-page
│  └─ weather-page
├─ hooks
│  ├─ admin
│  ├─ ai-chat
│  ├─ daily-report
│  ├─ dashboard
│  ├─ ingredient
│  ├─ menu
│  ├─ onboarding
│  ├─ sales
│  ├─ setting
│  └─ shared
├─ utils
│  ├─ ai-chat
│  ├─ dashboard
│  ├─ ingredient
│  ├─ menu
│  ├─ onboarding
│  ├─ sales
│  ├─ shared
│  └─ weather
├─ services
│  ├─ analysis
│  ├─ auth
│  ├─ daily-report
│  ├─ dashboard
│  ├─ ingredient
│  ├─ menu
│  ├─ onboarding
│  ├─ sales
│  ├─ setting
│  ├─ shared
│  └─ sse
├─ types
│  ├─ admin
│  ├─ ai-chat
│  ├─ analysis
│  ├─ auth
│  ├─ daily-report
│  ├─ dashboard
│  ├─ ingredient
│  ├─ menu
│  ├─ onboarding
│  ├─ sales
│  ├─ setting
│  ├─ shared
│  └─ weather
├─ constants
│  ├─ admin
│  ├─ ai-chat
│  ├─ auth
│  ├─ daily-report
│  ├─ dashboard
│  ├─ ingredient
│  ├─ menu
│  ├─ onboarding
│  ├─ sales
│  ├─ shared
│  └─ weather
├─ routes
├─ mocks
│  ├─ analysis
│  ├─ auth
│  ├─ daily-report
│  ├─ data
│  ├─ ingredient
│  ├─ onboarding
│  ├─ precipitation
│  ├─ setting
│  ├─ shared
│  └─ weather
├─ App.tsx
├─ main.tsx
└─ index.css
```

---

## 레이어/도메인 설계 규칙 (위키 기준)

### 기본 원칙

1. 도메인 단위 구성: `pages`, `hooks`, `utils`, `types`, `constants` 등은 기본적으로 도메인(페이지) 단위로 나누어 관리합니다.
2. 공통 요소(`shared`) 분리: 도메인과 무관한 재사용 요소는 각 레이어 하위 `shared` 폴더에서 관리합니다.
3. 도메인 깊이: 도메인 하위 디렉토리는 최대 1 depth 까지 허용합니다.
4. 높은 응집도 관리: 드롭다운, 모달처럼 관심사가 높은 컴포넌트 묶음은 하나의 폴더로 관리합니다.
5. 배럴 파일 사용: 폴더 외부 참조 시 `index.ts` 배럴 파일을 기본으로 사용합니다.

### 서비스 레이어 규칙

- API 요청 로직은 서비스 도메인별로 분리합니다.
- 파일명으로 메서드를 분리합니다.
  - `get.ts`
  - `post.ts`
  - `put.ts`
  - `delete.ts`
  - `keys.ts`
  - `options.ts`

## 환경 변수

`.env.template` 기준 필수 키:

- `VITE_API_URL`: 백엔드 API 기본 URL
- `VITE_CDN_HOST`: CDN 호스트 URL

---

## 참고 문서

- FE 기술 스택 위키: <https://github.com/softeerbootcamp-7th/WEB-Team3-CheckMate/wiki/%5BFE%5D-%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D>
- FE 프로젝트 구조 위키: <https://github.com/softeerbootcamp-7th/WEB-Team3-CheckMate/wiki/%5BFE%5D-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0>
- 팀 공통 가이드: `../AGENTS.md`
