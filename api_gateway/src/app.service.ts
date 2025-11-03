import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { ClientKafka } from '@nestjs/microservices';
import { ICreateUser } from './interface/user/user.interface';

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
    this.userService.subscribeToResponseOf('user.create');
    this.userService.subscribeToResponseOf('user.getAll');
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

  createUser(body: ICreateUser) {
    return this.userService.send('user.create', body);
  }

  getAllUsers() {
    return this.userService.send('user.getAll', {});
  }
}
