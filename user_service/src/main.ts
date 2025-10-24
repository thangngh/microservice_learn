import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user_service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user_service_group',
        autoCommit: false,
      },
    },
  });
  await app.listen();
}
void bootstrap();
