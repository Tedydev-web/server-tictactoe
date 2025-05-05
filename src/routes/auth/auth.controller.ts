import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginBodyDTO, LoginResDTO, LogoutBodyDTO, LogoutResDTO, RefreshTokenBodyDTO, RefreshTokenResDTO, RegisterBodyDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    // return new RegisterResDTO(await this.authService.register(body))
    return await this.authService.register(body)
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    return new LoginResDTO(await this.authService.login(body))
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    console.log('123')
    return new RefreshTokenResDTO(await this.authService.refreshToken(body.refreshToken))
  }

  @Post('logout')
  async logout(@Body() body: LogoutBodyDTO) {
    return new LogoutResDTO(await this.authService.logout(body.refreshToken))
  }
}
