import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { VerifyUserDto } from './dto/verify.user.dto';
import { ResendVerifyUserDto } from './dto/resend.verify.user.dto';
import { ChangePasswordDto } from './dto/change.password.dto';
import { ForgotPassDto } from './dto/forgot.pass.dto.';
import { ForgotChangePassDto } from './dto/forgot.change.pass.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook.auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {

  }


  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req) {
    // handles the Google OAuth2 callback
    return req.user;
  }

  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  facebookLogin() {
    // initiates the Facebook login flow
  }

  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  facebookLoginCallback(@Req() req) {
    // handles the facebook callback
    return req.user;
  }


  @Post('register')
  register(@Body() userDto: RegisterUserDto) {
    return this.authService.registerUser(userDto);
  }

  @HttpCode(200)
  @Post('verify')
  verifyEmail(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyUserEmailToken(verifyUserDto);
  }

  @HttpCode(200)
  @Post('verify/resend')
  resendVerificationEmail(@Body() resendVerifyUserDto: ResendVerifyUserDto) {
    return this.authService.resendEmailVerificationToken(resendVerifyUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    changePasswordDto.user = req.user;
    return this.authService.changePassword(changePasswordDto);
  }

  @HttpCode(200)
  @Post('forgot-password')
  forgotPassword(@Body() forgotPassDto: ForgotPassDto) {
    return this.authService.forgotPassword(forgotPassDto);
  }

  @HttpCode(200)
  @Post('forgot-password/change')
  changeForgottenPassword(@Body() forgotChangePassDto: ForgotChangePassDto) {
    return this.authService.changeForgottenPassword(forgotChangePassDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
