/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetOneUserParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public userId!: string;
}
