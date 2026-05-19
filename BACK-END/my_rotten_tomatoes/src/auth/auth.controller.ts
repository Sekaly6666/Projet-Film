import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authentificated.guard';
import * as Express from 'express';
import { use } from 'passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Render('auth/login')
  formulaireLogin() {
    return {};
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res: Express.Response) {
    return res.redirect('/');
  }

  @Get('register')
  @Render('auth/register')
  formulaireRegister() {
    return {};
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Express.Response,
  ) {
    try {
      await this.authService.register(registerDto);
      return res.redirect('/auth/login');
    } catch (err: any) {
      return res.render('auth/register', { error: err.message });
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  @Render('profile')
  getProfile(@Request() req: any) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  logout(@Request() req: any, @Res() res: Express.Response) {
    req.logout((err: any) => {
      if (err) {
        return res.redirect('/');
      }

      req.session.destroy(() => {
        res.clearCookie('connect.sid');

        res.redirect('/');
      });
    });
  }
}
