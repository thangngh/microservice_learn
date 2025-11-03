import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IOrderService } from './user/interfaces/order.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @MessagePattern('test_user')
  // async handleTestUserMessage(message: string) {
  //   console.log('Received message from USER_SERVICE:', message);

  //   const res = await lastValueFrom(this.orderService.createOrder({ message }));
  //   console.log('Response from ORDER_SERVICE:', res);
  //   // Process the message as needed
  //   return new Promise((resolve) => {
  //     resolve(res);
  //   });
  // }
}
