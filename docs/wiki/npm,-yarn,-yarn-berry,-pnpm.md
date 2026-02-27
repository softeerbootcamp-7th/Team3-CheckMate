# npm, yarn, yarn berry, pnpm

# 패키지 매니저란

패키지 매니저는 프로그래밍에 필요한 라이브러리를 관리하는 역할을 하며, 다음과 같은 역할을 한다.

1. 의존성 관리
    - 필요한 다른 프로그램을 자동으로 찾아 설치해준다.
2. 버전 관리
    - 특정 버전의 프로그램을 설치하거나 업데이트할 수 있게 해준다
3. 편리한 설치 및 업데이트
    - 명령어 하나로 여러 프로그램을 쉽게 설치하거나 최신 상태로 업데이트 가능
4. 보안 관리
    - 패키지가 신뢰할 수 있으며, 손상되지 않음을 보장함
5. 일관성 유지
    - 개발자 모두가 동일한 프로그램 버전과 설정을 사용할 수 있게 해줌

언어별 대표 패키지 매니저는 다음과 같다.

| java | maven, gradle |
| --- | --- |
| javascript | npm, yarn, pnpm |
| python | pip, conda |

# npm

node.js를 설치하면 기본적으로 설치되는 javascript 패키지 매니저이다. 보통 npm은 `node package manager` 의 줄임말로 알려져 있지만 npm은 그 자체로 하나의 단어라고 한다. ([링크](https://github.com/npm/cli#is-npm-an-acronym-for-node-package-manager))

javascript 프로젝트를 처음 시작하면, `npm init -y` 혹은 `npm init` 을 통해 package.json을 프로젝트 디렉토리에 생성할 수 있다.

## package.json

보통의 package.json의 구조는 다음과 같다.

```
{
  "name": “name”
  "version": “1.0.0”,
  "description": “Javascript program project”,
  "scripts": {
    “test”: "gulp dev --gulpfile gulp-tasks"
  },
  "author": "",
  "devDependencies": {},
  "dependencies": {}
}
```

- name: 프로젝트의 이름으로, npm 배포 시 version과 함께 필수 항목이다.
- version: 프로젝트 버전을 정의한다.
- description: 프로젝트의 설명으로, npm search로 검색된 리스트에 표시되기 때문에 패키지를 찾아내고 이해하는데 도움이 된다.
- author: 프로젝트 작성자 정보로, 한 명만 지원한다.

### scripts

여러 가지 npm 명령어에 대한 스크립트이다.

객체의 키는 이벤트, 값을 실행될 커맨드로 설정하여, 터미널에 명령어로 키를 입력하여 해당 스크립트를 실행할 수 있다.

`npm run dev`, `npm run build` 등..

```java
"scripts": {
        "dev": "vite",
        "start": "vite",
        "build": "tsc -b && vite build",
        "preview": "vite preview",
        "test": "vitest",
        "coverage": "vitest run --coverage",
        "lint": "eslint .",
        "lint:fix": "eslint . --fix",
        "format": "prettier --write '**/*.{js,jsx,ts,tsx}'",
        "format:check": "prettier --check '**/*.{js,jsx,ts,tsx}'",
        "prepare": "husky",
        "lint-staged": "lint-staged",
        "ts:check": "tsc --noEmit"
    },
```

### dependencies

프로젝트 의존성 관리를 위한 부분으로 애플리케이션을 설치할 때, 이 내용을 참조하여 필요한 확장 모듈을 자동으로 설치한다.

프로젝트 런타임에 필요한 패키지를 정의한다.

### devDependencies

프로젝트 개발 환경에서만 필요한 패키지를 정의한다.

## npm의 장점

최대 규모의 패키지 레지스트리, 활성화된 커뮤니티가 많고 높은 접근성을 가진다.

Node.js에 기본 내장되어 있어 따로 설치하지 않아도 된다.

## npm의 단점

npm은 node.js 설치 시에 기본으로 제공되어 범용적으로 사용되고 있으나, 비효율적이거나 깨져 있는 부분이 많다.

<img width="1000" height="420" alt="image" src="https://github.com/user-attachments/assets/fffcf339-45dd-4e23-b964-92f3004073ad" />

### 비효율적인 의존성 검색

npm은 파일 시스템을 이용하여 의존성을 관리한다. `node_modules` 폴더를 이용하는 것이 특징인데, 이렇게 관리했을 때 의존성 검색은 비효율적으로 동작한다

예를 들어, thatzfit-fe 디렉토리에서 `require()` 문을 이용하여 react 패키지를 불러오는 상황을 들겠다.

라이브러리를 찾기 위해 순회하는 디렉토리의 목록을 확인하려고 할 때, node.js에서 제공하는 `require.resolve.paths()` 함수를 사용할 수 있다. 이 함수는 NPM이 검색하는 디렉토리의 목록을 반환한다.

```java
PS C:\Users\xingx\ThatzFit-FE> node
Welcome to Node.js v22.17.0.
Type ".help" for more information.
> require.resolve.paths('react')
[
  'C:\\Users\\xingx\\ThatzFit-FE\\repl\\node_modules',
  'C:\\Users\\xingx\\ThatzFit-FE\\node_modules',
  'C:\\Users\\xingx\\node_modules',
  'C:\\Users\\node_modules',
  'C:\\node_modules',
  'C:\\Users\\xingx\\.node_modules',
  'C:\\Users\\xingx\\.node_libraries',
  'C:\\Program Files\\nodejs\\lib\\node',
  'C:\\Users\\xingx\\.node_modules',
  'C:\\Users\\xingx\\.node_libraries',
  'C:\\Program Files\\nodejs\\lib\\node'
]
```

목록에서 확인할 수 있는 것처럼, NPM은 패키지를 찾기 위해서 계속 상위 디렉토리의 node_modules 폴더를 탐색한다. 따라서 패키지를 바로 찾지 못할수록 readdir, stat과 같은 느린 I/O 호출이 반복된다.

<aside>
💡

readdir, stat은 유닉스 및 리눅스 환경에서 파일 시스템을 다룰 때 사용하는 대표적인 시스템 콜 혹은 라이브러리 함수임

주로 파일 목록 조회, 파일의 세부 정보를 파악하는 데 사용됨

</aside>

경웨에 따라서 I/O 호출이 중간에 실패하기도 한다.

Typescript 4.0까지는 node_modules를 이용한 패키지 탐색이 너무 비효율적인 나머지, 패키지를 처음으로 import하기 전까지 node_modules 내부의 타입 정보를 탐색하지 않기도 했다.

### 환경에 따라 달라지는 동작

NPM은 패키지를 찾지 못하면 상위 디렉토리의 node_modules 폴더를 계속 탐색한다. 해당 특성 떄문에 어떤 의존성을 찾을 수 있는지는 해당 패키지의 상위 디렉토리 환경에 따라서 달라진다.

예를 들어, 상위 디렉토리가 어떤 node_modules를 포함하고 있는지에 따라 의존성을 불러올 수 있기도 하고, 없기도 하다. 다른 버전의 의존성을 잘못 불러올 수도 있다.

이렇게 환경에 따라 동작이 변하는 것은 좋지 않다. 문제 발생 시 해당 문제를 재현하기 어렵기 때문이다.

### 비효율적인 설치

NPM에서 구성하는 node_modules 디렉토리 구조는 매우 큰 공간을 차지한다. 일반적으로 간단한 CLI 프로젝트도 수백 메가바이트의 node_modules 폴더가 필요하다. 용량만 많이 차지할 뿐 아니라 큰 node_modules 디렉토리 구조를 만들기 위해서는 많은 I/O 작업이 필요하다.

또한, 서로 다른 두 개의 패키지가 같은 의존성 패키지의 서로 다른 버전을 사용한다면 어떻게 될까?

node_modules에는 같은 이름의 패키지가 설치되지 않는다. 먼저 설치된 의존성 패키지는 냅둔다. 그리고 새롭게 설치된 패키지 내부에 node_modules를 새롭게 만들어서 의존성 패키지를 설치한다.

예를 들어, 수백 개의 패키지가 서로를 의존하는 복잡하느 의존성 트리에서 node_modules 디렉토리 구조는 깊어진다.

이렇게 깊은 트리 구조에서 의존성이 잘 설치되어 있는지 검증하려면 많은 수의 I/O 호출이 필요하다. 일반적으로 디스크 I/O 호출은 메모리 상의 자료구조를 다루는 것보다 휠씬 느리다. 이런 문제로 인해 Yarn v1이나 NPM은 기본적인 의존성 트리의 유효성만 검증하고, 각 패키지의 내용이 올바른지는 확인하지 않는다.

### 유령 의존성 (Phantom Dependency)

예를 들어, 내가 설치한 패키지 A가 내부적으로 패키지 B를 사용한다면 구조는 다음과 같다.

```tsx
node_modules/
└── A/
    └── node_modules/
        └── B/
```

하지만 이런 방식은 똑같은 패키지 B를 여러 곳에서 사용할 경우 중복 설치가 발생하여 용량이 커지고 구조가 복잡해진다.

이를 해결하기 위해 NPM과 Yarn v1에서는 중복해서 설치되는 node_modules를 방지하기 위해 호이스팅 (hoistiong, 끌어올리기) 기법을 사용한다.

즉, 하위 의존성들을 최상위 node_modules로 끌어올려 평탄화하는데, 이를 호이스팅이라 하는 것이다.

<img width="1024" height="458" alt="image 1" src="https://github.com/user-attachments/assets/0353a3d3-4b86-40f5-be37-f901dde760a5" />

예를 들어, 의존성 트리가 왼쪽의 모습을 하고 있다고 가정하자

왼쪽 트리에서 [A (1.0)]과 [B(1.0)] 패키지는 두 번 설치되므로 디스크 공간을 낭비한다. NPM과 Yarn v1에서는 디스크 공간을 아까기 위해 왼쪽 트리를 오른쪽 트리처럼 바꾸는 것이다.

이 때 유령 의존성이라는 것이 발생한다.

유령 의존성이란 내가 `package.json` 에 직접 명시하지 않았는데도 불구하고 코드에서 불러와 (import/require) 사용할 수 있는 현상을 말한다.

발생 원인은 다음과 같다.

- 호이스팅으로 인해 하위 패키지들이 최상위 `node_modules`로 올라오면서, Node.js의 모듈 탐색 알고리즘에 의해 해당 패키지들을 직접 참조할 수 있게 되는 것이다.

⇒ 본인이 설치하지 않은 라이브러리를 사용해도 문제가 되지 않지만, 실제로는 의존성 목록에 존재하지 않는 유령 같은 상태인 것이다.

유령 의존성으로 생기는 문제는 다음과 같다.

단기적으로는 편리해보일 수 있지만, 프로젝트가 커지면 심각한 문제를 일으킬 수 있다.

1. 의존성 실종
    - 만약 내가 `npm install` , `yarn add` 하지 않은 패키지를 사용하고 있는 상황(유령 패키지를 사용하고 있음)에서 해당 패키지에 의존하고 있는 직접 설치한 패키지(`package.json`에 명시된 패키지)를 업데이트하거나 삭제하였을 때, 그 유령 패키지도 함께 사라지거나 버전이 바뀔 수 있다. 이 때 내 코드는 아무 이유 없이 갑자기 동작하지 않게 된다.
2. 비결정적 빌드 (Non-deterministic)
    - 환경에 따라 혹은 설치 순서에 따라 호이스팅되어 생성된 의존성 트리의 모양이 달라질 수 있다. 이로 인해 내 컴퓨터에서는 돌아가는데 동료의 컴퓨터나 CI/CD 서버 환경에서는 “Module Not Found” 에러가 발생할 수 있다.
3. 버전 충돌
    - 여러 패키지가 서로 다른 버전의 동일한 하위 의존성을 가질 경우, 어떤 버전이 최상위로 호이스팅될 지 예측하기 어렵다.

<aside>
💡

또한 호이스팅(평탄화 알고리즘)을 하는 과정에서 의존성을 해석하는 시간이 오래 걸려 프로젝트의 규모가 커지고 의존성이 많아질수록, 평탄화 알고리즘은 눈에 띄게 느려지며 전체 설치 시간을 지연시키는 원인이 된다.

</aside>

# Yarn

yarn은 2016년 페이스북에서 npm의 보안 및 성능 문제 등을 개선하여 npm을 대체하기 위해 개발된 새로운 패키지 매니저이다.

npm과 같은 기능을 수행하나, npm 레지스트리와 호환되면서 속도나 안정성 측면에서 npm보다 향상되었다.

## Yarn 장점

### npm에 비해 더 빠른 설치 속도

npm은 패키지를 한 번에 하나씩 순차적으로 설치하지만, yarn은 여러 패키지를 동시에 가져오고 설치하도록 최적화되어 있어 패키지 설치 속도 측면에서 yarn이 npm보다 빠르다.

<aside>
💡

다운로드 속도의 경우, npm 5.0 아래 버전으로 놓고 봤을 때의 문제이다. npm 6.10.1과 yarn 1.17.3 버전으로 설치 속도를 비교하였을 때 yarn이 더 빨랐지만, 아주 근소한 차이라고 한다.

</aside>

### 로컬 캐싱

yarn은 한 번 다운로드한 패키지는 로컬 캐시에 저장하여, 이후 설치 시 오프라인에서도 매우 빠르게 설치할 수 있다.

npm도 캐시를 사용하지만 Yarn에 비해 다소 비효율적일 수 있다고 한다.

### 보안

npm보다 yarn이 보안 측면이 더 안전한 것으로 알려져 있다.

NPM은 자동으로 패키지에 포함된 다른 패키지 코드를 실행하는 특징이 있는데, 이 특징은 편리하지만 안정성을 위협할 수 있다. 이런 보안 취약점으로 인해 심각한 문제가 발생할 수 있다.

Yarn은 결정적 설치(Deterministic install)를 강조했다. 어떤 환경에서 설치하든 `yarn.lock` 파일 덕분에 항상 정확히 동일한 의존성 구조를 갖도록 보장한다.

그래서 npm보다 yarn이 더 보안적으로 안전하다는 결과가 있다.

<aside>
💡

최근에는 npm은 `npm audit` 을 통해 취약점을 점검해준다.

</aside>

## Yarn 단점

### 많은 양의 디스크 용량 사용

Yarn은 npm보다 디스크 용량을 더 많이 잡아먹는다고 한다.

### 유령의존성

Yarn v1도 npm과 마찬가지로 호이스팅을 활용하기에 유령의존성 문제가 존재한다

# Yarn Berry

yarn v2 이상의 modern version yarn을 이르는 명칭이다.

기존의 yarn v1은 yarn classic이라고 부르게 되었다.

## 특징

### Plug’n’Play

Plug’n’Play는 yarn berry가 제공하는 새로운 패키지 관리 시스템이다.

기존의 무거웠던 node_modules 대신, 패키지들에 대한 정보는 `.zip` 파일로 압축하여 `.yarn/cache` 폴더에 저장하고 이를 찾기 위한 정보를 `.pnp.cjs` 파일에 생성 후 의존성 트리 정보를 단일 파일에 저장한다.

이를 인터페이스 링커 (Interface Linker)라고 한다.

<img width="1024" height="573" alt="image 2" src="https://github.com/user-attachments/assets/e62e88f2-4c4e-4910-86be-5232c5187f09" />

아래는 pnp.cjs의 일부이다.

```tsx
/* react 패키지 중에서 */
["react", [
  /* npm:17.0.1 버전은 */
  ["npm:17.0.1", {
    /* 이 위치에 있고 */
    "packageLocation": "./.yarn/cache/react-npm-17.0.1-98658812fc-a76d86ec97.zip/node_modules/react/",
    /* 이 의존성들을 참조한다. */
    "packageDependencies": [
      ["loose-envify", "npm:1.4.0"],
      ["object-assign", "npm:4.1.1"]
    ],
  }]
]],

```

위와 같이 `.pnp.cjs` 는 의존성 트리를 중첩된 맵으로 표현한다. 기존 Node가 파일시스템에 접근하여 직접 I/O를 실행하던 require문의 비효율을 메모리에 자료구조를 올리는 방식으로 탐색을 최적화했다.

이 때문에 PnP API를 이용하여 의존성 관리를 하고 있을 때에는 `node` 명령어 대신 `yarn node` 명령어를 사용해야 한다.

```bash
yarn node
```

### Zero-install

Plug’n’Play 전략으로 무거웠던 node_modules를 획기적으로 제거하고 옮긴 덕분에 이를 이용해 의존성까지 github에 올릴 수 있게 되었다.

github는 파일 당 최대 용량을 500MB로 제한하고, 원활한 이용을 위해 저장소당 1GB 미만의 크기를 유지할 것을 권장하고 있다.

yarn berry를 통해 만든 의존성 폴더는 어지간히 크지 않은 이상 200MB를 넘지 않는다. 덕분에 `git clone` 이후 별도의 설치가 필요 없이, 바로 사용할 수 있도록 하는 zero-install을 시도할 수 있다.

zero-install을 사용할 경우, 로컬에서의 귀찮음도 줄어들지만, CI/CD 시 더 큰 효과를 볼 수 있다. clone 이후 곧바로 빌드가 가능해진 덕분에 배포까지 걸리는 속도가 대폭 단축된다.

### 향상된 성능

Yarn Berry는 캐시, 병렬 설치 등을 통해 패키지 설치 속도를 비약적으로 개선했다. 또한 yarn install 시 불필요한 파일을 걸러내는 immutable 옵션을 사용해 설치 과정에서 오류를 최소화하고 성능을 극대화했

## 단점

### Git에 대한 지속적인 부하

Yarn PnP는 .yarn/cache 폴더에 많은 의존성 파일을 저장하며, 이를 Git에 포함시키면 저장소의 크기가 커져 clone, push/pull 작업에 부하를 줄 수 있다.

### 복잡한 설정 및 사용성 저하

Yarn Berry는 PnP와 같은 새로운 기능을 도입하면서 설정이 복잡해졌다.

https://octoping.tistory.com/47

해당 블로그에 다양한 yarn berry를 도입하면서 겪은 트러블 슈팅 경험들이 많이 있다.

### PnP 미지원 라이브러리

일부 라이브러리들은 내부적으로 당연히 `node_modules`가 있는 것을 가정하고 경로를 직접 참조합니다. 이런 라이브러리들은 PnP 모드에서 작동하지 않아 별도의 설정(packageExtension)이 필요할 수 있다.

# PNPM

yarn과 npm 대안으로 출시된 pnpm(performant npm)은 말 그대로 효율적인 npm이라는 뜻이다.

<img width="246" height="138" alt="image 3" src="https://github.com/user-attachments/assets/e6f1d262-733c-414b-8422-6309243b992c" />

pnpm은 기존 yarn과 npm의 공통적인 문제인 유령 의존성과 비효율적인 디스크 사용량과 속도 문제를 해결하기 위해 등장했다.

## 장점

### 패키지 저장 방식의 혁신: 디스크 공간 효율화

npm의 가장 큰 단점 중 하나는 모든 프로젝트마다 node_modules 폴더에 패키지 전체를 복사해서 저장한다는 점이다. 이는 심각한 디스크 공간 낭비를 유발한다.

pnpm은 이 문제를 ‘전역 저장소(global store)`와 심볼릭 링크(symbolic link)라는 2가지 개념으로 해결한다.

쉽게 말해, npm이 프로젝트마다 필요한 책을 일일이 복사해서 쌓아두는 복사기라면, pnpm은 중앙에 거대한 도서관을 짓고 각 프로젝트에는 책의 위치만 알려주는 바로가기를 만들어주는 방식이다.

**전역 저장소**

pnpm은 모든 패키지를 컴퓨터의 특정 공간에 단 한번만 저장한다.

<img width="830" height="902" alt="image 4" src="https://github.com/user-attachments/assets/66ef4d21-c05d-4abf-8458-8334cf50ad74" />

```bash
pnpm store path
```

위 명령어를 통해 pnpm의 global store 전체 경로를 알 수 있다.

**Content Addressable Storage, CAS**

pnpm이 어떻게 디스크 공간을 획기적으로 절약하는지 더 자세하게 알아보자. pnpm은 디스크 공간 절약을 위해 콘텐츠 주소 지정(Content-Addressable Storage, CAS)를 활용한다.

기존의 파일 시스템은 파일의 이름이나 위치를 기반으로 파일을 찾아간다. 반면, CAS는 파일의 내용 자체를 기반으로 주소를 지정하는 방식이다.

지구 상에는 수많은 홍길동이라는 이름의 사람이 있지만, 모든 사람의 지문은 저마다 고유하다. CAS는 파일의 이름을 홍길동이라 보지 않고, 파일의 내용을 분석하여 만들어낸 고유한 지문(해시 값)으로 파일을 식별하고 저장한다.

pnpm은 설치하려는 모든 패키지 파일의 내용을 해시 함수로 분석하여 파일마다 고유한 해싱된 주소값을 부여한다.

이 방식의 가장 큰 장점은 파일의 내용이 100% 동일하다면, 파일 이름이나 버전이 달라도 항상 동일한 해시값을 갖게 된다는 점이다.

예를 들면, 프로젝트 A와 B가 lodash 라이브러리의 동일한 버전을 사용한다고 가정한다.

npm은 A와 B 프로젝트 각각에 lodash 파일 복사본을 만들어 두 프로젝트에 동일한 파일을 생성한다.

pnpm은 lodash 파일들의 내용을 확인하고, 이미 중앙 저장소에 동일한 지문의 파일이 있음을 인지한다. 그 후, 파일을 복사하는 대신 해당 해싱된 주소를 가리키는 링크만 생성한다. (동일한 파일 1개 + 링크 2개)

pnpm은 CAS 방식을 통해 여러 프로젝트에서 동일한 패키지를 사용할 때 불필요한 사본을 만들지 않고 단 하나의 원본 파일로 모든 것을 관리한다.

위 방식이 pnpm이 디스크 공간을 압도적으로 효율적으로 사용하는 핵심 비결이다.

### 유령 의존성 해결 : 심볼**릭 링크**

<img width="970" height="902" alt="image 5" src="https://github.com/user-attachments/assets/21c1ea97-e4e7-4b19-ae73-f1f08ebff7ad" />

여러 프로젝트에서 동일한 패키지를 필요로 할 경우, 파일을 복사하는 대신 전역 저장소에 있는 원본을 가리키는 바로가기 (심볼릭 링크)만 생성한다. 위 사진에서 화살표 표시가 심볼릭 링크 표시이다.

이렇게 pnpm은 npm의 유령 의존성을 심볼릭 링크를 활용한 비평탄화 구조로 해결하였다.

<aside>
💡

심볼릭 링크는 파일 시스템에서 특정 파일이나 디렉토리의 위치를 가리키는 참조 역할을 하는 특별한 파일을 의미한다.

쉽게 말해, 심볼릭 링크는 원본 파일이나 폴더에 대한 ‘바로 가기’ 같은 것이다.

심볼릭 링크를 열거나 접근하면 실제로는 원본 파일이나 폴더가 열리거나 접근된다.
이를 통해, 동일한 파일이나 폴더를 여러 위치에서 사용할 수 있으면서, 실제로는 한 곳에만 저장되어 디스크 공간을 절약하고 관리 효율성을 높여준다.

</aside>

## 단점

### 심볼릭 링크 호환성 문제

일부 오래된 도구나 특정 환경 (일부 람다 배포 환경, 과거의 RN 특정 버전)에서는 심볼릭 링크로 연결된 모듈을 제대로 인식하지 못하고 “Module Not Found” 에러를 낼 수 있다.

### 엄격함으로 인한 불편함

npm에서는 대충 돌아가던 코드가 pnpm에서는 “패키지가 정의되지 않았다”며 에러가 날 수 있다. 유령 패키지를 사용하지 못한다.

### 파일 시스템의 복잡성

node_modules 내부를 직접 열어보면 실제 파일 대신 수많은 링크 화살표가 보인다. 구조가 꽤 복잡하게 얽혀 있어, 내부 구조를 직접 분석하려는 개발자에게는 혼란을 줄 수 있다.

# 참고 사이트

https://toss.tech/article/node-modules-and-yarn-berry

https://velog.io/@remon/npm-vs-yarn-vs-yarn-berry

https://html-jc.tistory.com/676

https://homebody-coder.tistory.com/entry/%ED%8C%A8%ED%82%A4%EC%A7%80%EB%A7%A4%EB%8B%88%EC%A0%80%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-NPM-YARN-YARN-BERRY-PNPM

https://velog.io/@rladmlduq47/Symbolic-Link-Hard-Link%EB%9E%80

https://yceffort.kr/2022/05/npm-vs-yarn-vs-pnpm#%EC%84%A0%EA%B5%AC%EC%9E%90-npm

https://shape-coding.tistory.com/entry/IT-npm-vs-yarn%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90

https://covenant.tistory.com/300

https://yjoo-anywhere.tistory.com/59

https://dev-blackcat.tistory.com/44

https://south-dev.tistory.com/10

https://gemini.google.com/share/1c8d1f2a4ad0