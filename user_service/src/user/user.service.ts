import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/createuser.dto';
import type { ClientGrpc } from '@nestjs/microservices';
import { IOrderService } from './interfaces/order.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private orderService: IOrderService;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('ORDER_SERVICE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderService = this.client.getService<IOrderService>('OrderService');
  }

  async create(body: CreateUserDTO) {
    const user = this.userRepository.create(body);
    const saved = await this.userRepository.save(user);
    const res = await lastValueFrom(
      this.orderService.createOrder({ message: JSON.stringify(saved) }),
    );

    return { ...saved, orderServiceResponse: res };
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
