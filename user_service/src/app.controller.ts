import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
interface OrderService {
  createOrder(data: { message: string }): Observable<{ message: string }>;
}

@Controller()
export class AppController implements OnModuleInit {
  private orderService: OrderService;
  constructor(
    private readonly appService: AppService,
    @Inject('ORDER_SERVICE')
    private readonly client: ClientGrpc,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  onModuleInit() {
    this.orderService = this.client.getService<OrderService>('OrderService');
  }

  @MessagePattern('test_user')
  async handleTestUserMessage(message: string) {
    console.log('Received message from USER_SERVICE:', message);

    const res = await lastValueFrom(this.orderService.createOrder({ message }));
    console.log('Response from ORDER_SERVICE:', res);
    // Process the message as needed
    return new Promise((resolve) => {
      resolve(res);
    });
  }
}
