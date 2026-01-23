# Copilot Code Review Guidelines

This document defines the principles and rules that Copilot must follow for efficient and consistent code reviews, categorized by technology stack.

## 1. Core Review Principles (Common)

- **Provide Objective Insights**: Exclude summaries, general feedback, simple descriptions of changes, or praise.
- **Maintain Specificity**: Provide only specific and objective analysis results of the code itself, avoiding broad comments on system impact.
- **Language Setting**: **All review comments and responses from Copilot must be written in Korean (ko-KR) without exception.** (Copilot 의 모든 리뷰 코멘트와 응답은 예외 없이 **한국어 (ko-KR)** 로 작성되어야 합니다.)

## 2. Frontend Guidelines (/front-end)

### 2.1 Technology Stack & Base Rules

- **Framework**: React (Functional Components only).
- **Design System**: Tailwind CSS, Shadcn UI.
- **Type Definition**: Use **interface** to define props and other data structures. Prefer **interface** over **type** for object definitions.

### 2.2 Directory Structure (src)

| Folder/File | Definition & Description |
| --- | --- |
| `components` | Folder for managing components |
| `pages` | Defines each page; managed as one directory per page |
| `hooks` | Folder for managing custom hooks |
| `utils` | General utility functions (non-hook) |
| `services` | Logic related to API requests |
| `types` | Definitions for various types |
| `constants` | Constant definitions |
| `stores` | Global state management definitions |
| `routes` | Route definitions (managed flatly) |
| `main.tsx` | Application entry point |

### 2.3 Naming Conventions

- **Folders**: `kebab-case` (e.g., `user-profile`)
- **.tsx Files**: `PascalCase` (e.g., `UserProfile.tsx`)
- **Other Files**: `camelCase` (e.g., `apiClient.ts`, `useAuth.ts`)
- **Components**: `PascalCase`
- **Hooks**: `camelCase` with `use` prefix (e.g., `useLoading`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)

### 2.4 Code Conventions (Good vs. Bad)

### A. Component Declaration

Prefer **Arrow Functions** for functional components.

- **Good**: `const MyComponent = () => { ... };`
- **Bad**: `function MyComponent() { ... }`

### B. Interface for Props

Always define props using an **interface**. Prefer **interface** over **type** for defining object shapes.

- **Good**:
    
    ```
    interface UserCardProps {
      name: string;
      age: number;
    }
    const UserCard = ({ name, age }: UserCardProps) => <div>{name}</div>;
    
    ```
    
- **Bad**:
    
    ```
    type UserCardProps = { name: string; age: number; }; // Use interface instead
    const UserCard = ({ name }) => <div>{name}</div>; // Missing type definition
    
    ```
    

### C. Import Rules

- **Same Domain**: Use **Relative Paths**.
- **Different Domains**: Use **Absolute Paths** up to the domain name.
- **Good (Different Domain)**: `import { Button } from '@/components/shared';`
- **Bad**: `import { Button } from '../../../components/shared/Button';`

### D. Type Imports

Always use the `type` keyword when importing types or interfaces.

- **Good**: `import type { UserInfo } from '@/types/auth';`
- **Bad**: `import { UserInfo } from '@/types/auth';`

### E. Barrel Files

Use `index.ts` in every folder to maintain clean exports.

- **Good**: `import { useAuth } from '@/hooks/auth';`
- **Bad**: `import { useAuth } from '@/hooks/auth/useAuth.ts';`

### 2.5 Service Domain Definitions

- `auth`, `onboarding`, `dashboard`, `sales`, `menu`, `weather`, `daily-report`, `setting`, `ingredient`, `ai-chat`.

## 3. Backend Guidelines (/backend)

### 3.1 Technology Stack

- **Framework**: Java Spring-based.

### 3.2 Review Focus

- Ensure adherence to Spring Boot best practices.
- Check for proper exception handling and logging.
- Validate API response structures and status codes.

## 4. Review Comment Examples

- **Incorrect**: "The code structure looks clean. I think the overall performance will improve."
- **Correct**: "해당 컴포넌트의 props 는 **interface** 를 사용하여 정의해야 합니다. 또한 객체 타입 정의 시 **type** 보다는 **interface** 사용을 권장합니다."