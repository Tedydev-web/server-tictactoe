import { Exclude } from 'class-transformer'
import { IsString } from 'class-validator'

export class LoginBodyDTO {
  @IsString()
  email: string
  @IsString()
  password: string
}

export class LoginResDTO {
  accessToken: string
  refreshToken: string

  constructor(partial: Partial<LoginResDTO>) {
    Object.assign(this, partial)
  }
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string
  @IsString()
  confirmPassword: string
}

export class RegisterResDTO {
  id: number
  email: string
  name: string
  @Exclude()
  password: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial)
  }
}
