import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
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

  @Post('several')
  @ApiOperation({ summary: 'Create several new questions at once' })
  @ApiBody({ type: [CreateQuestionDTO] })
  @ApiResponse({ status: 201, description: 'Questions successfully created', type: [QuestionSwaggerModel] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async createSeveral(
    @Body(new ParseArrayPipe({ items: CreateQuestionDTO }))
      createSeveralQuestionsDTO: CreateQuestionDTO[],
  ): Promise<QuestionDocument[]> {
    return this.questionsService.createSeveral(createSeveralQuestionsDTO);
  }

  @Get('random')
  @ApiOperation({ summary: 'Get a number of random questions (min. 1, default 15, max. 50)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Questions successfully returned', type: [QuestionSwaggerModel] })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findRandoms(@Query('limit') limit = 15): Promise<QuestionDocument[]> {
    return this.questionsService.findRandoms(limit);
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
