import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Ticker } from './interface/ticker.interface';

@Injectable()
export class TokoTickerService implements Ticker {
  constructor(private httpService: HttpService) {}

  async doRequest(coin: string, currency: string): Promise<any> {
    return lastValueFrom(
      this.httpService.get(
        `https://www.binance.info/api/v3/klines?symbol=${coin.toUpperCase()}${currency.toUpperCase()}&interval=1m&limit=1`,
      ),
    );
  }

  /**
   * use close price
   * https://www.tokocrypto.com/apidocs/#klinecandlestick-data
   */
  async getPrice(coin: string, currency: string): Promise<number> | null {
    if (currency == 'idr') currency = 'bidr';
    const { data } = await this.doRequest(coin, currency);
    const [, , , , close] = data[0];
    if (data.msg) {
      return null;
    }
    console.log('Toko Price');
    return parseFloat(close);
  }

  async checkHealth(): Promise<boolean> {
    const { status } = await lastValueFrom(
      this.httpService.get(
        `https://www.binance.info/api/v3/klines?symbol=BTCBIDR&interval=1m&limit=1`,
      ),
    );

    return status != 200 ? false : true;
  }
}
