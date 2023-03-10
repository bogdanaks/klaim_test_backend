/* eslint-disable indent */
import { IsEmail, IsString, MaxLength } from "class-validator"

export class RegisterDTO {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string

  @IsString()
  @MaxLength(255)
  password: string

  @IsString()
  @MaxLength(255)
  fullname: string
}
