/* eslint-disable @typescript-eslint/await-thenable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'order_service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'order_service_group',
        autoCommit: false,
      },
    },
  });

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'order',
      protoPath: join(__dirname, 'proto/order.proto'),
      url: '0.0.0.0:50052',
    },
  });

  await app.startAllMicroservices();
}
void bootstrap();
