import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUserQuery } from '../impls/getall.query';
import { UserService } from 'src/user/user.service';

@QueryHandler(GetAllUserQuery)
export class GetAllUserHandler implements IQueryHandler<GetAllUserQuery> {
  constructor(public readonly userService: UserService) {}

  async execute() {
    return await this.userService.getAll();
  }
}
