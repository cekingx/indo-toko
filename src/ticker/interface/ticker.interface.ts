export interface Ticker {
  getPrice(coin: string, currency: string): Promise<number> | null;
  checkHealth(): Promise<boolean>;
}
