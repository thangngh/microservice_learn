/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public password!: string;
}
