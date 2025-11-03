import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impls/createuser.command';
import { UserService } from 'src/user/user.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(public readonly userService: UserService) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const cmd = await this.userService.create(command);

    return cmd;
  }
}
