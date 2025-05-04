import { Body, Controller, Post, SerializeOptions } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    return new RegisterResDTO(await this.authService.register(body))
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    return new LoginResDTO(await this.authService.login(body))
  }
}
