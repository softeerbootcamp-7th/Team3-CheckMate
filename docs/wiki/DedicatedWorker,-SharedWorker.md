## 목차

- [Web Workers API](#web-workers-api)
  - [Web Worker의 개념과 활용 방법](#web-worker-concept-and-usage)
  - [워커 스레드 주의사항](#worker-thread-precautions)
  - [워커 스레드와 메인 스레드 간 데이터 교환 방법](#data-exchange-between-worker-and-main-thread)
  - [워커 스레드에서 새로운 워커 생성하기](#creating-new-workers-from-worker-thread)
  - [다양한 워커들](#worker-types)
- [Dedicated Worker](#dedicated-worker)
  - [Dedicated Worker 주요 특징](#dedicated-worker-key-features)
  - [예시](#dedicated-worker-example)
- [Shared Worker](#sharedworker)
  - [언제 쓰면 좋을까 ?](#when-to-use-shared-worker)
  - [Shared Worker의 전역 실행 컨텍스트](#shared-worker-global-scope)
  - [사용 방법](#shared-worker-usage)
  - [예시](#shared-worker-example)
- [고급 버전](#advanced-version)
- [참고](#references)

`Dedicated Worker`와 `Shared Worker` 는 Web Workers API의 인터페이스 중 하나이다. 먼저, Web Worker API에 대해 알아보자 !

<a id="web-workers-api"></a>

# Web Workers API

Web worker는 스크립트 연산을 웹 어플리케이션의 메인 스레드와 분리된 별도의 백그라운 스레드에서 실행할 수 있는 기술이다.

웹 워커를 통해 무거운 작업을 분리된 스레드에서 처리하면 메인 스레드(보통 UI 스레드)가 멈추거나 느려지지 않고 동작할 수 있다

> [!NOTE]
> 워커스레드를 이용한다고 해서 자바스크립트가 멀티스레드로 바뀌는 것이 아니라 **여러 JS 런타임(싱글스레드)** 이 서로 다른 스레드에서 병렬 실행되는 구조가 되는 것이다.

<a id="web-worker-concept-and-usage"></a>

## Web Worker의 개념과 활용 방법

워커는 별도 스레드에서 스크립트를 실행하는 워커 인스턴스로서 `Worker()` 등의 생성자로 생성할 수 있다.

```jsx
const myWorker = new Worker("worker.js");
```

위 worker.js 파일은 현재 `window`와 다른 전역 컨텍스트에서 동작하는 워커 스레드에서 작동한다.

이때, 전역 컨텍스트는 `DedicatedWorker` (단일 스크립트에서만 사용하는 Worker)의 경우 `DedicatedWorkerGlobalScope` 객체이고, `SharedWorker` (여러 스크립트에서 공유하는 워커)의 경우 `SharedWorkerGlobalScope` 객체이다.

<a id="worker-thread-precautions"></a>

## 워커 스레드 주의사항

원하는 자바스크립트 코드 어떤 것이든 워커 스레드에서 실행할 수 있지만, 몇 가지 예외가 있다.

워커에서는 DOM을 직접 조작할 수 없고, `window` 의 일부 메서드와 속성을 사용할 수 없다. 하지만, SSE, fetch, WebSocket과 IndexedDB 등을 포함한 많은 수의 항목은 사용 가능하다

- [워커에서 사용할 수 있는 함수와 클래스](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)

<a id="data-exchange-between-worker-and-main-thread"></a>

## 워커 스레드와 메인 스레드 간 데이터 교환 방법

워커 스레드와 메인 스레드 간의 데이터 교환은 메세지 시스템을 사용한다.

양측 모두 `postMessage()` 메서드를 사용해 전송하고, `onmessage` 이벤트 핸들러를 통해 수신한다. 전송하는 데이터는 복사하며 공유하지 않는다.

<a id="creating-new-workers-from-worker-thread"></a>

## 워커 스레드에서 새로운 워커 생성하기

워커 스레드 역시 새로운 워커 스레드를 생성할 수 있다. 단 생성하려는 워커가 부모 페이지와 동일한 출처에 호스팅되어야 한다. 추가로 워커는 `XMLHttpRequest` 사용해 네트워크 입출력을 할 수 있지만 `responseXML` 과 `channel` 특성은 항상 null을 반환한다

> [!NOTE]
> 워커 스레드에서 새로운 워커 스레드를 생성하면 부모 - 자식 관계가 아닌 새로운 OS 레벨의 스레드가 하나 더 생기는 것이다.

```jsx
// main.js
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");

worker.on("message", (msg) => {
  console.log("Main received:", msg);
});

worker.on("error", console.error);
worker.on("exit", (code) => {
  console.log("Worker exited:", code);
});

// worker.js
const { Worker, parentPort } = require("worker_threads");

const subWorker = new Worker("./subWorker.js");

subWorker.on("message", (msg) => {
  parentPort.postMessage(`Worker received from subWorker: ${msg}`);
});

subWorker.on("error", (err) => {
  parentPort.postMessage(`SubWorker error: ${err.message}`);
});

subWorker.on("exit", (code) => {
  parentPort.postMessage(`SubWorker exited with code ${code}`);
});
```

위 예시에서는 main.js에서 worker.js를 실행할 worker 생성 → worker.js 워커에서 subWorker.js를 실행할 worker를 생성한다.

이 때, worker 워커와 subWorker 워커는 부모 - 자식 관계가 아니라, 서로 독립된 워커스레드 관계이다.

<a id="worker-types"></a>

## 다양한 워커들

- [Dedicated Worker (전용 워커)](https://developer.mozilla.org/en-US/docs/Web/API/Worker)
  - DedicatedWorker는 백그라운드 스레드를 실행할 때 사용한다. DedicatedWorker는 각 브라우저 탭이 가지는 독립적인 워커스레드이다.
- [Shared Worker (공유 워커)](https://developer.mozilla.org/ko/docs/Web/API/SharedWorker)
  - SharedWorker는 워커와 도메인이 같다면 창, IFrame 등 여러 곳에서 작동 중인 다수의 스크립트에서 사용 가능한 워커이다. 스크립트 간 통신은 MessagePort를 통해 이뤄져야 한다.
- [Service Worker (서비스 워커)](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API)
  - 웹 응용 프로그램, 브라우저, 그리고 네트워크 사이의 프록시 서버 역할을 한다. 서버스 워커의 개발 의도는 여러가지가 있지만, 그 중에서도 효과적인 오프라인 경험을 생성하고, 네트워크 요청을 가로채서 네트워크 사용 가능 여부에 따라 적절한 행동을 취하고, 서버의 자산을 업데이트할 수 있다. 또한 푸시 알림과 백그라운드 동기화 API로의 접근도 제공함
- AudioWorker
  - 웹 워커 맥락 내에서 스크립트를 통한 직접적인 오디오 처리 능력을 제공한다.

<a id="dedicated-worker"></a>

# Dedicated Worker

Dedicated Worker는 브라우저에서 제공하는 Web Worker API 중 하나로 메인 스레드(UI 스레드)와는 별도의 백그라운드 스레드에서 JavaScript 코드를 실행하도록 만들어주는 기능이다.

JavaScript는 기본적으로 싱글스레드로 동작한다. 따라서 복잡한 계선, 대용량 데이터 처리, 이미지 영상 연산 등의 작업을 메인 스레드에서 수행할 경우 화면 렌더링이나 사용자 입력 처리가 지연될 수 있다. 이때 Dedicated Worker를 사용하면 이러한 작업을 별도의 스레드로 분리하여 병렬로 실행할 수 있다.

> [!NOTE]
> 위 Web Worker API에서 설명했듯이 Worker 내에서 사용할 수 있는 인터페이스와 함수는 제한돼있다.

<a id="dedicated-worker-key-features"></a>

## Dedicated Worker 주요 특징

1. Dedicated(전용)이라는 이름 그대로, Dedicated Worker를 생성한 스크립트에서만 접근할 수 있다. 다른 탭이나 다른 스크립트와는 공유되지 않는다.

2. 메인 스레드와는 메시지 기반으로만 통신한다. `postMessage`를 통해 데이터를 전달하며, `onmessage` 이벤틀흘 통해 메시지를 수신한다. 기본적으로 메모리는 공유되지 않는다. 필요한 경우 `Transferable Objects` 또는 `SharedArrayBuffer`를 사용하여 데이터를 효율적으로 전달할 수 있다.

3. 워커 내부에서는 DOM에 접근할 수 없다. 즉, 위에서 Web Worker API를 설명할 때, Worker에서 사용할 수 있는 메서드 및 Web API만 사용할 있다. DOM에 접근할 수 없는 이유는 메인 스레드(UI 스레드)와 완전히 분리된 실행 환경이기 때문이다.

4. 각 Dedicated Worker는 독립적인 JavaScript 런타임과 이벤트 루프를 가진다. 따라서 메인 스레드와 워커는 서로의 이벤트 큐에 영향을 주지 않는다.

<img width="369" height="179" alt="image" src="https://github.com/user-attachments/assets/9a5a9bfa-d248-4909-8239-bd6c6532aaff" />

정리하자면, `Dedicated Worker`는 JavaScript의 실행 모델을 멀티스레드 언어로 변경하는 기능이 아니라, 여러 개의 독립적인 JavaScript 런타임을 서로 다른 스레드에서 병렬로 실행할 수 있도록 지원하는 메커니즘이다. 이를 통해 성능을 개선하고 사용자 경험을 향상시킬 수 있다.

<a id="dedicated-worker-example"></a>

## 예시

아래는 무거운 계산(1부터 N까지 합산)을 Dedicated Worker로 분리하는 가장 단순한 예시이다.

```html
<!-- index.html -->
<button id="run">계산 시작</button>
<button id="stop">워커 종료</button>
<p id="result">대기 중...</p>

<script type="module">
  const runButton = document.querySelector("#run");
  const stopButton = document.querySelector("#stop");
  const result = document.querySelector("#result");
  let worker = new Worker("./sum.worker.js", { type: "module" });

  const bindWorkerEvents = () => {
    worker.onmessage = (event) => {
      result.textContent = `결과: ${event.data.sum}`;
      worker.terminate();
      result.textContent += " (자동 종료)";
    };

    worker.onerror = () => {
      result.textContent = "워커 실행 중 오류가 발생했습니다.";
    };
  };

  bindWorkerEvents();

  runButton.addEventListener("click", () => {
    if (!worker) {
      worker = new Worker("./sum.worker.js", { type: "module" });
      bindWorkerEvents();
    }
    result.textContent = "계산 중...";
    worker.postMessage({ limit: 50_000_000 });
  });

  stopButton.addEventListener("click", () => {
    worker?.terminate();
    worker = null;
    result.textContent = "워커를 종료했습니다.";
  });
</script>
```

```js
// sum.worker.js
self.onmessage = (event) => {
  const { limit } = event.data;
  let sum = 0;

  for (let i = 1; i <= limit; i += 1) {
    sum += i;
  }

  self.postMessage({ sum });
  self.close(); // 워커 스레드 내부에서 스스로 종료
};
```

https://github.com/user-attachments/assets/db2f8436-0717-41c0-a79b-f6dc55f73009


핵심은 `worker.postMessage()`로 작업을 요청하고, 워커에서 계산 후 `self.postMessage()`로 결과만 돌려준다는 점이다. 이렇게 하면 계산 중에도 메인 스레드(UI)는 멈추지 않는다.

<a id="sharedworker"></a>

# Shared Worker

`Shared Worker`는 Web Workers API가 제공하는 워커의 한 종류로서, 동일한 출처(origin)를 공유하는 여러 브라우징 컨텍스트(예: 여러 창, 탭, iframe 또는 다른 워커)에서 공유하여 사용할 수 있는 워커 스레드이다. 이를 통해 한 번 생성한 워커를 여러 스크립트가 동시에 참조하고 메시지를 주고받을 수 있다는 점에서 `Dedicated Worker`와 구별된다.

<a id="when-to-use-shared-worker"></a>

## 언제 쓰면 좋을까 ?

`Shared Worker`는 웹 애플리케이션에서 백그라운드 작업을 여러 탭 간 공유해야 하는 경우 유용하다. 예를 들어, 여러 탭이 동일한 데이터를 필요로 하거나 동일한 네트워크 연결(WebSocket 등)을 공유할 필요가 있을 때 `Shared Worker`를 사용하면 리소스를 효율적으로 관리할 수 있다.

<a id="shared-worker-global-scope"></a>

## Shared Worker의 전역 실행 컨텍스트

`Shared Worker`는 별도의 스레드에서 실행되며, 각 브라우징 컨텍스트는 워커와 통신하기 위해 `MessagePort`를 사용한다. 워커 자체는 `SharedWorkerGlobalScope`라는 전역 실행 컨텍스트를 가지며, 브라우저 내부의 메인 스레드와는 독립적으로 동작한다.

> [!NOTE]
> `Dedicated Worker`는 `DedicatedWorkerGlobalScope`라는 전역 실행 컨텍스트를 가진다.

<a id="shared-worker-usage"></a>

## 사용 방법

`Shared Worker`를 생성할 때는 new SharedWorker(scriptURL[, options])와 같은 생성자를 사용한다. 하나의 `Shared Worker`는 동일 출처와 동일한 스크립트 URL(같은 소스파일)을 사용하는 여러 브라우징 컨텍스트 사이에서 공통으로 재사용된다. 이를 위해 각 스크립트는 워커와의 통신을 위해 `worker.port`를 통해 메시지를 주고받는다.

`Shared Worker` 내부에서는 `onconnect` 이벤트를 통해 브라우징 컨텍스트에서 워커에 연결이 이루어진 시점을 감지하고, 연결된 포트를 통해 메시지를 주고받을 수 있다. 이 이벤트는 각각의 브라우징 컨텍스트가 워커로 연결될 때마다 발생한다.

<a id="shared-worker-example"></a>

## 예시

아래 예시는 여러 탭이 접속할 때마다 연결된 클라이언트 수를 공유하는 가장 단순한 형태이다.

```js
// shared-worker.js
const ports = new Set();

onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);

  // 현재 접속자 수를 모든 탭에 브로드캐스트
  const broadcast = () => {
    const count = ports.size;
    for (const p of ports) p.postMessage({ count });
  };

  broadcast();

  port.onmessage = (messageEvent) => {
    if (messageEvent.data?.type === "disconnect") {
      ports.delete(port);
      broadcast();
    }
  };

  port.start();
};
```

```html
<!-- page.html -->
<p id="count">연결된 탭 수: 0</p>

<script>
  const shared = new SharedWorker("./shared-worker.js");
  const port = shared.port;
  const countEl = document.querySelector("#count");

  port.onmessage = (event) => {
    countEl.textContent = `연결된 탭 수: ${event.data.count}`;
  };

  port.start();

  window.addEventListener("beforeunload", () => {
    port.postMessage({ type: "disconnect" });
  });
</script>
```

https://github.com/user-attachments/assets/fa32f68e-1d6c-4eb6-a033-096a58179d77



핵심은 `worker` 자체를 여러 탭이 공유한다는 점이며, 각 탭은 `worker.port`를 통해 메시지를 주고받는다.

<a id="advanced-version"></a>

# 고급 버전

`navigator.hardwareConcurrency`를 통해 사용자의 컴퓨터에서 스레드를 실행하는 데 사용할 수 있는 논리 프로세서의 수만큼의 Dedicated Worker를 생성해서 무거운 작업을 병렬로 처리할 수도 있다고 한다.
([링크](https://blog.rhostem.com/posts/2021-01-03-image-load-by-web-worker))

<a id="references"></a>

# 참고

[MDN - Web Worker API](https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API)
[MDN - Worker](https://developer.mozilla.org/ko/docs/Web/API/Worker)
[MDN - SharedWorker](https://developer.mozilla.org/ko/docs/Web/API/SharedWorker)
