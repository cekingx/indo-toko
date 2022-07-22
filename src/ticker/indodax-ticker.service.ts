import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Ticker } from './interface/ticker.interface';

@Injectable()
export class IndodaxTickerService implements Ticker {
  constructor(private httpService: HttpService) {}

  async doRequest(coin: string, currency: string): Promise<any> {
    return lastValueFrom(
      this.httpService.get(
        `https://indodax.com/api/${coin.toLowerCase()}_${currency.toLowerCase()}/ticker`,
      ),
    );
  }

  /**
   * use last price
   * https://github.com/btcid/indodax-official-api-docs/blob/master/Public-RestAPI.md
   */
  async getPrice(coin: string, currency: string): Promise<number> | null {
    const { data } = await this.doRequest(coin, currency);
    if (data.error) {
      return null;
    }
    console.log('Indodax Price');
    return parseFloat(data.ticker.last);
  }

  async checkHealth(): Promise<boolean> {
    const { status } = await lastValueFrom(
      this.httpService.get(`https://indodax.com/api/btc_idr/ticker`),
    );

    return status != 200 ? false : true;
  }
}
