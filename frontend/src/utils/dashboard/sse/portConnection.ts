import { DASHBOARD_SSE_SHARED_WORKER } from '@/constants/dashboard';

interface IPortConnection {
  port: MessagePort;
  lastPingAt: number;
}

const { MAXIMUM_PING_TIMEOUT } = DASHBOARD_SSE_SHARED_WORKER;

export class PortConnection implements IPortConnection {
  port: MessagePort;
  lastPingAt: number;

  constructor(port: MessagePort) {
    this.port = port;
    this.lastPingAt = Date.now();
  }

  updatePingAt() {
    this.lastPingAt = Date.now();
  }

  isStale() {
    return Date.now() - this.lastPingAt > MAXIMUM_PING_TIMEOUT;
  }
}
