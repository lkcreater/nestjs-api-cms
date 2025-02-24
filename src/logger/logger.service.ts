import { Injectable } from '@nestjs/common';
@Injectable()
export class LoggerService {
  private sessionId!: string;

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  getSessionId(): string {
    return this.sessionId;
  }
}
