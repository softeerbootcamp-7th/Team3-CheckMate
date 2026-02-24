/// <reference types="vite-plugin-svgr/client" />

declare module '*?worker' {
  const workerConstructor: new () => Worker;
  export default workerConstructor;
}

declare module '*?sharedworker' {
  const workerConstructor: new () => SharedWorker;
  export default workerConstructor;
}
