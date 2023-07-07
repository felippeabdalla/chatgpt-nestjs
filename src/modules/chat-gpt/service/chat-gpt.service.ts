import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateChatgptDto } from '../dto/create-chat-gpt.dto';
import { ChatGptResponse } from '../dto/response-chat-gpt.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatGptService {
  constructor(private configService: ConfigService) {}

  async generateText({ prompt }: CreateChatgptDto) {
    try {
      const response = await axios.post<ChatGptResponse>(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Falha ao gerar texto',
        error.response,
        error.status,
      );
    }
  }
}
