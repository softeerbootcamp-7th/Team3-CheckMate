- [Tanstack Query란?](#tanstack-query란)

- [Query](#query)
  + [Query(쿼리)란?](#query쿼리란)
  + [**Query의 상태**](#query의-상태)
  + [Query Lifecycle](#query-lifecycle)
  + [useQuery 훅](#usequery-훅)
  + [select 옵션](#select-옵션)

- [Query Key](#query-key)
  + [**Query Key(쿼리 키)란?**](#query-key쿼리-키란)
  + [Query Key의 특징](#query-key의-특징)
  + [Query Keys 설계 전략](#query-keys-설계-전략)
  + [QueryFilter / MutationFilter](#queryfilter--mutationfilter)

- [Query Client](#query-client)
  + [Query Client란?](#query-client란)
  + [Query Client의 주요 메서드](#query-client의-주요-메서드)

- [Mutation](#mutation)
  + [Mutation(뮤테이션)이란?](#mutation뮤테이션이란)
  + [**Mutation의 4가지 상태**](#mutation의-4가지-상태)
  + [**Lifecylce 콜백 (Side Effects)**](#lifecylce-콜백-side-effects)
  + [useMutation 훅](#usemutation-훅)
  + [Mutation 상태 공유 **useMutationState**](#mutation-상태-공유-usemutationstate)
  + [Scope(스코프) 관리](#scope스코프-관리)
  + [mutationOptions](#mutationoptions)
  + [MutationFilter](#mutationfilter)

- [Query Invalidation](#query-invalidation)
  + [**Query Invalidation (쿼리 무효화)란?**](#query-invalidation-쿼리-무효화란)
  + [**Invalidation 동작 과정**](#invalidation-동작-과정)
  + [유연한 쿼리 매칭 (Targeting)](#유연한-쿼리-매칭-targeting)
  + [Optimistic Updates (**낙관적 업데이트)**](#optimistic-updates-낙관적-업데이트)

- [Cache 내부 동작](#cache-내부-동작)
  + [**Query Key 기반의 캐시 식별**](#query-key-기반의-캐시-식별)
  + [데이터 신선도 관리: staleTime과 gcTime](#데이터-신선도-관리-staletime과-gctime)
  + [**내부 상태 모니터링: status와 fetchStatus**](#내부-상태-모니터링-status와-fetchstatus)
  + [성능 최적화: Structural Sharing과 Tracked Properties](#성능-최적화-structural-sharing과-tracked-properties)
  + [**수동 캐시 제어 및 업데이트**](#수동-캐시-제어-및-업데이트)

- [고급 기능](#고급-기능)
  + [Infinity Query](#infinity-query)
  + [Dependent Query](#dependent-query)
  + [Error Boundary & Suspense](#error-boundary--suspense)
  + [Persistence](#persistence)
  + [Server Side Events](#server-side-events)

- [기타](#기타)
  * [**개발자 도구 (DevTools)**](#개발자-도구-devtools)
  * [라이브러리 비교 (2026.01 기준)](#라이브러리-비교-202601-기준)
  * [Typescript 활용](#typescript-활용)
    + [useEffect 데이터 통신에서의 Race Condition](#useeffect-데이터-통신에서의-race-condition)

- [참고자료](#참고자료)


# Tanstack Query란?

- **정의**
    - **서버 상태(Server State)**를 관리하는 라이브러리
- **주요 이점**
    - 비동기 데이터 로직을 단순화: 데이터 패칭(fetching), 캐싱(caching), 동기화(Synchronizing) 및 업데이트
        
        클라이언트 상태 관리 라이브러리(Redux, Recoil 등)는 비동기 데이터를 다루기 복잡함 (보일러 플레이트, 코드의 반복적 사용, …)
        
    - 생산성 향상: `isLoading`, `isError`, `data` 등의 상태를 직접 `useState`와 `useEffect`로 구현할 필요가 없습니다.
    - 사용자 경험(UX) 개선: 캐싱을 통해 네트워크 요청을 최적화하고, 최신 데이터를 백그라운드에서 조용히 업데이트합니다.
- 기본 사용법
    
    ```jsx
    import {
      useQuery,
      useMutation,
      useQueryClient,
      QueryClient,
      QueryClientProvider,
    } from '@tanstack/react-query'
    import { getTodos, postTodo } from '../my-api'
    
    // 1. 클라이언트 인스턴스 생성
    const queryClient = new QueryClient()
    
    function App() {
      return (
        // 2. Provider로 앱 감싸기
        <QueryClientProvider client={queryClient}>
          <Todos />
        </QueryClientProvider>
      )
    }
    
    function Todos() {
      const queryClient = useQueryClient()
    
      // 조회 (Queries)
      const { data, isLoading } = useQuery({ 
        queryKey: ['todos'], 
        queryFn: getTodos 
      })
    
      // 변경 (Mutations)
      const mutation = useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
          // 데이터 변경 후 'todos' 키를 가진 캐시를 invalidate -> refetch
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
      })
    
      if (isLoading) return <div>로딩 중...</div>
    
      return (
        <div>
          <ul>
            {data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}
          </ul>
          <button onClick={() => mutation.mutate({ title: '새 할 일' })}>추가</button>
        </div>
      )
    }
    ```
    

---

# Query

### Query(쿼리)란?

서버 데이터를 조회하고, 고유한 키(Unique Key)에 연결된 비동기 데이터 소스에 대한 선언적 의존성을 가집니다.

쉽게 말해, "어떤 데이터를 어디서 가져올지(비동기 함수)"와 "그 데이터를 식별할 이름(키)"을 정의해두면, TanStack Query가 알아서 가져오고 관리해줍니다.

### **Query의 상태**

쿼리는 실행 중에 항상 다음 세 가지 상태 중 하나를 가집니다:

- `isPending` (또는 ****`status === 'pending'`): 아직 데이터가 없는 상태입니다.
- `isError` (또는 ****`status === 'error'`): 데이터를 가져오는 중 에러가 발생한 상태입니다.
- `isSuccess` ****(또는 ****`status === 'success'`): 성공적으로 데이터를 가져와서 사용할 수 있는 상태입니다.
- 또한, 데이터 유무와 상관없이 현재 통신 중인지를 나타내는 **isFetching** 속성도 제공하여 배경에서 데이터가 업데이트되는 상황도 쉽게 파악할 수 있습니다.

**상태 체크의 순서**: 보통 컴포넌트 내에서는 `isPending`을 먼저 체크하고, 그 다음 `isError`를 체크한 뒤 마지막에 데이터가 성공적으로 존재한다고 가정하고 렌더링하는 패턴이 가장 일반적입니다.

### Query Lifecycle

`Fetching` → `Fresh` → `Stale` → `Inactive` → `Deleted`로 이어지는 상태 변화

### `useQuery` 훅

기본적으로 `useQuery` 훅을 사용하여 구현하며, 다음 두 가지가 필수적으로 필요합니다:

- **Unique Key**: 쿼리를 식별할 고유한 키입니다.
- **Query Function**: 데이터를 가져오고 Promise를 반환하는 함수입니다
- 예시 코드
    
    ```jsx
    import { useQuery } from '@tanstack/react-query'
    
    function TodoList() {
      // queryKey는 캐싱을 위한 고유 식별자, queryFn은 Promise를 반환하는 함수입니다
      const { data, isPending, isError, error } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
          const response = await fetch('/api/todos')
          if (!response.ok) {
    	      // fetch 사용 시 수동 에러 처리 필요
    				throw new Error('Network response was not ok') 
    			}
          return response.json()
        },
      })
    
      if (isPending) return <span>로딩 중...</span> [6]
      if (isError) return <span>에러 발생: {error.message}</span> [6]
    
      return (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )
    }
    ```
    

### select 옵션

서버에서 받아온 전체 데이터 중 특정 필드만 필요하거나 가공이 필요할 때 컴포넌트 내부가 아닌 `useQuery`의 `select` 옵션을 사용한다. 

불필요한 연산을 줄이고 데이터가 실질적으로 변경되었을 때만 리렌더링을 유발하여 성능을 최적화한다. e.g. `(data) ⇒ data.length`

- **상태 가시성**: `select` 함수는 쿼리가 성공적으로 완료되어 데이터가 캐시에 저장된 후에 실행됩니다
- **실행 조건**: `select` 함수는 데이터가 변경되거나 함수 자체의 참조가 변경될 때만 다시 실행됩니다. 따라서 렌더링마다 함수 참조가 바뀌는 것을 방지하려면 `useCallback`으로 감싸주거나, 외부 함수 참조로 사용하는 것이 좋습니다.
- 예시 코드 (select를 사용하지 않은 경우)
    
    ```jsx
    import { useQuery } from '@tanstack/react-query';
    
    const UserList = () => {
      // 1. 서버의 모든 데이터를 그대로 받아옴
      const { data } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers, // 전체 배열 반환
      });
    
      // 2. 컴포넌트 내부에서 데이터 가공 (렌더링 될 때마다 실행됨)
      // 부모 컴포넌트가 리렌더링되거나 다른 state가 변하면 이 연산도 다시 수행됨
      const userNames = data?.map((user) => user.name) || [];
    
      return (
        <ul>
          {userNames.map((name) => <li key={name}>{name}</li>)}
        </ul>
      );
    };
    ```
    
- 예시 코드 (select를 사용한 경우)
    - select 함수의 결과를 메모이제이션하여 저장해둔다.
    
    ```jsx
    import { useQuery } from '@tanstack/react-query';
    import { useCallback } from 'react';
    
    const UserList = () => {
      const { data: userNames } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        // 3. select 옵션 사용: 여기서 데이터 구조를 변경
        // data는 이제 전체 객체 배열이 아니라, string[] 타입이 됩니다.
        select: (data) => {
          // 복잡한 연산이나 필터링이 여기에 들어갈 수 있음
          return data.map((user) => user.name.toUpperCase());
        },
      });
    
      // 컴포넌트는 이미 가공된 userNames만 받습니다.
      // 원본 데이터가 바뀌지 않는 한, select 함수는 재실행되지 않으며
      // userNames 배열의 참조값도 유지되어 불필요한 리렌더링을 방지합니다.
    
      return (
        <ul>
          {userNames?.map((name) => <li key={name}>{name}</li>)}
        </ul>
      );
    };
    ```
    

---

# Query Key

### **Query Key(쿼리 키)란?**

이 키를 바탕으로 **캐싱, 리페칭(Refetching), 그리고 애플리케이션 전체에서의 쿼리 공유**를 관리합니다.

전용 Devtools에서 현재 캐시에 어떤 키로 어떤 데이터가 들어있는지, 쿼리의 상태가 어떻게 변하는지 시각적으로 확인할 수 있습니다.

### Query Key의 특징

- **항상 배열 형태여야 함**: 최상위 수준에서는 반드시 배열이어야 합니다. 단순한 문자열 하나만 넣어도 내부적으로는 배열로 처리됩니다.
- **직렬화 가능(Serializable)**: 키는 `JSON.stringify`로 직렬화될 수 있는 것이라면 무엇이든(문자열, 숫자, 중첩된 객체 등) 포함할 수 있습니다.
- **결정론적 해싱(Deterministic Hashing)**: **객체** 내부의 키 순서가 달라도 내용이 같다면 동일한 쿼리 키로 간주합니다. 하지만 **배열 내 요소의 순서는 매우 중요**합니다. 배열 순서가 다르면 서로 다른 키로 인식됩니다.
- **의존성 관리**: 쿼리 함수가 특정 변수(예: ID, 페이지 번호)에 의존한다면, 해당 변수는 **반드시 쿼리 키에 포함**되어야 합니다.
    - **자동 리페칭**: 키에 포함된 변수가 변경되면 TanStack Query는 데이터가 바뀌었다고 판단하여 자동으로 데이터를 다시 가져옵니다.
    - **독립적 캐싱**: 변수별로 데이터를 별도의 캐시 항목으로 관리할 수 있게 해줍니다.

### Query Keys 설계 전략

1. `queryOptions` 헬퍼 사용
    - `queryKey`와 `queryFn`을 한곳에 함께 배치(Co-location)할 수 있습니다
    - 타입스크립트 환경에서 강력한 타입 추론과 안정성을 제공합니다.
    - 한 곳에서 정의하여 여러 컴포넌트나 메서드(예: prefetchQuery)에서 공유할 때 사용합니다.
    - 예시 코드
        
        ```jsx
        import { queryOptions, useQuery } from '@tanstack/react-query'
        
        // 1. 쿼리 옵션을 별도의 함수나 상수로 정의합니다 
        const todoOptions = (id) => queryOptions({
          queryKey: ['todos', id],
          queryFn: () => fetch(`/api/todos/${id}`).then(res => res.json()),
          staleTime: 5 * 1000, // 5초 동안은 데이터를 '신선함'으로 간주 
        })
        
        // 2. 정의된 옵션을 useQuery에 그대로 전달합니다
        function TodoDetail({ id }) {
          const { data } = useQuery(todoOptions(id))
          return <div>{data?.title}</div>
        }
        
        // 3. 또는 정의된 옵션을 prefetch 함수에 전달할 수 있습니다
        queryClient.prefetchQuery(groupOptions())
        ```
        
2. 계층 구조 활용
    
    e.g.
    
    - 전체 목록: `['todos']`
    - 필터링된 목록: `['todos', { status: 'done' }]`
    - 상세 항목: `['todos', id]`
3. 타입 안정성 확보
    - `QueryKey` 타입을 전역적으로 등록하여 키 구조 일관성 유지
4. **Query Key Factory** 패턴 (중앙 집중식 관리)
    - **중앙 집중식 관리**: 모든 쿼리 키 정의를 특정 파일(예: `queryKeys.ts`)에 모아둠으로써 오타로 인한 버그를 방지하고 키의 구조를 한눈에 파악할 수 있게 합니다.
    - **계층 구조 설계**: 서비스의 도메인(예: `todos`, `users`)에 따라 계층적으로 키를 생성하는 팩토리를 구성합니다.
    - **유연한 키 생성**: 아이디나 필터 조건과 같은 **변수를 인자로 받아 동적으로 배열 키를 생성**하는 함수를 포함합니다.
    - 최신 버전에서는 `queryOptions` 헬퍼를 사용해 쿼리 키와 쿼리 함수를 한곳에 묶어(Co-location) 정의함으로써, 팩토리 패턴의 이점을 누리면서 동시에 강력한 **타입 안전성**까지 확보할 수 있습니다.
5. **Effective React Query Keys** 패턴
    
    TkDodo가 제안한 것으로, 쿼리 키를 **가장 일반적인 것에서 가장 구체적인 것 순서로** 배열하는 계층적 설계 철학입니다.
    
    - **배열 기반 계층 구조**: 키를 `['리소스', '유형', '파라미터']` 순으로 구성합니다. 예를 들어, `['todos', 'list', { filter: 'all' }]`와 같은 식입니다.
    - **부분 매칭(Partial Matching) 극대화**: 계층적으로 설계된 키는 `invalidateQueries`나 `removeQueries` 호출 시 매우 강력합니다.
    - `queryClient.invalidateQueries({ queryKey: ['todos'] })`를 호출하면 `todos`로 시작하는 **모든 하위 쿼리가 한꺼번에 무효화**됩니다.
    - 특정 필터가 적용된 리스트만 타겟팅하려면 `queryKey: ['todos', 'list']` 식으로 더 구체적인 접두사를 사용할 수 있습니다.
    - **결정론적 해싱 활용**: 키 내부의 객체는 속성 순서가 달라도 동일하게 간주되지만, **배열 요소의 순서는 매우 중요**하므로 이를 고려하여 일관된 순서로 키를 배치합니다.
    - **의존성 명시**: 쿼리 함수가 의존하는 모든 변수를 키에 포함시켜, **변수 변경 시 자동으로 리페칭**이 일어나도록 설계합니다
- 예시 코드
    
    ```jsx
    // 쿼리 키만 관리하는 팩토리 예시
    export const todoKeys = {
      all: ['todos'] as const,
      lists: () => [...todoKeys.all, 'list'] as const,
      list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
      details: () => [...todoKeys.all, 'detail'] as const,
      detail: (id: number) => [...todoKeys.details(), id] as const,
    }
    ```
    
    ```jsx
    // queryOptions 활용
    import { queryOptions } from '@tanstack/react-query'
    
    // API 호출 함수 (queryFn)
    const fetchTodos = () => fetch('/api/todos').then(res => res.json())
    const fetchTodoById = (id: number) => fetch(`/api/todos/${id}`).then(res => res.json())
    
    // Query Options Factory
    export const todoQueries = {
      all: () => queryOptions({
        queryKey: todoKeys.all,
        queryFn: fetchTodos,
      }),
      list: (filters: string) => queryOptions({
        queryKey: todoKeys.list(filters),
        queryFn: () => fetchTodos(), // 실제로는 필터가 적용된 API 호출
        staleTime: 5000,
      }),
      detail: (id: number) => queryOptions({
        queryKey: todoKeys.detail(id),
        queryFn: () => fetchTodoById(id),
      }),
    }
    ```
    
    ```jsx
    // 사용
    // 조회
    const { data } = useQuery(todoQueries.detail(123))
    
    // 모든 todo 관련 캐시를 무효화하고 다시 가져옴
    queryClient.invalidateQueries({ queryKey: todoKeys.all })
    
    // 모든 todo 리스트 형태의 캐시만 무효화
    queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
    ```
    

### QueryFilter / MutationFilter

필터를 활용해서 `invalidateQueries`, `removeQueries`, `isMutating` 등의 메서드를 사용할 때 캐시 내의 특정 데이터를 지능적으로 조작할 수 있습니다.

**1. `exact` (정확한 매칭)**

기본적으로 TanStack Query의 쿼리 키 매칭은 **포괄적(Inclusive)**입니다. e.g. `['todos']`라는 키로 검색하면 `['todos', 1]`이나 `['todos', { page: 1 }]`처럼 해당 키로 시작하는 모든 하위 쿼리가 포함됩니다.

- **기능**: `exact: true` 옵션을 전달하면, 제공한 쿼리 키(또는 뮤테이션 키)와 **완벽하게 일치하는 항목만** 반환하거나 작업(무효화, 제거 등)을 수행합니다.
- **활용 예시**:

◦ `queryClient.invalidateQueries({ queryKey: ['todos'], exact: true })` 호출 시, `['todos']` 키를 가진 쿼리는 무효화되지만 `['todos', { type: 'done' }]`와 같은 하위 키를 가진 쿼리는 영향을 받지 않습니다.

**2. `predicate` (조건부 필터링)**

`predicate`는 단순한 키 매칭을 넘어 **더 정밀한 필터링**이 필요할 때 사용하는 함수입니다.

- **기능**: 모든 매칭되는 쿼리 또는 뮤테이션에 대해 실행되는 **최종 필터 함수**입니다. 이 함수가 `true`를 반환하는 항목만 결과에 포함됩니다.
- **작동 방식**: 다른 필터 조건이 지정되지 않았다면 캐시에 있는 모든 쿼리/뮤테이션을 대상으로 평가하며, 다른 필터가 있다면 그 결과를 다시 한번 거르는 역할을 합니다.
- **활용 예시 (쿼리)**:
    - 쿼리 키의 특정 인덱스 값을 검사하거나 버전 정보 등을 확인할 때 유용합니다.
    - `predicate: (query) => query.queryKey === 'todos' && query.queryKey?.version >= 10`.
- **활용 예시 (뮤테이션)**:
    - 특정 변수를 가진 뮤테이션만 찾을 때 사용합니다.
    - `queryClient.isMutating({ predicate: (mutation) => mutation.state.variables?.id === 1 })`.

---

# Query Client

### Query Client란?

애플리케이션의 비동기 상태를 관리하고, 캐시를 유지하며, 서버 데이터와의 동기화를 주도하는 중앙 허브입니다. 모든 캐시 데이터는 이 객체 내부에 저장되며, 우리는 이 클라이언트를 통해 캐시에 직접 접근하거나 명령을 내릴 수 있습니다

- **설정 및 제공**: 애플리케이션 최상단에서 `QueryClient` 인스턴스를 생성하고, `QueryClientProvider`를 통해 전체 컴포넌트 트리에 공급합니다.
- **서버 상태 관리**: 단순한 데이터 페칭을 넘어 캐싱, 중복 요청 제거, 백그라운드 업데이트, 가비지 컬렉션 등 복잡한 서버 상태 관리 문제를 자동으로 처리합니다

### Query Client의 주요 메서드

이 메서드들은 대부분 **Query Key를 필터로 사용**하며, 접두사 매칭이나 정확한 매칭(`exact: true`), 혹은 함수(`predicate`)를 통한 정교한 타겟팅이 가능합니다.

단순히 값을 반환할 뿐 리액트의 상태 시스템과는 독립적입니다. 따라서 이 값이 변한다고 해서 컴포넌트가 다시 그려지지는 않습니다. 주로 컴포넌트 외부의 일반 함수나 특정 로직 안에서 현재 진행 중인 뮤테이션이 있는지 체크할 때 사용합니다

- 데이터 갱신 및 무효화 관련
    - **invalidateQueries**: 특정 키를 가진 쿼리를 즉시 '오래된(stale)' 상태로 마킹하고, 해당 쿼리가 현재 화면에 사용 중이라면 백그라운드 리페칭을 실행합니다.
    - **refetchQueries**: 조건에 맞는 쿼리들을 즉시 다시 불러오도록 강제합니다.
    - **resetQueries**: 쿼리를 초기 상태로 되돌리고 다시 불러옵니다.
    - **prefetchQuery:** 사용자가 특정 데이터를 필요로 하기 **직전**에 미리 **캐시를 채워**두어, 실제 화면이 렌더링될 때 로딩 지연 없이 즉시 데이터를 보여주기 위해 사용합니다.
        - **동작 방식**: 기본적으로 설정된 `staleTime`을 기준으로 캐시된 데이터가 신선한지 확인하며, 데이터가 없거나 오래된 경우에만 새로운 페칭을 시작합니다.
        - **특징**:
        - **Promise<void> 반환**: **데이터를 직접 반환하지 않고 캐시를 업데이트**하는 것이 목적이므로 반환값이 없습니다.
        - **에러를 던지지 않음**: 프리페치 중 에러가 발생해도 애플리케이션을 멈추지 않으며, 나중에 실제 데이터를 사용하는 `useQuery` 단계에서 다시 시도하여 처리합니다.
- 캐시 데이터 직접 조작 관련
    - **setQueryData**: 서버 요청 없이 캐시에 저장된 데이터를 **수동으로 직접 업데이트**하거나 추가합니다. 주로 낙관적 업데이트(Optimistic Updates)를 구현할 때 사용합니다.
    - **getQueryData**: 캐시에 저장된 최신 데이터를 동기적으로 가져옵니다.
    - **getQueryState**: 데이터뿐만 아니라 마지막 업데이트 시간(`dataUpdatedAt`) 등 쿼리의 상세 정보를 가져옵니다.
- 실행 제어 및 최적화 관련
    - **fetchQuery**: `prefetchQuery`와 유사하지만, 캐시를 채우는 동시에 **데이터를 반환**하며 에러 발생 시 예외를 던집니다.
    - **ensureQueryData**: 캐시에 데이터가 있으면 반환하고, 없으면 서버에서 가져옵니다. 불필요한 네트워크 요청을 줄이는 데 유용합니다.
    - **cancelQueries**: 현재 진행 중인 특정 쿼리의 요청을 취소합니다. 낙관적 업데이트 시 서버 데이터가 로컬 업데이트를 덮어쓰지 않게 방지할 때 필수적입니다.
    - **removeQueries**: 특정 쿼리를 캐시에서 완전히 제거합니다.
- 상태 모니터링
    - **isFetching / isMutating**: 애플리케이션 내에서 현재 로딩 중인 쿼리나 뮤테이션의 개수를 확인하거나 필터링할 때 사용합니다.

---

# Mutation

### Mutation(뮤테이션)이란?

데이터를 생성(Create), 수정(Update), 삭제(Delete)하거나 서버에 사이드 이펙트를 일으키는 비동기 작업을 처리하는 개념입니다. 데이터를 단순히 조회하는 Query와 달리, 서버의 상태를 변경할 때 사용합니다.

### **Mutation의 4가지 상태**

Mutation은 실행 주기에 따라 다음 중 하나의 상태를 유지합니다.

- `isIdle` (`idle`): 실행 전 초기 상태.
- `isPending` (`pending`): 현재 변이 작업이 진행 중인 상태.
- `isError` (`error`): 작업 중 에러가 발생한 상태 (해당 에러는 `error` 객체에 담김).
- `isSuccess` (`success`): 작업이 성공적으로 완료된 상태 (서버 결과값은 `data` 객체에 담김).

### **Lifecylce 콜백 (Side Effects)**

Mutation의 각 단계에서 특정 로직을 실행할 수 있는 콜백 옵션을 제공합니다.

- `onMutate`: 변이가 시작되기 직전에 실행되며, 낙관적 업데이트(Optimistic Updates)를 위해 현재의 데이터를 스냅샷 찍어두는 용도로 주로 사용됩니다.
- `onSuccess`: 성공 시 실행됩니다. 이때 쿼리 무효화를 실행할 수 있습니다.
- `onError`: 실패 시 실행됩니다.
- `onSettled`: 성공/실패 여부와 상관없이 작업이 끝나면 실행됩니다.

**참고**: `useMutation` 정의 시 선언한 콜백이 먼저 실행되고, 이후 `mutate` 호출 시 전달한 개별 콜백이 실행됩니다.

- 예시 코드
    
    ```jsx
    import { useMutation, useQueryClient } from '@tanstack/react-query'
    
    function AddTodo() {
      const queryClient = useQueryClient()
    
      const mutation = useMutation({
    	  // 서버 상태 변경 함수
        mutationFn: (newTodo) => axios.post('/todos', newTodo), 
        onSuccess: () => {
          // Mutation 성공 시 관련 쿼리 키를 무효화하여 최신 데이터를 다시 가져오게 합니다
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
      })
    
      return (
        <button
          onClick={() => mutation.mutate({ title: '새로운 할 일' }, {
    	      onSuccess: (data) => {
    			    console.log("개별 콜백"); 
    		    }
          },)}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? '추가 중...' : '할 일 추가'}
        </button>
      )
    
    ```
    

### `useMutation` 훅

주로 `useMutation` 훅을 통해 구현하며, 비동기 작업을 수행하고 프로미스를 반환하는 `mutationFn`이 필요합니다.

- **실행 방식**: `useMutation`은 mutate 함수를 반환하며, 이 함수에 **단일 변수나 객체**를 전달하여 실행합니다.
- **mutate vs mutateAsync**:
    - `mutate`: 가장 일반적인 방식으로, 호출 시점에 결과를 직접 기다리지 않습니다.
    - `mutateAsync`: 프로미스를 반환하여 성공 시 결과값을 넘겨주거나 에러 시 throw하므로, 여러 비동기 로직을 조합해야 할 때 유용합니다.
        - 예시 코드
            
            ```jsx
            import { useMutation } from '@tanstack/react-query';
            import axios from 'axios';
            
            function AddTodoAsync() {
              const { mutateAsync } = useMutation({
                mutationFn: (newTodo) => axios.post('/todos', newTodo),
              });
            
              const handleSubmit = async () => {
                try {
                  // await를 사용하여 완료 및 결과 기다림
                  const data = await mutateAsync({ id: 2, text: '운동하기' });
                  console.log('결과 데이터:', data);
                  // 이후 페이지 이동 등 로직 처리 가능
                } catch (error) {
                  console.error(error);
                }
              };
            
              return <button onClick={handleSubmit}>할 일 추가 (mutateAsync)</button>;
            }
            
            ```
            
- **v5 변경 사항**: v4의 `isLoading`은 `isPending`으로, `status === 'loading'`은 `status === 'pending'`으로 명칭이 변경되었습니다.

### Mutation 상태 공유 **`useMutationState`**

v5에서는 **useMutationState** 훅을 사용하여 애플리케이션 전체에서 실행 중인 Mutation의 상태나 변수(variables)를 구독하고 공유할 수 있습니다.

뮤테이션이 발생한 컴포넌트가 아닌 다른 컴포넌트에서 낙관적 업데이트를 표시해야 할 때 매우 유용합니다.

- `mutationKey`를 지정해두면, `useMutationState` 훅을 통해 현재 실행 중인 뮤테이션의 `variables`나 상태를 가져와 UI에 반영할 수 있습니다.
- 동시에 여러 개의 뮤테이션이 실행될 경우 배열 형태로 관리되므로, 병렬적인 낙관적 업데이트 처리도 용이합니다.

### Scope(스코프) 관리

기본적으로 모든 Mutation은 병렬로 실행되지만, `scope.id`를 설정하면 동일한 아이디를 가진 Mutation들을 직렬(Serial)로 순차 실행하게 제어할 수 있습니다. 동일한 `scope.id`를 가진 뮤테이션들은 큐(Queue)에 쌓이게 되며, `isPaused: true` 상태로 대기하다가, 앞이 완료된 후에야 다음 뮤테이션이 시작됩니다.

- **데이터의 순서가 중요한 경우**: 예를 들어, 할 일 목록의 순서를 바꾸는 요청을 빠르게 여러 번 보낼 때, 이전 요청이 끝나기 전에 다음 요청이 서버에 도달하면 최종 결과가 꼬일 수 있습니다.
- **경쟁 상태(Race Condition) 방지**: 동일한 자원에 대해 수정 요청을 보낼 때, 먼저 보낸 요청이 늦게 처리되어 나중에 보낸 요청의 결과를 덮어쓰는 문제를 방지해야 할 때 유용합니다.
- **서버 부하 및 충돌 관리**: 특정 작업이 서버에서 한 번에 하나씩 처리되어야만 하는 비즈니스 로직이 있을 때 사용합니다.
- 예시 코드
    
    ```jsx
    import { useMutation } from '@tanstack/react-query'
    
    const mutation = useMutation({
      mutationFn: addTodo,
      // 동일한 'todo' id를 가진 뮤테이션들은 순차적으로 실행됨
      scope: {
        id: 'todo',
      },
    })
    ```
    

### mutationOptions

`queryOptions`와 마찬가지로 **뮤테이션 로직을 추상화하여 재사용**하고 싶을 때 유용합니다.

```jsx
import { mutationOptions, useMutation } from '@tanstack/react-query'

// 1. 뮤테이션 옵션을 정의합니다 [13]
function addTodoMutationOptions() {
  return mutationOptions({
    mutationKey: ['addTodo'],
    mutationFn: (newTodo) => axios.post('/todos', newTodo),
  })
}

// 2. 컴포넌트에서 스프레드 연산자(...)를 사용해 옵션을 확장하여 사용합니다 [13]
function MyComponent() {
  const { mutate } = useMutation({
    ...addTodoMutationOptions(),
    onSuccess: () => {
      console.log('성공 시 개별 컴포넌트만의 추가 로직 수행 가능')
    }
  })

  return <button onClick={() => mutate({ text: 'Hello' })}>전송</button>
}
```

### MutationFilter

QueryFilter와 유사함

[https://www.notion.so/Tanstack-Query-2fce2a9f374980208cf2f97dff97f12f?source=copy_link#2fce2a9f37498019a1f1eb0ba96dc051](https://www.notion.so/Tanstack-Query-2fce2a9f374980208cf2f97dff97f12f?pvs=21)

---

# Query Invalidation

### **Query Invalidation (쿼리 무효화)란?**

캐시된 데이터가 더 이상 최신 상태가 아님을 TanStack Query에게 알리고, 데이터를 최신화하도록 강제합니다.

기본적으로 TanStack Query는 설정된 `staleTime`이 지나기 전까지는 데이터를 '신선한(fresh)' 상태로 간주합니다. 하지만 데이터를 수정(Mutation)하는 등 **특정 시점에 데이터가 확실히 변했다는 것을 알 때**, `staleTime`이 만료될 때까지 기다리지 않고 강제로 데이터를 업데이트해야 합니다. 이때 `QueryClient`의 **invalidateQueries** 메서드를 사용합니다.

Mutation이 성공하면 관련된 기존 데이터(Query)는 구식(stale)이 됩니다. 이때 `onSuccess`에서 `queryClient.invalidateQueries`를 호출하여 해당 데이터를 다시 가져오도록 명령할 수 있습니다. 이때 프로미스를 반환하면 리페칭이 완료될 때까지 Mutation이 `pending` 상태를 유지하여 UI 흐름을 부드럽게 관리할 수 있습니다

### **Invalidation 동작 과정**

`invalidateQueries`가 호출되면 해당 쿼리에 대해 다음 두 가지 작업이 즉시 수행됩니다:

- **상태 변경**: 해당 쿼리를 즉시 '상태가 오래됨(stale)'으로 마킹합니다. 이 설정은 기존에 적용되어 있던 `staleTime` 설정을 무시하고 덮어씁니다.
- **백그라운드 리페칭**: 만약 해당 쿼리가 현재 화면에 렌더링되고 있다면(즉, 활성화된 쿼리라면), 백그라운드에서 데이터를 다시 가져오기(**refetch**)를 시작합니다.

### 유연한 쿼리 매칭 (Targeting)

모든 쿼리를 다 다시 불러올 필요는 없습니다. TanStack Query는 다양한 필터를 통해 무효화할 대상을 정교하게 고를 수 있습니다.

[https://www.notion.so/Tanstack-Query-2fce2a9f374980208cf2f97dff97f12f?source=copy_link#2fce2a9f37498019a1f1eb0ba96dc051](https://www.notion.so/Tanstack-Query-2fce2a9f374980208cf2f97dff97f12f?pvs=21)

- **접두사(Prefix) 매칭**: 기본적으로 제공된 키로 시작하는 모든 쿼리를 무효화합니다. 예를 들어 `['todos']`를 무효화하면 `['todos']`뿐만 아니라 `['todos', { page: 1 }]`과 같은 하위 쿼리들도 모두 무효화됩니다.
- **정확한 매칭 (Exact)**: 특정 키를 가진 쿼리 하나만 정확히 타겟팅하고 싶다면 `{ exact: true }` 옵션을 사용합니다.
- **조건부 매칭 (Predicate)**: 더 복잡한 조건이 필요할 경우 함수를 전달하여 각 쿼리 인스턴스를 검사하고 `true`를 반환하는 쿼리만 골라낼 수 있습니다.

### Optimistic Updates (**낙관적 업데이트)**

서버 응답이 오기 전 UI를 미리 업데이트하는 기술입니다.

- **UI 기반**: `useMutation`이 반환하는 `variables`를 활용해 `isPending` 동안 임시 UI를 보여주는 간단한 방식입니다.
    
    이 방법은 캐시를 직접 수정하지 않고, `useMutation`에서 반환하는 상태값들을 활용하여 UI만 변경하는 방식입니다.
    
    - **작동 원리**: 뮤테이션이 진행 중(`isPending`)일 때, 사용자가 입력한 데이터(`variables`)를 목록에 임시로 렌더링합니다.
    - **구현 특징**:
        - **투명도 조절**: 임시 데이터는 투명도를 낮게 설정하여 처리 중임을 표시할 수 있습니다.
        - **에러 처리**: 만약 뮤테이션이 실패(`isError`)하면 해당 항목을 제거하거나, `variables` 정보를 바탕으로 '재시도' 버튼을 보여줄 수도 있습니다.
        - **동기화**: 작업이 완전히 끝난 후(`onSettled`), 관련 쿼리를 무효화(Invalidate)하여 서버의 실제 데이터와 화면을 맞춥니다.
    - **장점**: 코드가 간결하고 롤백 로직을 직접 짤 필요가 없어 관리가 쉽습니다.
    - 예시 코드
        
        ```jsx
        import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
        
        function TodoList() {
          const queryClient = useQueryClient()
        
          // 1. 데이터를 가져오는 쿼리
          const { data: todos } = useQuery({
            queryKey: ['todos'],
            queryFn: fetchTodos,
          })
        
          // 2. 데이터를 추가하는 뮤테이션
          const addTodoMutation = useMutation({
            mutationFn: (newTodo) => axios.post('/api/data', { text: newTodo }),
            // 작업이 끝나면(성공/실패 무관) 서버 데이터와 동기화하기 위해 쿼리 무효화
            onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
          })
        
          // useMutation에서 필요한 상태값들을 구조 분해 할당으로 가져옴
          const { isPending, variables, isError, mutate } = addTodoMutation
        
          return (
            <div>
              <ul>
                {/* 서버에서 온 실제 데이터 리스트 */}
                {todos?.map((todo) => (
                  <li key={todo.id}>{todo.text}</li>
                ))}
        
                {/* 3. 낙관적 업데이트: 뮤테이션이 진행 중일 때만 임시 항목 표시 */}
                {isPending && (
                  <li style={{ opacity: 0.5 }}>
                    {variables} {/* 사용자가 방금 입력한 값 */}
                  </li>
                )}
        
                {/* 4. 에러 처리: 실패 시 에러 메시지와 재시도 버튼 표시 */}
                {isError && (
                  <li style={{ color: 'red' }}>
                    {variables} (추가 실패!)
                    <button onClick={() => mutate(variables)}>재시도</button>
                  </li>
                )}
              </ul>
        
              <button onClick={() => mutate('새로운 할 일')}>추가</button>
            </div>
          )
        }
        
        ```
        
- **캐시 기반**: `onMutate`에서 캐시 데이터를 직접 수정하고, 실패 시 `onError`에서 이전 상태로 롤백하는 방식입니다
    
    여러 컴포넌트나 화면에서 동일한 데이터를 공유하고 있을 때, 캐시 저장소를 직접 수정하여 모든 곳에 즉각 반영하는 방식입니다.
    
    - **단계별 프로세스**:
        1. `onMutate`: 뮤테이션 시작 직후 실행됩니다. 진행 중인 리페칭(refetch)을 취소하여 업데이트가 덮어씌워지는 것을 방지합니다. 수정 전의 데이터 스냅샷을 찍어둡니다. `setQueryData`를 사용하여 캐시를 새로운 값으로 업데이트합니다. 나중에 롤백에 사용할 스냅샷 데이터를 반환합니다.
        2. `onError`: 뮤테이션 실패 시, `onMutate`에서 반환한 스냅샷을 사용해 데이터를 이전 상태로 되돌립니다(Rollback).
        3. `onSettled`: 성공/실패 여부와 상관없이 마지막에 쿼리를 무효화하여 서버 상태와 최종 동기화합니다.
    - **장점**: 캐시가 업데이트되므로 해당 데이터를 구독하는 앱의 모든 UI가 자동으로 업데이트됩니다.
    - 예시 코드
        
        ```jsx
        const queryClient = useQueryClient()
        
        useMutation({
          mutationFn: updateTodo,
          // 1. mutate가 호출될 때 실행됨
          onMutate: async (newTodo) => {
            // 진행 중인 리페칭(refetch)을 취소하여 낙관적 업데이트 데이터가 덮어씌워지지 않게 함 [3]
            await queryClient.cancelQueries({ queryKey: ['todos'] })
        
            // 롤백을 위해 이전 캐시 데이터의 스냅샷을 찍어둠 [3]
            const previousTodos = queryClient.getQueryData(['todos'])
        
            // 캐시를 새로운 값으로 낙관적 업데이트 함 [3]
            queryClient.setQueryData(['todos'], (old) =>
              old.map(todo => todo.id === newTodo.id ? newTodo : todo)
            )
        
            // 이전 데이터를 포함한 컨텍스트 객체를 반환 (onError에서 사용됨) [2, 3]
            return { previousTodos }
          },
          // 2. 에러 발생 시 실행됨
          onError: (err, newTodo, context) => {
            // onMutate에서 반환된 컨텍스트를 사용하여 캐시를 이전 상태로 롤백함 [3]
            if (context?.previousTodos) {
              queryClient.setQueryData(['todos'], context.previousTodos)
            }
          },
          // 3. 성공하든 실패하든 마지막에 실행됨
          onSettled: () => {
            // 서버 상태와 동기화하기 위해 해당 쿼리를 무효화하고 리페칭함 [3]
            queryClient.invalidateQueries({ queryKey: ['todos'] })
          },
        })
        ```
        

# Cache 내부 동작

### **Query Key 기반의 캐시 식별**

TanStack Query의 캐시 관리는 **고유한 쿼리 키**를 중심으로 이루어집니다.

- **식별자 역할**: 쿼리 키는 데이터를 고유하게 식별하는 주소와 같으며, 내부적으로 쿼리를 리페칭, 캐싱, 애플리케이션 전체에서 공유하는 데 사용됩니다.
- **결정론적 해싱**: 쿼리 키는 항상 배열 형태여야 하며, 내부의 객체 속성 순서가 달라도 내용이 같다면 동일한 키로 간주하여 캐시된 데이터를 공유합니다

### 데이터 신선도 관리: staleTime과 gcTime

- **staleTime (상하기까지의 시간)** “언제 다시 서버에 요청할까?”
    - **개념**: 데이터가 **'신선한(fresh)' 상태로 유지되는 시간, ‘상한(stale)’ 상태가 될 때까지 걸리는 시간**을 의미합니다.
    - **동작**: 이 시간 동안은 쿼리가 다시 마운트되거나 윈도우에 포커스가 가더라도 서버에 데이터를 다시 요청(refetch)하지 않고 캐시된 데이터를 그대로 사용합니다.
    - **기본값**: v5에서도 기본값은 **0**입니다. 즉, 별도로 설정하지 않으면 데이터를 가져오자마자 바로 '오래된(stale)' 상태가 되어, 다음 기회(마운트 등)에 즉시 리페칭을 시도하게 됩니다.
    - 내 정보 수정 같은 경우에는 나 이외에 데이터를 수정하는 사람이 없으므로 staleTime을 길게 가져가도 문제가 발생하지 않습니다. 반면, 주식 차트 같은 경우엔 실시간 반영이 중요하므로 staleTime을 0으로 합니다.
- **gcTime** (Garbage Collection Time, 이전 **cacheTime**) “언제 메모리에서 지울까?”
    - **개념**: 데이터가 캐시에서 완전히 삭제(Garbage Collection)되기 전까지 **메모리에 남아있는 시간**입니다.
    - **이름 변경 이유**: `cacheTime`이라는 명칭이 "데이터가 캐시되는 시간"으로 오해받기 쉬웠으나, 실제로는 쿼리가 사용되지 않는(Unused) 시점부터 작동하기 때문에 그 성격을 더 잘 나타내는 `gcTime`으로 변경되었습니다.
    - **동작**: 해당 쿼리를 사용하는 컴포넌트가 모두 언마운트되어 **'사용되지 않는 상태'가 된 순간부터** 타이머가 돌아갑니다. 이 시간이 지나면 데이터는 메모리 절약을 위해 캐시에서 영구히 삭제됩니다.
    - **기본값**: 5분
- **retry** (기본값: 클라이언트 3회, 서버 0회)**:** 쿼리 실패 시 클라이언트에서는 기본적으로 3번 재시도합니다
    
    권한 부족(401)이나 잘못된 요청(400)은 백번 재시도해도 실패할 것이므로, 네트워크 낭비를 방지하기 위해 특정 조건에서 재시도를 끄는 것이 좋습니다
    
    ```jsx
    retry : ( failureCount , error ) => { 
    	// Don't retry on 4xx errors 
    	if ( error ?. status >= 400 && error ?. status < 500 ) { 
    		return false; 
    	} 
    	return failureCount < 3; 
    },
    ```
    
- **refetchOnWindowFocus (기본값: true)**: 사용자가 브라우저 탭을 다시 클릭하거나 앱으로 돌아올 때 최신 데이터를 보장하기 위해 자동으로 데이터를 다시 가져옵니다.
    - refetchOnReconnect**,** refetchOnMount, …
- **throwOnError (기본값: 데이터가 없을 때만 true)**: v5에서는 데이터가 이미 캐시에 있는 경우 에러가 발생해도 화면을 깨뜨리지 않고 기존 데이터를 유지하려 합니다

### **내부 상태 모니터링: status와 fetchStatus**

TanStack Query는 데이터의 유무와 쿼리 함수의 실행 상태를 구분하여 관리합니다.

- **status**: 데이터의 존재 여부. ****`pending`(데이터 없음), `error`(에러 발생), `success`(데이터 있음) 상태가 있습니다. v5에서 `loading`은 `pending`으로 명칭이 변경되었습니다.
- **fetchStatus**: 쿼리 함수(queryFn)의 실행 여부. `fetching`(실행 중), `paused`(네트워크 연결 대기 등으로 중단), `idle`(아무것도 하지 않음) 상태가 있습니다.

성공적으로 데이터를 가져온 후 백그라운드에서 다시 데이터를 업데이트 중이라면, `status`는 `success`이지만 `fetchStatus`는 `fetching`일 수 있습니다

### 성능 최적화: Structural Sharing과 Tracked Properties

- **구조적 공유 (Structural Sharing)**: 서버에서 새로운 데이터를 가져왔을 때, JSON 파싱 결과가 완전히 새로운 참조이더라도 **실제로 변경된 부분만 교체**하고 나머지는 기존 참조를 유지합니다. 이를 통해 불필요한 리렌더링을 방지하고 성능을 높입니다.
- **속성 추적 (Tracked Properties)**: 컴포넌트에서 실제로 '사용 중인' 속성(예: `data`, `isPending`)이 변할 때만 리렌더링을 트리거합니다. 사용하지 않는 속성이 백그라운드에서 변하더라도 UI 업데이트를 일으키지 않습니다.

### **수동 캐시 제어 및 업데이트**

- **쿼리 무효화 (Invalidation)**: `invalidateQueries`를 호출하면 특정 키의 데이터를 즉시 **stale 상태로 마킹**합니다. 만약 해당 쿼리가 현재 화면에 렌더링 중이라면 즉시 백그라운드 리페칭이 시작됩니다.
- **프리페칭 (Prefetching)**: 사용자가 데이터를 필요로 하기 전에 미리 캐시에 채워두는 기능으로, `prefetchQuery` 등을 사용해 사용자 경험을 개선합니다.
- **낙관적 업데이트 (Optimistic Updates)**: 서버 응답 전 캐시 데이터를 미리 수정하여 UI를 즉시 업데이트하고, 실패 시 `onMutate`에서 찍어둔 스냅샷으로 롤백합니다.

# 고급 기능

### Infinity Query

더보기 버튼이나 무한 스크롤과 같이  **페이지 단위로 데이터를 관리**하는 기능

- 예시 코드
    
    ```jsx
    import { useInfiniteQuery } from '@tanstack/react-query'
    
    function Projects() {
      const fetchProjects = async ({ pageParam }) => {
        // API 호출 시 pageParam을 커서나 페이지 번호로 사용합니다
        const res = await fetch('/api/projects?cursor=' + pageParam)
        return res.json()
      }
    
      const {
        data,
        error,
        fetchNextPage,    // 다음 페이지를 불러오는 함수
        hasNextPage,      // 다음 페이지 존재 여부 
        isFetching,       // 데이터 페칭 중인지 확인
        isFetchingNextPage, // 특히 '다음 페이지'를 불러오는 중인지 확인 
        status,
      } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
        initialPageParam: 0, // 첫 번째 페이지 파라미터
        getNextPageParam: (lastPage) => lastPage.nextCursor, // 다음 페이지용 커서 반환
    	  maxPages: 5, // 성능 최적화: 캐시에 최대 5페이지만 유지합니다
      })
    
      if (status === 'pending') return <p>로딩 중...</p>
      if (status === 'error') return <p>에러: {error.message}</p>
    
      return (
        <>
          {/* data.pages를 map으로 돌려 각 페이지 그룹을 렌더링합니다 [7] */}
          {data.pages.map((group, i) => (
            <div key={i}>
              {group.data.map((project) => (
                <p key={project.id}>{project.name}</p>
              ))}
            </div>
          ))}
          
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetching} 
              {/* 더 올 데이터가 없거나 로딩 중이면 비활성화 */}
            >
              {isFetchingNextPage ? '불러오는 중...' : hasNextPage ? '더 보기' : '마지막 데이터입니다'}
            </button>
          </div>
        </>
      )
    }
    ```
    
    (참고)
    
    - 화면에 모든 항목을 표시할 때는 `data.pages.flatMap((page) => page.items)`를 사용하여 2차원 배열을 1차원으로 평탄화하면 렌더링하기 편리합니다.
    - 버튼 클릭 대신 Intersection Observer를 사용하면 사용자가 바닥에 닿았을 때 자동으로 `fetchNextPage`를 실행하게 만들어 무한 스크롤을 완성할 수 있습니다
    - 무한 쿼리가 오래되어(stale) 다시 불러올 때는 데이터 일관성을 위해 첫 번째 페이지부터 순차적으로 모든 페이지를 다시 불러옵니다
- **데이터 구조**
    
    일반적인 `useQuery`와 달리, `useInfiniteQuery`가 반환하는 `data`는 다음과 같은 객체 구조를 가집니다,:
    
    - **data.pages**: 지금까지 서버에서 가져온 페이지 데이터들이 담긴 배열입니다.
    - **data.pageParams**: 각 페이지를 가져올 때 사용된 파라미터들이 담긴 배열입니다.
- **핵심 설정 옵션**
    - **initialPageParam (필수)**: 첫 번째 페이지를 가져올 때 사용할 초기 파라미터 값입니다,. 이전 버전과 달리 v5에서는 이 값을 반드시 명시해야 합니다.
    - **getNextPageParam (필수)**: 다음 페이지를 가져올 수 있는지, 있다면 어떤 파라미터를 사용할지 결정하는 함수입니다,. 여기서 `null`이나 `undefined`를 반환하면 더 이상 불러올 데이터가 없음을 의미합니다,.
- **주요 상태 및 함수**
    
    UI를 제어하기 위해 다음 기능들을 자주 사용하게 됩니다,:
    
    - **fetchNextPage()**: 사용자가 스크롤을 끝까지 내리거나 버튼을 클릭했을 때 다음 페이지 데이터를 요청하는 함수입니다.
    - **hasNextPage**: 불러올 다음 페이지가 남아있는지 여부를 알려주는 불리언 값입니다.
    - **isFetchingNextPage**: 백그라운드 업데이트와 별개로, 현재 "다음 페이지를 불러오는 중"인지를 구분하여 로딩 스피너 등을 표시할 때 유용합니다.
- **성능 최적화: `maxPages` (v5)**
    
    무한 스크롤은 데이터가 계속 쌓이기 때문에 메모리 관리가 중요합니다.
    
    - **메모리 절약**: **maxPages** 옵션을 사용하면 캐시에 저장할 최대 페이지 수를 제한할 수 있습니다,. 예를 들어 5페이지로 설정하면, 6페이지를 불러올 때 가장 오래된 1페이지를 메모리에서 제거하여 브라우저의 성능 저하를 방지합니다,,.
    - **네트워크 절약**: 리페칭(Refetch)이 발생할 때 무한 쿼리는 첫 페이지부터 순차적으로 모든 데이터를 다시 가져오는데, `maxPages`를 설정하면 제한된 개수만큼만 다시 가져오므로 네트워크 비용도 줄어듭니다,.
- **동작의 특징**
    - **순차적 리페칭**: 데이터가 신선하지 않아 다시 불러올 때, 무한 쿼리는 데이터의 일관성을 위해 첫 번째 페이지부터 순차적으로 데이터를 가져옵니다,.
    - **단일 캐시 엔트리**: 무한 쿼리의 모든 페이지는 하나의 캐시 항목을 공유하므로, 동시에 여러 페이지를 요청할 때 발생할 수 있는 데이터 덮어쓰기 문제에 주의해야 합니다.

### Dependent Query

종속 쿼리는 **특정 쿼리의 결과가 있어야만 실행되는 쿼리**를 의미합니다.

- **구현 방법**: `useQuery`의 `enabled` 옵션을 활용합니다.
    - 예시 코드
        
        사용자 이메일로 ID를 먼저 조회한 뒤, 해당 ID가 존재할 때만 프로젝트 목록을 가져오도록 설정할 수 있습니다.
        
        ```jsx
        // 사용자 조회
        const { data: user } = useQuery({
          queryKey: ['user', email],
          queryFn: getUserByEmail,
        })
        
        const userId = user?.id
        
        // 사용자 조회 후 사용자의 프로젝트 조회
        const {
          status,
          fetchStatus,
          data: projects,
        } = useQuery({
          queryKey: ['projects', userId],
          queryFn: getProjectsByUser,
          // The query will not execute until the userId exists
          enabled: !!userId,
        })
        ```
        
- **성능 고려사항**: 이러한 종속 관계는 요청이 순차적으로 발생하는 '**리퀘스트 워터폴(Request Waterfall)**'을 유발하여 성능에 영향을 줄 수 있습니다. 가능한 경우 API를 재구성하여 한 번의 호출로 데이터를 가져오는 것이 권장됩니다.

### Error Boundary & Suspense

React의 최신 렌더링 패턴을 결합하면 `pending`이나 `error` 상태를 수동으로 체크하지 않고 **선언적으로 UI를 관리**할 수 있습니다.

- React Suspense란?
    - **Suspense**: 리액트 컴포넌트가 비동기 데이터를 기다리는 동안 "기다릴" 수 있게 해주는 API입니다. 데이터가 준비될 때까지 렌더링을 중단하고 대신 보여줄 로딩 UI(fallback)를 정의할 수 있게 합니다.
        
        e.g. `<Suspense fallback={<Loading />}> <AsyncComponent /> </Suspense>`
        
    - **Suspend (상태)**: 컴포넌트가 아직 렌더링할 준비가 되지 않았을 때(예: `useSuspenseQuery`가 실행 중일 때) 발생하는 동작입니다. 이 상태가 되면 리액트는 해당 컴포넌트의 렌더링을 멈추고 가장 가까운 상위 `Suspense` 경계로 제어권을 넘깁니다.
    - **Error Boundary**: 자식 컴포넌트 트리 어디에서든 발생한 자바스크립트 에러를 포착하여 기록하고, 앱 전체가 중단되는 대신 에러 UI(fallback)를 보여주는 리액트 컴포넌트입니다. `react-error-boundary` 라이브러리.
- **전용 훅**: TanStack Query는 `useSuspenseQuery`, `useSuspenseInfiniteQuery`, `useSuspenseQueries`, `useErrorBoundary`를 지원합니다. 이 훅들은 데이터가 준비되지 않으면 자동으로 리액트를 `suspend` 시킵니다
- **동작 원리**: 이 훅을 사용하면 데이터가 로딩 중일 때는 상위의 `React.**Suspense**`가 `fallback` UI를 보여주고, 에러 발생 시에는 가장 가까운 **에러 바운더리(Error Boundary)**가 에러를 포착합니다. 이를 통해 컴포넌트 내부에서 `data`가 항상 정의된 상태(defined)임을 보장받을 수 있어 코드가 간결해집니다.
- **에러 초기화**: `QueryErrorResetBoundary` 컴포넌트나 `useQueryErrorResetBoundary` 훅을 사용하면 에러 발생 후 다시 시도할 수 있는 초기화 기능을 구현할 수 있습니다.
- 예시 코드
    
    ```jsx
    import { useSuspenseQuery } from '@tanstack/react-query';
    
    function PostList() {
      // 데이터가 로딩 중이면 상위 Suspense가, 에러가 발생하면 ErrorBoundary가 포착합니다.
      // 따라서 이곳의 data는 항상 성공적으로 가져온 데이터임이 보장됩니다.
      const { data } = useSuspenseQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
      });
    
      return (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      );
    }
    ```
    
    ```jsx
    import React, { Suspense } from 'react';
    
    function App() {
      return (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
    	        {/* 에러 바운더리가 리셋될 때 TanStack Query의 에러 상태도 초기화 */}
              onReset={reset} 
              fallbackRender={({ resetErrorBoundary }) => (
                <div>
                  에러가 발생했습니다!
                  <button onClick={()=>resetErrorBoundary()}>재시도</button>
                </div>
              )}
            >
              {/* 데이터가 준비될 때까지 fallback UI를 보여줍니다 */}
              <Suspense fallback={<div>포스트 목록 로딩 중...</div>}>
                <PostList />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      );
    }
    ```
    

### Persistence

`persistQueryClient` 플러그인을 사용하면 브라우저 메모리에 있는 캐시 데이터를 `localStorage`와 같은 외부 저장소에 저장하여 **새로고침 후에도 상태를 유지**할 수 있습니다.

v5에서는 특정 쿼리별로 영속성 여부를 세밀하게 제어할 수 있는 `experimental_createPersister`가 추가되었습니다.

### Server Side Events

- **`streamedQuery` 실험적 API 활용 방식**
    
    TanStack Query v5에서는 `AsyncIterable`을 반환하는 함수를 통해 데이터를 스트리밍할 수 있는 `experimental_streamedQuery` 기능을 도입했습니다. 이는 특히 AI 응답이나 실시간 대시보드 처럼 데이터가 조각(Chunk) 단위로 도착하는 SSE 환경에 최적화되어 있습니다.
    
    - **작동 방식**: `streamFn`에서 서버로부터 스트림을 받아 `AsyncIterable` 형태로 반환하면, TanStack Query가 이를 구독하여 데이터를 축적합니다.
    - **핵심 기능**:
        - **Reducer**: 수신된 각 조각을 최종 데이터 형태(예: 문자열 합치기)로 변환하는 로직을 정의할 수 있습니다.
        - **상태 관리**: 첫 번째 데이터가 올 때까지는 `pending` 상태를 유지하고, 이후에는 `success` 상태로 전환되지만 스트림이 끝날 때까지 `fetching` 상태를 유지합니다.
    
    **장점**:
    
    - **통합된 인터페이스**: 일반 쿼리와 동일한 캐싱, 에러 복구, 상태 관리 로직을 사용할 수 있습니다.
    - **체감 성능 향상**: 데이터가 도착하는 즉시 UI에 반영되므로 AI 응답 같은 경우 체감 속도가 빨라집니다.
    - **자동화된 라이프사이클**: 스트림의 시작과 끝, 에러 처리를 라이브러리 차원에서 관리해 줍니다.
    
    **단점**:
    
    - **실험적 단계**: API가 아직 실험적(Experimental)이라 향후 변경될 가능성이 있습니다.
    - **구현 제약**: 데이터 소스가 반드시 `AsyncIterable` 형식을 따라야 합니다.
    - 예시 코드
        
        ```jsx
        import { experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";
        
        // 1. Async Generator를 이용한 스트림 함수 정의
        // 제너레이터 함수는 yield 키워드를 사용하여 여러 개의 값을 순차적으로 반환할 수 있습니다
        async function* streamAIResponse(prompt, signal) {
          const response = await fetch("/api/ai/stream", {
            method: "POST",
            body: JSON.stringify({ prompt }),
            signal,
          });
          
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            yield JSON.parse(decoder.decode(value)); // 청크 단위로 yield
          }
        }
        
        // 2. useQuery 내에서 streamedQuery 사용
        export function useStreamedResponse(prompt) {
          return useQuery({
            queryKey: ["ai-stream", prompt],
            queryFn: streamedQuery({
              streamFn: ({ signal }) => streamAIResponse(prompt, signal),
              // 리듀서를 통해 스트리밍되는 청크들을 최종 데이터 형태로 가공
              reducer: (acc = { tokens: [] }, chunk) => ({
                ...acc,
                tokens: [...acc.tokens, chunk.value],
              }),
              refetchBehavior: "reset", // 리페치 시 이전 데이터 초기화
            }),
            staleTime: Infinity,
          });
        }
        
        // 3. 컴포넌트에서 useStreamedResponse 사용
        function AIChat() {
          const [prompt, setPrompt] = useState("");
          // streamedQuery API를 활용한 데이터 스트리밍 상태 및 결과 조회
          const { data, isStreaming, error } = useStreamedAIResponse(prompt);
        
          // reducer에 의해 누적된 토큰들을 하나의 텍스트로 합침
          const displayText = data?.tokens.join("") || "";
          const isComplete = data?.complete || false;
        
          return (
            <div className='ai-chat'>
              <div className='response'>
                {/* 실시간으로 업데이트되는 텍스트 출력 */}
                {displayText}
                {/* 스트리밍 중이고 아직 완료되지 않았다면 커서 표시 */}
                {isStreaming && !isComplete && <span className='cursor'>▊</span>}
              </div>
              {/* 에러 발생 시 메시지 출력 */}
              {error && <div className='error'>Stream error: {error.message}</div>}
            </div>
          );
        }
        ```
        
        참고자료 https://dev.to/martinrojas/3-tanstack-query-features-that-transform-production-react-apps-196b
        
- **`EventSource` 수동 캐시 관리 방식**
    
    전통적으로 SSE를 처리할 때 사용하는 방식으로, 브라우저의 기본 `EventSource` API를 사용하면서 TanStack Query의 캐시 시스템을 저장소로만 활용하는 방식입니다.
    
    - **작동 방식**: 커스텀 훅 내에서 `EventSource` 인스턴스를 생성하고, `addEventListener`를 통해 데이터 수신 시 `queryClient.setQueryData`를 호출하여 캐시를 강제로 업데이트합니다.
    - **핵심 기능**:
        - **수동 상태 주입**: `onSuccess`나 이벤트 핸들러 내부에서 직접 캐시 데이터를 수정하여 UI를 동기화합니다.
        - **Last-Event-ID 관리**: 재연결 시 마지막으로 받은 이벤트 ID를 헤더에 포함하여 중복 없이 데이터를 이어받도록 구현할 수 있습니다.
    
    **장점**:
    
    - **표준 프로토콜 신뢰성**: 순수 HTTP 기반의 SSE 표준을 따르므로 대부분의 환경에서 안전하게 작동합니다.
    - **세밀한 제어**: 'message', 'error', 'status' 등 서버가 보내는 다양한 이벤트 타입에 따라 캐시 업데이트 로직을 정교하게 짤 수 있습니다.
    - **자동 재연결**: 브라우저의 `EventSource`가 연결 끊김 시 자동으로 재연결을 시도하는 이점을 그대로 누릴 수 있습니다.
    
    **단점**:
    
    - **높은 코드 복잡도**: 리스너 등록, 캐시 수동 업데이트, 컴포넌트 언마운트 시 연결 종료(`es.close()`) 등 관리해야 할 코드가 많습니다.
    - **중복 데이터 위험**: `refetchOnWindowFocus` 같은 옵션을 끄지 않으면 SSE로 받은 데이터와 일반 fetch 데이터가 충돌할 수 있습니다.
    - 예시 코드
        
        ```jsx
        import { EventSource } from "eventsource";
        import { useQuery, useQueryClient } from "@tanstack/react-query";
        
        export const useConversationSSE = (id, controller) => {
          const queryClient = useQueryClient();
        
          return useQuery({
            queryKey: ["conversation", id],
            queryFn: () => {
              const queryKey = ["conversation", id];
              // 기존 캐시 데이터를 확인하거나 기본값 설정
              const prevState = queryClient.getQueryData(queryKey) || { items: [] };
        
              const es = new EventSource(`/api/sse/${id}`);
        
              // 서버로부터 'item' 이벤트 수신 시 캐시 수동 업데이트
              es.addEventListener("item", (event) => {
                const newItem = JSON.parse(event.data);
                
                // 쿼리 캐시를 직접 찾아 데이터를 업데이트
                queryClient.setQueryData(queryKey, (oldState) => ({
                  ...oldState,
                  items: [...(oldState?.items || []), newItem],
                }));
              });
        
              // 연결 종료 로직
              controller.signal.addEventListener("abort", () => es.close());
        
              return prevState;
            },
            enabled: !!id,
            refetchOnWindowFocus: false, // 중복 연결 방지를 위해 필수
          });
        };
        
        // 메시지 목록을 보여주는 내부 컴포넌트
        function MessageList() {
          // SSE 스트림 상태를 구독
          const { data } = useConversationSSE();
        
          return (
            <div className="message-container">
              {/* 캐시에 수동으로 누적된 items 배열 렌더링 */}
              {data?.items.map((item, index) => (
                <div key={index} className="message-item">
                  {item.content}
                </div>
              ))}
              {/* 서버로부터 받은 status 이벤트를 통해 상태(처리중 등) 표시 */}
              {data?.status === "processing" && <div>상대방이 입력 중...</div>}
            </div>
          );
        }
        ```
        
        참고자료 https://fragmentedthought.com/blog/2025/react-query-caching-with-server-side-events
        

| 비교 항목 | **Streamed Query (실험적)** | **수동 캐시 관리 (EventSource)** |
| --- | --- | --- |
| **추천 사례** | AI 채팅 응답, 실시간 토큰 스트리밍 | 복잡한 실시간 대화 상태 관리, 알림 |
| **코드량** | 상대적으로 적음 (추상화됨) | 많음 (수동 핸들링 필요) |
| **안정성** | 낮음 (API 변경 가능성) | 높음 (표준 API 사용) |
| **주요 장점** | 선언적 사용, 빠른 체감 성능 | 브라우저 네이티브 재연결 활용 |
- 참고자료 https://dev.to/martinrojas/3-tanstack-query-features-that-transform-production-react-apps-196b
    
    **Integration Patterns and Trade-offs**
    
    After deploying these features across different scales, here's our decision matrix:
    
    **Use Infinite Queries when:**
    
    1 Dealing with paginated APIs returning 100+ items
    
    2 Users expect seamless scrolling experiences
    
    3 Memory constraints exist (mobile web apps)
    
    **Use Streamed Queries when:**
    
    1 Handling AI/LLM responses that arrive progressively
    
    2 Implementing real-time dashboards without WebSocket complexity
    
    3 Server-sent events need query-like caching behavior
    
    **Use Broadcast Query when:**
    
    1 Users frequently work with multiple tabs
    
    2 Reducing unnecessary API calls is a priority
    
    3 Building collaborative features without real-time backends
    

---

# 기타

## **개발자 도구 (DevTools)**

내부 동작을 시각화하고 디버깅 합니다.

- **특징**: v5부터는 Mutation(변경) 작업도 모니터링 가능합니다.
- **브라우저 확장 프로그램**: Chrome/Firefox용 별도 확장 프로그램으로도 사용 가능합니다.
- 기본적으로 Devtool은 `process.env.NODE_ENV === 'development'`에서만 번들에 포함됩니다. (production mode에 넣고 싶다면 공식 문서 참고할 것)
- 패키지 사용 방법
    
    ```jsx
    // 설치
    pnpm add @tanstack/react-query-devtools
    ```
    
    ```jsx
    // 사용
    import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
    function App() {
      return (
        <QueryClientProvider client={queryClient}>
          {/* The rest of your application */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      )
    }
    ```
    
    ```jsx
    // devtool dusms 
    import { ReactQueryDevtoolsPanel }from '@tanstack/react-query-devtools'
    
    function App() {
      const [isOpen,setIsOpen]= React.useState(false)
    
      return (
        <QueryClientProvider client={queryClient}>
          {/* The rest of your application */}
          <button
            onClick={()=> setIsOpen(!isOpen)}
          >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
          {isOpen&& <ReactQueryDevtoolsPanel onClose={()=> setIsOpen(false)} />}
        </QueryClientProvider>
      )
    }
    ```
    
- 브라우저 익스텐션 사용 방법
    
    Chrome, Firefox, Edge에 브라우저 익스텐션이 있다. devtool 패키지와 같은 기능을 제공한다.
    
    https://chromewebstore.google.com/detail/tanstack-query-devtools/annajfchloimdhceglpgglpeepfghfai
    

## 라이브러리 비교 (2026.01 기준)

- (2026.01 기준)
    
    
    |  | **React Query** | **SWR [*(Website)*](https://github.com/vercel/swr)** | **Apollo Client [*(Website)*](https://github.com/apollographql/apollo-client)** | **RTK-Query [*(Website)*](https://redux-toolkit.js.org/rtk-query/overview)** | **React Router [*(Website)*](https://github.com/remix-run/react-router)** |
    | --- | --- | --- | --- | --- | --- |
    | Github Repo / Stars | 48k | 32k | 20k | 11k | 56k |
    | 캐싱 전략 | 계층적 Key-Value | 고유 Key-Value | 정규화된 스키마 | 고유 Key-Value | 중첩 Route-Value |
    | 캐시 키 전략 | JSON | JSON | GraphQL Query | JSON | Route Path |
    | 캐시 변경 감지 | Deep Compare Keys (Stable Serialization) | Deep Compare Keys (Stable Serialization) | Deep Compare Keys (Unstable Serialization) | Key Referential Equality (===) | Route Change |
    | 데이터 변경 감지 | Deep Comparison + Structural Sharing  | Deep Compare (via stable-hash) | Deep Compare (Unstable Serialization) | Key Referential Equality (===) | Loader Run |
    | 데이터 메모이제이션 | Full Structural Sharing | Identity (===) | Normalized Identity | Identity (===) | Identity (===) |
    | Bundle Size | 13.1KB | 5.5KB | 33.8KB | 13.4KB | 58.2KB |
    | Selectors | ✅ | 🛑 | ✅ | ✅ | N/A |
    | Auto Garbage Collection | ✅ | 🛑 | 🛑 | ✅ | N/A |
    | Query Cancellation | ✅ | 🛑 | 🛑 | 🛑 | ✅ |
    | Stale Time Configuration | ✅ | 🛑 | 🛑 | ✅ | 🛑 |
    | React Suspense | ✅ | ✅ | ✅ | 🛑 | ✅ |
- Redux + Thunk/Saga와 비교
    - **방식**: 미들웨어를 사용하여 비동기 로직을 처리합니다.
    - **단점**: 성공/실패/로딩 액션을 일일이 정의해야 하므로 보일러플레이트(반복 코드)가 매우 많습니다.
    - **구조적 문제**: 서버 데이터와 클라이언트 전용 상태가 하나의 Store에 섞여 관리가 복잡해집니다.
- SWR와 비교
    - **방식**: React Query와 유사하나 가벼운 라이브러리
    - **차이점**: SWR에 불변(immutable) 모드가 있는데, TanStack Query처럼 stale-time이나 조건부 자동 재검증(revalidation)에 대한 제어가 불가능합니다.
- Context API + Custom Hooks (직접 구현)
    - **방식**: 라이브러리 없이 `useFetch` 같은 훅을 직접 만들어 관리합니다.
    - **고려사항**:
        - **캐싱 직접 구현**: URL을 키로 사용하는 싱글톤 객체나 Context를 만들어 데이터를 저장해야 합니다.
            1. Custom hook과 Context API를 활용하여 `useFetch` 같은 커스텀 훅을 만들어 `loading`, `error`, `data` 상태를 관리하고 `useEffect` 안에서 `fetch`를 실행하도록 한다.
            2. 캐싱을 위해 전역 Context나 싱글톤 객체를 만들어 URL을 Key로 하고 응답 데이터를 Value로 저장하게 한다.
            3. 훅이 실행될 때 캐시 저장소를 먼저 확인하고 데이터가 있고 유효하다면 API 요청 없이 캐시된 데이터를 반환하도록 구현할 수 있다.
            4. 더 나아가 race condition 문제를 방지하기 위해 `AbortController`(비동기 요청을 취소하는 API)를 사용하여 컴포넌트 언마운트 시 요청을 취소하는 로직도 추가해야 한다.
        - **로직 복잡도**: 데이터 유효성 검사, API 요청 취소(AbortController 사용), 경쟁 상태(Race Condition) 방지 로직 등을 개발자가 일일이 수동으로 작성해야 하므로 유지보수 비용이 높습니다.
    
    직접 구현(Context API)은 가벼운 프로젝트에 적합할 수 있지만, 규모가 커질수록 **캐싱, 리렌더링 최적화, 경쟁 상태 관리** 등 신경 쓸 것이 기하급수적으로 늘어납니다. TanStack Query는 이러한 복잡한 고민을 라이브러리 차원에서 해결해 주는 셈입니다.
    

**TanStack Query의 차별점**

**1. 지연된 쿼리 데이터 (Lagged Query Data)**

다음 쿼리가 로드되는 동안 **기존 쿼리의 데이터를 계속해서 보여줄** 수 있는 방법을 제공합니다 (이는 향후 React의 Suspense가 네이티브로 제공할 UX와 유사합니다.

e.g. 페이지네이션(Pagination)이나 무한 스크롤 구현 시, 페이지를 넘길 때마다 화면이 흰색(로딩창)으로 변하는 '하드 로딩' 상태를 방지합니다.

**2. 렌더링 최적화 (Render Optimization)**

React Query는 불필요한 리렌더링을 지능적으로 차단합니다.

- **필드 추적(Field Tracking)**: 컴포넌트 내에서 실제로 접근되는 필드(e.g. `data`, `error`)만 감시하여, 사용하지 않는 필드(e.g. `isFetching`)가 변할 때는 리렌더링을 일으키지 않습니다.
- **업데이트 일괄 처리(Batching)**: 동일한 쿼리를 여러 컴포넌트에서 사용할 경우, 업데이트를 하나로 묶어 앱 전체의 렌더링 횟수를 최소화합니다.
- **수동 설정**: `data`나 `error` 속성에만 관심이 있다면, `notifyOnChangeProps`를 `['data', 'error']`로 설정하여 렌더링 횟수를 더욱 줄일 수 있습니다.

**3. 사전 사용 쿼리 설정 (Pre-usage Query Configuration)**

쿼리와 뮤테이션이 사용되기 전, 기본 동작을 미리 설정할 수 있습니다.

매번 `useQuery`를 호출할 때마다 fetcher 함수나 옵션을 반복해서 작성할 필요 없이, 기본값을 미리 구성해두고 필요할 때 불러와 사용할 수 있어 코드의 재사용성이 높아집니다.

**4. 뮤테이션 후 자동 리페칭 (Automatic Refetch after Mutation)**

뮤테이션이 발생한 후 진정한 의미의 "자동 리페칭"이 이루어지려면, 라이브러리가 스키마 내의 개별 엔티티와 엔티티 타입을 식별할 수 있도록 돕는 휴리스틱과 함께 스키마(schema)가 필요합니다.

## Typescript 활용

- 타입 추론 (Type Inference)
    
    함수의 반환 타입을 정의하면 `useQuery`의 `data` 타입이 자동으로 추론됩니다.
    
    ```jsx
    const fetchGroups = (): Promise<Group[]> => axios.get('/groups').then(r => r.data)
    const { data } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups }) // Group[] | undefined
    ```
    
- 타입 내로잉 (Type Narrowing)
    
    `isSuccess`나 `status`를 체크하여 데이터가 존재하는 상태임을 보장받을 수 있습니다.
    
    ```jsx
    const { data, isSuccess } = useQuery({ queryKey: ['test'], queryFn: () => Promise.resolve(5) })
    
    if (isSuccess) {
      data
      //  ^? const data: number
    }
    ```
    
    AxiosError 같은 서브클래스가 있다면, error field를 특정할 수 있습니다.
    
    ```jsx
    import axios from 'axios'
    
    const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
    //      ^? const error: Error | null
    
    if (axios.isAxiosError(error)) {
      error
      // ^? const error: AxiosError
    }
    ```
    
- 전역 타입 설정 (v5)
`Register` 인터페이스를 수정하여 에러나 쿼리 키의 전역 타입을 지정할 수 있습니다.
    
    ```jsx
    import '@tanstack/react-query'
    
    type QueryKey = ['dashboard' | 'marketing', ...ReadonlyArray<unknown>]
    
    declare module '@tanstack/react-query' {
      interface Register {
        defaultError: AxiosError // 모든 에러의 기본 타입을 AxiosError로 설정
        queryKey: QueryKey
        mutationKey: QueryKey  }
    }
    ```
    

### useEffect 데이터 통신에서의 Race Condition

사용자가 탭 A를 눌렀다가 빠르게 탭 B를 누르면 A 요청이 B 요청보다 늦게 도착하여 화면은 탭 B인데 데이터는 A 내용이 덮어씌워지는 현상이다. React Query는 쿼리 키를 기반으로 요청을 관리하고 컴포넌트가 언마운트되거나 키가 바뀌면 이전 요청을 취소(`AbortSignal` 활용)하거나 무시하여 이 문제를 해결한다.

- 예시 코드 (Race Condition 발생)
    
    ```jsx
    import { useState, useEffect } from 'react';
    
    function UserProfile({ userId }) {
      const [data, setData] = useState(null);
    
      useEffect(() => {
        let active = true; // 그나마 이를 막기 위한 플래그 변수 패턴
    
        const fetchData = async () => {
          setData(null); // 로딩 표시를 위해 초기화
          const response = await fetch(`/api/user/${userId}`);
          const result = await response.json();
          
          // data라는 단일 상태 변수를 사용하므로
          // 1번 요청이 늦게 도착하면 
          // 현재 userId가 2임에도 불구하고 data 변수를 1번 결과로 덮어씌움
          // (Race Condition 발생!)
          setData(result); 
        };
    
        fetchData();
    
        // *문제점*: 여기서 이전 요청을 취소하거나 무시하는 로직을 
        // 개발자가 직접 아주 꼼꼼하게 짜지 않으면 버그가 발생함.
      }, [userId]);
    
      if (!data) return <div>로딩 중...</div>;
      return <div>유저 이름: {data.name}</div>;
    }
    ```
    
- 예시 코드 (React-Query를 통해 해결)
    
    ```jsx
    import { useQuery } from '@tanstack/react-query';
    
    function UserProfile({ userId }) {
      const { data, isLoading } = useQuery({
        // 키에 userId를 포함시킴으로써, ID가 바뀌면 별개의 요청으로 취급함
        queryKey: ['user', userId], 
        queryFn: async () => {
          const response = await fetch(`/api/user/${userId}`);
          return response.json();
        },
      });
    
      // userId가 1 -> 2로 바뀌는 순간
      // React Query는 자동으로 1번 요청의 결과가 도착해도 무시하거나
      // AbortSignal을 통해 네트워크 요청 자체를 취소해버림.
    
      if (isLoading) return <div>로딩 중...</div>;
      return <div>유저 이름: {data.name}</div>;
    }
    ```
    

# 참고자료

https://tanstack.com/query/latest/docs/framework/react/quick-start

https://tanstack.com/query/latest/docs/framework/react/devtools

https://tanstack.com/query/latest/docs/framework/react/comparison

https://tanstack.com/query/latest/docs/framework/react/typescript

https://tanstack.com/query/latest/docs/framework/react/guides/queries