/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('test_order')
  async handleTestUserMessage(message: string) {
    console.log('Received message from ORDER_SERVICE:', message);
    // Process the message as needed
    return new Promise((resolve) => {
      resolve(`Processed message: ${message}`);
    });
  }

  @GrpcMethod('OrderService', 'CreateOrder')
  async createOrder(data: { message: string }) {
    console.log('Received gRPC request to create order with message:', data);
    return new Promise((resolve) => {
      resolve({ results: JSON.parse(data.message) });
    });
    // return { result: `Order created with message: ${data.message}` };
  }
}
