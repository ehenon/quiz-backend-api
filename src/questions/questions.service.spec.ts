import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { v1 as uuidv1 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { createQuestionDTOStub } from './dto/stubs/create-question-dto.stub';
import { updateQuestionDTOStub } from './dto/stubs/update-question-dto.stub';

const MOCK_UUID = 'MOCK_UUID';
jest.mock('uuid');

describe('QuestionsService', () => {
  const MOCK_CREATE_QUESTION_DTO = createQuestionDTOStub();
  const MOCK_UPDATE_QUESTION_DTO = updateQuestionDTOStub();
  const MOCK_QUESTION_DOCUMENT = {
    identifier: MOCK_UUID,
    ...MOCK_CREATE_QUESTION_DTO,
  };
  const MOCK_ERROR = new Error('MOCK_ERROR');

  uuidv1.mockImplementation(() => MOCK_UUID);

  class MockModelClass {
    constructor(args) { Object.assign(this, { ...args }); }
    save() { return this; }
    static find() { return { exec: jest.fn().mockResolvedValue([MOCK_QUESTION_DOCUMENT]) }; }
    static findOne() { return { exec: jest.fn().mockResolvedValue(MOCK_QUESTION_DOCUMENT) }; }
    static findOneAndUpdate() {
      return { exec: jest.fn().mockResolvedValue(MOCK_QUESTION_DOCUMENT) };
    }
    static findOneAndRemove() {
      return { exec: jest.fn().mockResolvedValue(MOCK_QUESTION_DOCUMENT) };
    }
  }

  class MockModelClassWrong {
    constructor(args) { Object.assign(this, { ...args }); }
    save() { return Promise.reject(MOCK_ERROR); }
    static find() { return { exec: jest.fn().mockRejectedValue(MOCK_ERROR) }; }
    static findOne() { return { exec: jest.fn().mockRejectedValue(MOCK_ERROR) }; }
    static findOneAndUpdate() { return { exec: jest.fn().mockRejectedValue(MOCK_ERROR) }; }
    static findOneAndRemove() { return { exec: jest.fn().mockRejectedValue(MOCK_ERROR) }; }
  }

  let goodQuestionsService: QuestionsService;
  let wrongQuestionsService: QuestionsService;

  beforeAll(async () => {
    const goodModule: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        { provide: getModelToken('Question'), useValue: MockModelClass },
      ],
    }).compile();

    goodQuestionsService = goodModule.get<QuestionsService>(
      QuestionsService,
    );

    const wrongModule: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        { provide: getModelToken('Question'), useValue: MockModelClassWrong },
      ],
    }).compile();

    wrongQuestionsService = wrongModule.get<QuestionsService>(
      QuestionsService,
    );
  });

  describe('create()', () => {
    test('OK: The new Question is created', async () => {
      await expect(
        goodQuestionsService.create(
          MOCK_CREATE_QUESTION_DTO,
        ),
      ).resolves.toEqual(MOCK_QUESTION_DOCUMENT);
    });

    test('KO: The new Question is not created', async () => {
      await expect(
        wrongQuestionsService.create(
          MOCK_CREATE_QUESTION_DTO,
        ),
      ).rejects.toEqual(MOCK_ERROR);
    });
  });

  describe('findOne()', () => {
    test('OK: The Question is found and returned', async () => {
      await expect(
        goodQuestionsService.findOne(MOCK_UUID),
      ).resolves.toEqual(MOCK_QUESTION_DOCUMENT);
    });

    test('KO: The Question is not found', async () => {
      class NotFoundModelClass {
        constructor(args) { Object.assign(this, { ...args }); }
        static findOne() { return { exec: () => Promise.resolve() }; }
      }

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          QuestionsService,
          { provide: getModelToken('Question'), useValue: NotFoundModelClass },
        ],
      }).compile();

      const questionsService: QuestionsService = module.get<QuestionsService>(
        QuestionsService,
      );

      await expect(
        questionsService.findOne(MOCK_UUID),
      ).rejects.toEqual(new NotFoundException());
    });

    test('KO: Error executing the query', async () => {
      await expect(
        wrongQuestionsService.findOne(MOCK_UUID),
      ).rejects.toEqual(MOCK_ERROR);
    });
  });

  describe('update()', () => {
    test('OK: The Question is updated and returned', async () => {
      await expect(
        goodQuestionsService.update(MOCK_UUID, MOCK_UPDATE_QUESTION_DTO),
      ).resolves.toEqual(MOCK_QUESTION_DOCUMENT);
    });

    test('KO: Error executing the query', async () => {
      await expect(
        wrongQuestionsService.update(MOCK_UUID, MOCK_UPDATE_QUESTION_DTO),
      ).rejects.toEqual(MOCK_ERROR);
    });
  });

  describe('remove()', () => {
    test('OK: The Question is removed and returned', async () => {
      await expect(
        goodQuestionsService.remove(MOCK_UUID),
      ).resolves.toEqual(MOCK_QUESTION_DOCUMENT);
    });

    test('KO: Error executing the query', async () => {
      await expect(
        wrongQuestionsService.remove(MOCK_UUID),
      ).rejects.toEqual(MOCK_ERROR);
    });
  });
});
