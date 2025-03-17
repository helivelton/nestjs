import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(ipAddress: string | undefined): string {
    if (process.env.PORT) {
      return `Hello World! ${process.env.PORT}. ${process.env.OTHER_ENV_VAR} | ${ipAddress}`;
    }
    return `'Hello World!' ${ipAddress}`;
  }
}
