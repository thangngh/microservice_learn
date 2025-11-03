import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneUserQuery } from '../impls/getone.query';
import { UserService } from 'src/user/user.service';

@QueryHandler(GetOneUserQuery)
export class GetOneUserHandler implements IQueryHandler<GetOneUserQuery> {
  constructor(public readonly userService: UserService) {}

  async execute(query: GetOneUserQuery) {
    console.log('GetOneUserQuery executed', query);
    return new Promise((resolve) => resolve(null));
  }
}
