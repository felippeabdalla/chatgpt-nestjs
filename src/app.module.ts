import { Module } from '@nestjs/common';
import { ChatGptModule } from './modules/chat-gpt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChatGptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
