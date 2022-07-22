import { Module } from '@nestjs/common';
import { TickerController } from './ticker.controller';
import { CoinjossTickerService } from './coinjoss-ticker.service';
import { IndodaxTickerService } from './indodax-ticker.service';
import { TokoTickerService } from './toko-ticker.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TickerController],
  providers: [CoinjossTickerService, IndodaxTickerService, TokoTickerService],
  exports: [CoinjossTickerService],
})
export class TickerModule {}
