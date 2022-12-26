import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { createQuestionDTOStub } from './dto/stubs/create-question-dto.stub';
import { updateQuestionDTOStub } from './dto/stubs/update-question-dto.stub';
import { createQuestionDocumentStub } from './schemas/stubs/question-document.stub';

const MOCK_ERROR = new Error('MOCK_ERROR');

describe('QuestionsController', () => {
  let questionsController: QuestionsController;
  let questionsService: QuestionsService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        QuestionsService,
        { provide: getModelToken('Question'), useValue: jest.fn() },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    questionsService = module.get<QuestionsService>(QuestionsService);
    questionsController = module.get<QuestionsController>(QuestionsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create()', () => {
    const MOCK_CREATE_QUESTION_DTO = createQuestionDTOStub();
    const MOCK_RESPONSE_FROM_SERVICE = createQuestionDocumentStub();

    test('OK: the new question is created and returned', async () => {
      jest
        .spyOn(questionsService, 'create')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await questionsController.create(MOCK_CREATE_QUESTION_DTO),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(questionsService.create).toHaveBeenCalledTimes(1);
      expect(questionsService.create).toHaveBeenCalledWith(MOCK_CREATE_QUESTION_DTO);
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(questionsService, 'create')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(
        questionsController.create(MOCK_CREATE_QUESTION_DTO),
      ).rejects.toEqual(MOCK_ERROR);
      expect(questionsService.create).toHaveBeenCalledTimes(1);
      expect(questionsService.create).toHaveBeenCalledWith(MOCK_CREATE_QUESTION_DTO);
    });
  });

  describe('findRandomDocuments()', () => {
    const MOCK_RESPONSE_FROM_SERVICE = [
      createQuestionDocumentStub(),
      createQuestionDocumentStub(),
    ];

    test('OK: the random questions are returned (default limit)', async () => {
      jest
        .spyOn(questionsService, 'findRandomDocuments')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await questionsController.findRandomDocuments(),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(questionsService.findRandomDocuments).toHaveBeenCalledTimes(1);
      expect(questionsService.findRandomDocuments).toHaveBeenCalledWith(15);
    });

    test('OK: the random questions are returned (custom limit)', async () => {
      jest
        .spyOn(questionsService, 'findRandomDocuments')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await questionsController.findRandomDocuments(30),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(questionsService.findRandomDocuments).toHaveBeenCalledTimes(1);
      expect(questionsService.findRandomDocuments).toHaveBeenCalledWith(30);
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(questionsService, 'findRandomDocuments')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(
        questionsController.findRandomDocuments(),
      ).rejects.toEqual(MOCK_ERROR);
      expect(questionsService.findRandomDocuments).toHaveBeenCalledTimes(1);
      expect(questionsService.findRandomDocuments).toHaveBeenCalledWith(15);
    });
  });

  describe('findOne()', () => {
    const MOCK_RESPONSE_FROM_SERVICE = createQuestionDocumentStub();
    const MOCK_IDENTIFIER = '1';

    test('OK: the question is returned', async () => {
      jest
        .spyOn(questionsService, 'findOne')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await questionsController.findOne(MOCK_IDENTIFIER),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(questionsService.findOne).toHaveBeenCalledTimes(1);
      expect(questionsService.findOne).toHaveBeenCalledWith(MOCK_IDENTIFIER);
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(questionsService, 'findOne')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(
        questionsController.findOne(MOCK_IDENTIFIER),
      ).rejects.toEqual(MOCK_ERROR);
      expect(questionsService.findOne).toHaveBeenCalledTimes(1);
      expect(questionsService.findOne).toHaveBeenCalledWith(MOCK_IDENTIFIER);
    });
  });

  describe('update()', () => {
    const MOCK_UPDATE_QUESTION_DTO = updateQuestionDTOStub();
    const MOCK_RESPONSE_FROM_SERVICE = createQuestionDocumentStub();
    const MOCK_IDENTIFIER = '1';

    test('OK: the question is updated and returned', async () => {
      jest
        .spyOn(questionsService, 'update')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await questionsController.update(MOCK_IDENTIFIER, MOCK_UPDATE_QUESTION_DTO),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(questionsService.update).toHaveBeenCalledTimes(1);
      expect(
        questionsService.update,
      ).toHaveBeenCalledWith(MOCK_IDENTIFIER, MOCK_UPDATE_QUESTION_DTO);
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(questionsService, 'update')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(
        questionsController.update(MOCK_IDENTIFIER, MOCK_UPDATE_QUESTION_DTO),
      ).rejects.toEqual(MOCK_ERROR);
      expect(questionsService.update).toHaveBeenCalledTimes(1);
      expect(
        questionsService.update,
      ).toHaveBeenCalledWith(MOCK_IDENTIFIER, MOCK_UPDATE_QUESTION_DTO);
    });
  });

  describe('remove()', () => {
    const MOCK_RESPONSE_FROM_SERVICE = createQuestionDocumentStub();
    const MOCK_IDENTIFIER = '1';

    test('OK: the question is removed and returned', async () => {
      jest
        .spyOn(questionsService, 'remove')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await questionsController.remove(MOCK_IDENTIFIER),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(questionsService.remove).toHaveBeenCalledTimes(1);
      expect(questionsService.remove).toHaveBeenCalledWith(MOCK_IDENTIFIER);
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(questionsService, 'remove')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(questionsController.remove(MOCK_IDENTIFIER)).rejects.toEqual(MOCK_ERROR);
      expect(questionsService.remove).toHaveBeenCalledTimes(1);
      expect(questionsService.remove).toHaveBeenCalledWith(MOCK_IDENTIFIER);
    });
  });
});
