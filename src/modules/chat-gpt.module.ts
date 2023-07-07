import { Module } from '@nestjs/common';
import { ChatGptController } from './chat-gpt/controller/chat-gpt.controller';
import { ChatGptService } from './chat-gpt/service/chat-gpt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ChatGptController],
  providers: [ChatGptService],
})
export class ChatGptModule {}
