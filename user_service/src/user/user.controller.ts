/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CreateUserDTO } from './dtos/createuser.dto';
import { CreateUserCommand } from './commands/impls/createuser.command';
import { GetAllUserQuery } from './queries/impls/getall.query';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern('user.create')
  async handleCreateUser(
    @Payload() data: CreateUserDTO,
    @Ctx() context: KafkaContext,
  ) {
    const { username, email, password } = data;

    const cmd = await this.commandBus.execute(
      new CreateUserCommand(username, email, password),
    );

    const originalMessage = context.getMessage();
    const consumer = context.getConsumer();
    const partition = context.getPartition && context.getPartition();
    const topic = context.getTopic && context.getTopic();
    // console.log(
    //   'message pattern _> ) user.create',
    //   originalMessage,
    //   consumer,
    //   partition,
    //   topic,
    // );
    return cmd;
  }

  @MessagePattern('user.getAll')
  async handleGetAllUsers() {
    return await this.queryBus.execute(new GetAllUserQuery());
  }
}
