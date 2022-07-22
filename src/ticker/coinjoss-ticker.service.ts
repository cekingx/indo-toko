import { Injectable } from '@nestjs/common';
import { IndodaxTickerService } from './indodax-ticker.service';
import { Ticker } from './interface/ticker.interface';
import { TokoTickerService } from './toko-ticker.service';

@Injectable()
export class CoinjossTickerService {
  tickers: Array<Ticker> = [];

  constructor(
    private indodaxTicker: IndodaxTickerService,
    private tokoTicker: TokoTickerService,
  ) {
    this.tickers.push(this.indodaxTicker);
    this.tickers.push(this.tokoTicker);
  }

  async getPrice(coin: string, currency: string) {
    const ticker = await this.getHealtyTicker();

    return ticker.getPrice(coin, currency);
  }

  async getHealtyTicker(): Promise<Ticker> {
    for (let index = 0; index < this.tickers.length; index++) {
      const ticker = this.tickers[index];
      if (await ticker.checkHealth()) {
        return ticker;
      }
    }
  }
}
