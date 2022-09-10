import {
  Controller,
  ExecutionContext,
  Get,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from 'src/app.service';

@Controller('google')
export class GoogleController {
  constructor(private appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    return this.appService.googleLogin(req);
  }
}
