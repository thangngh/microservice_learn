/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';
import { CreateUserDTO } from './dto/user/createuser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test-user')
  async testUser(@Body('message') message: string) {
    // return this.appService.testUserServiceMessage(message);
    const response = await firstValueFrom(
      this.appService.testUserServiceMessage(message),
    );
    return response;
  }

  @Post('test-order')
  testOrder(@Body('message') message: string) {
    return this.appService.testOrderServiceMessage(message);
  }

  @Post('create-user')
  async createUser(@Body() body: CreateUserDTO) {
    const response = await firstValueFrom(this.appService.createUser(body));

    return response;
  }

  @Get('get-all-users')
  async getAllUsers() {
    const response = await firstValueFrom(this.appService.getAllUsers());

    return response;
  }
}
