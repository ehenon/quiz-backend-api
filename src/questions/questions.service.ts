import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v1 as uuidv1 } from 'uuid';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { UpdateQuestionDTO } from './dto/update-question.dto';
import { QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Question') private readonly QuestionModel: Model<QuestionDocument>,
  ) { }

  async create(createQuestionDTO: CreateQuestionDTO): Promise<QuestionDocument> {
    const newQuestion = new this.QuestionModel(createQuestionDTO);
    newQuestion.identifier = uuidv1();
    return newQuestion.save();
  }

  async findOne(identifier: string): Promise<QuestionDocument> {
    const question = await this.QuestionModel.findOne({ identifier }).exec();
    if (!question) {
      throw new NotFoundException();
    }
    return question;
  }

  async update(
    identifier: string,
    updateQuestionDTO: UpdateQuestionDTO,
  ): Promise<QuestionDocument> {
    return this.QuestionModel.findOneAndUpdate(
      { identifier },
      updateQuestionDTO,
      { returnOriginal: false },
    ).exec();
  }

  async remove(identifier: string): Promise<QuestionDocument> {
    return this.QuestionModel.findOneAndRemove({ identifier }).exec();
  }
}
