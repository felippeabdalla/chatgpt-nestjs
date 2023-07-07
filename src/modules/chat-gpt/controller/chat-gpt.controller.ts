import { Body, Controller, Post } from '@nestjs/common';
import { ChatGptService } from '../service/chat-gpt.service';
import { CreateChatgptDto } from '../dto/create-chat-gpt.dto';
import { ChatGptResponse } from '../dto/response-chat-gpt.dto';

@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Post('prompt')
  async sendMessage(
    @Body() createChatgptDto: CreateChatgptDto,
  ): Promise<ChatGptResponse> {
    const response = await this.chatGptService.generateText(createChatgptDto);
    return response;
  }
}
