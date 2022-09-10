import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TickerModule } from './ticker/ticker.module';
import { GoogleController } from './google/google.controller';
import { GoogleStrategy } from './auth/google.strategy';

@Module({
  imports: [TickerModule],
  controllers: [AppController, GoogleController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
