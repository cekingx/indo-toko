import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CoinjossTickerService } from './ticker/coinjoss-ticker.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private coinjossTicker: CoinjossTickerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('price')
  async getPrice() {
    return this.coinjossTicker.getPrice('btc', 'idr');
  }
}
