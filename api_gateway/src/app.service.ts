import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: ClientKafka,
    @Inject('ORDER_SERVICE')
    private readonly orderService: ClientKafka,
  ) {}

  onModuleInit() {
    this.userService.subscribeToResponseOf('test_user');
  }

  getHello(): string {
    return 'Hello World!';
  }

  testOrderServiceMessage(message: string) {
    return this.orderService.emit('test_order', message);
  }

  testUserServiceMessage(message: string) {
    return this.userService.send('test_user', message);
  }
}
