/* eslint-disable @typescript-eslint/require-await */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { CreateUserHandler } from './commands/handlers/createuser.handler';
import { GetOneUserHandler } from './queries/handlers/getone.handler';
import { GetAllUserHandler } from './queries/handlers/getall.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CqrsModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'ORDER_SERVICE',
        useFactory: async (/**configService: ConfigService*/) => ({
          transport: Transport.GRPC,
          options: {
            package: 'order',
            protoPath: join(process.cwd(), 'dist/proto/order.proto'),
            url: 'localhost:50052',
          },
        }),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserHandler,
    GetOneUserHandler,
    GetAllUserHandler,
  ],
})
export class UserModule {}
