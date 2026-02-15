import { Module } from '@nestjs/common';
import { OpenAIController } from './infrastructure/controllers/openAI.controller';
import { OpenAIService } from './infrastructure/services/openAI.service';

@Module({
  providers: [OpenAIService],
  controllers: [OpenAIController],
})
export class AiModule {}
