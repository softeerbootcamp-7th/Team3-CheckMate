# AGENTS Guide

This document defines the common operating rules for coding agents in Team3-CheckMate.

## 1) Core Principles

- Provide specific and objective feedback about the code itself.
- Do not include praise, generic summaries, or speculation about intent.
- All review comments and agent responses MUST be written in Korean (ko-KR), without exception.
- When bold text is followed by Korean particles/words, keep a space after `**`.
- Correct examples: `**interface** 를`, `**type** 보다는`
- Incorrect examples: `**interface**를`, `**type**보다는`

## 2) Frontend Guidelines (`/frontend`)

### 2.1 Tech Stack and Base Rules

- Framework: React (functional components only)
- Design system: Tailwind CSS, shadcn/ui
- shadcn/ui import path: `@/components/shared/shadcn-ui`
- Prefer `interface` over `type` for object/props structures
- Always use `import type` for type imports

### 2.2 Source Structure (`src`)

- Base layers: `components`, `pages`, `hooks`, `utils`, `services`, `types`, `constants`, `stores`, `routes`
- Organize by domain and keep subdirectory depth to 1 where possible
- Use `index.ts` barrel exports in each folder

### 2.3 Naming Conventions

- Folders: `kebab-case`
- `.tsx` files: `PascalCase`
- Other files (`.ts`, hooks, utils): `camelCase`
- Components: `PascalCase`
- Hooks: `camelCase` with `use` prefix
- Constants: `UPPER_SNAKE_CASE`

### 2.4 Component and Code Rules

- Use **Arrow Function** for general component declarations
- Function declarations are allowed only inside internal shadcn/ui component files
- Define props with `interface`
- Import rules:
- Same domain: use relative paths
- Different domains: use absolute paths up to domain level (e.g. `@/services/auth`)
- shadcn/ui: import via `@/components/shared/shadcn-ui`

### 2.5 Service Domains

- `auth`, `onboarding`, `dashboard`, `sales`, `menu`, `weather`, `daily-report`, `setting`, `ingredient`, `ai-chat`

### 2.6 Frontend Review Focus

- Review from a senior frontend perspective with priority on performance degradation risks and potential runtime errors.
- Prioritize findings that can cause unnecessary re-renders, expensive computations in render paths, unstable keys, missing memoization boundaries, and avoidable network/request overhead.
- Prioritize findings that can trigger runtime failures, including null/undefined access, unsafe type narrowing, unhandled async errors, and missing loading/error guards.

## 3) Backend Guidelines (`/backend`)

- Framework: Java Spring
- Review focus:
- Spring Boot best practices
- Proper exception handling and structured logging
- Consistent API response schema and HTTP status usage

## 4) Review Comment Examples

- Recommended:
- "해당 컴포넌트의 props 는 **interface** 를 사용하여 정의해야 합니다."
- "컴포넌트 선언 시 **Arrow Function** 을 사용해 주세요. (shadcn/ui 내부는 예외)"
- "shadcn/ui 컴포넌트는 `@/components/shared/shadcn-ui` 경로를 통해 import 해야 합니다."
- Avoid:
- "전반적으로 코드가 깔끔합니다."
- "전체 성능이 좋아질 것 같습니다."
