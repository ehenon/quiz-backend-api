import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { UpdateQuestionDTO } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
import { QuestionDocument } from './schemas/question.schema';
import { Question as QuestionSwaggerModel } from './swagger-models/question.swagger-model';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'Question successfully created', type: QuestionSwaggerModel })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createQuestionDTO: CreateQuestionDTO): Promise<QuestionDocument> {
    return this.questionsService.create(createQuestionDTO);
  }

  @Get(':identifier')
  @ApiOperation({ summary: 'Get a question by its identifier' })
  @ApiResponse({ status: 200, description: 'Question successfully returned', type: QuestionSwaggerModel })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('identifier') identifier: string): Promise<QuestionDocument> {
    return this.questionsService.findOne(identifier);
  }

  @Put(':identifier')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Update a question by its identifier' })
  @ApiResponse({ status: 200, description: 'Question successfully updated', type: QuestionSwaggerModel })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(@Param('identifier') identifier: string, @Body() updateQuestionDTO: UpdateQuestionDTO): Promise<QuestionDocument> {
    return this.questionsService.update(identifier, updateQuestionDTO);
  }

  @Delete(':identifier')
  @ApiOperation({ summary: 'Remove a question by its identifier' })
  @ApiResponse({ status: 200, description: 'Question successfully removed', type: QuestionSwaggerModel })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('identifier') identifier: string): Promise<QuestionDocument> {
    return this.questionsService.remove(identifier);
  }
}
