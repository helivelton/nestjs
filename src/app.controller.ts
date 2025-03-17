import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './services/database/database.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  getHello(@Req() request: Request): string {
    const ipAddress = request.ip;
    return this.appService.getHello(ipAddress);
  }

  @Get('test-connection')
  async testConnection() {
    await this.databaseService.testConnection();
    return 'Connection test successful';
  }
}
