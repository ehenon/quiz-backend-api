import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { InstrumentsController } from './instruments.controller';
import { InstrumentsService } from './instruments.service';
import { createInstrumentDTOStub } from './dto/stubs/create-instrument-dto.stub';
import { updateInstrumentDTOStub } from './dto/stubs/update-instrument-dto.stub';
import { createCompleteInstrumentDocumentStub } from './schemas/stubs/instrument-document.stub';

const MOCK_ERROR = new Error('MOCK_ERROR');

describe('InstrumentsController', () => {
  let instrumentsController: InstrumentsController;
  let instrumentsService: InstrumentsService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstrumentsController],
      providers: [
        InstrumentsService,
        { provide: getModelToken('Instrument'), useValue: jest.fn() },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    instrumentsService = module.get<InstrumentsService>(InstrumentsService);
    instrumentsController = module.get<InstrumentsController>(InstrumentsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create()', () => {
    const MOCK_CREATE_INSTRUMENT_DTO = createInstrumentDTOStub();
    const MOCK_RESPONSE_FROM_SERVICE = createCompleteInstrumentDocumentStub();

    test('OK: the new instrument is created and returned', async () => {
      jest
        .spyOn(instrumentsService, 'create')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await instrumentsController.create(MOCK_CREATE_INSTRUMENT_DTO),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(instrumentsService.create).toHaveBeenCalledTimes(1);
      expect(instrumentsService.create).toHaveBeenCalledWith(MOCK_CREATE_INSTRUMENT_DTO);
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(instrumentsService, 'create')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(
        instrumentsController.create(MOCK_CREATE_INSTRUMENT_DTO),
      ).rejects.toEqual(MOCK_ERROR);
      expect(instrumentsService.create).toHaveBeenCalledTimes(1);
      expect(instrumentsService.create).toHaveBeenCalledWith(MOCK_CREATE_INSTRUMENT_DTO);
    });
  });

  describe('findAll()', () => {
    const MOCK_RESPONSE_FROM_SERVICE = [
      createCompleteInstrumentDocumentStub(),
      createCompleteInstrumentDocumentStub(),
    ];

    test('OK: the instruments are returned', async () => {
      jest
        .spyOn(instrumentsService, 'findAll')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await instrumentsController.findAll(),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(instrumentsService.findAll).toHaveBeenCalledTimes(1);
      expect(instrumentsService.findAll).toHaveBeenCalledWith();
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(instrumentsService, 'findAll')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(
        instrumentsController.findAll(),
      ).rejects.toEqual(MOCK_ERROR);
      expect(instrumentsService.findAll).toHaveBeenCalledTimes(1);
      expect(instrumentsService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne()', () => {
    const MOCK_RESPONSE_FROM_SERVICE = createCompleteInstrumentDocumentStub();
    const MOCK_IDENTIFIER = '1';

    test('OK: the instrument is returned', async () => {
      jest
        .spyOn(instrumentsService, 'findOne')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await instrumentsController.findOne(MOCK_IDENTIFIER),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(instrumentsService.findOne).toHaveBeenCalledTimes(1);
      expect(instrumentsService.findOne).toHaveBeenCalledWith(MOCK_IDENTIFIER);
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(instrumentsService, 'findOne')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(
        instrumentsController.findOne(MOCK_IDENTIFIER),
      ).rejects.toEqual(MOCK_ERROR);
      expect(instrumentsService.findOne).toHaveBeenCalledTimes(1);
      expect(instrumentsService.findOne).toHaveBeenCalledWith(MOCK_IDENTIFIER);
    });
  });

  describe('update()', () => {
    const MOCK_UPDATE_INSTRUMENT_DTO = updateInstrumentDTOStub();
    const MOCK_RESPONSE_FROM_SERVICE = createCompleteInstrumentDocumentStub();
    const MOCK_IDENTIFIER = '1';

    test('OK: the instrument is updated and returned', async () => {
      jest
        .spyOn(instrumentsService, 'update')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await instrumentsController.update(MOCK_IDENTIFIER, MOCK_UPDATE_INSTRUMENT_DTO),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(instrumentsService.update).toHaveBeenCalledTimes(1);
      expect(
        instrumentsService.update,
      ).toHaveBeenCalledWith(MOCK_IDENTIFIER, MOCK_UPDATE_INSTRUMENT_DTO);
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(instrumentsService, 'update')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(
        instrumentsController.update(MOCK_IDENTIFIER, MOCK_UPDATE_INSTRUMENT_DTO),
      ).rejects.toEqual(MOCK_ERROR);
      expect(instrumentsService.update).toHaveBeenCalledTimes(1);
      expect(
        instrumentsService.update,
      ).toHaveBeenCalledWith(MOCK_IDENTIFIER, MOCK_UPDATE_INSTRUMENT_DTO);
    });
  });

  describe('remove()', () => {
    const MOCK_RESPONSE_FROM_SERVICE = createCompleteInstrumentDocumentStub();
    const MOCK_IDENTIFIER = '1';

    test('OK: the instrument is removed and returned', async () => {
      jest
        .spyOn(instrumentsService, 'remove')
        .mockImplementation(async () => MOCK_RESPONSE_FROM_SERVICE);
      expect(
        await instrumentsController.remove(MOCK_IDENTIFIER),
      ).toEqual(MOCK_RESPONSE_FROM_SERVICE);
      expect(instrumentsService.remove).toHaveBeenCalledTimes(1);
      expect(instrumentsService.remove).toHaveBeenCalledWith(MOCK_IDENTIFIER);
    });

    test('KO: the promise is rejected', async () => {
      jest
        .spyOn(instrumentsService, 'remove')
        .mockImplementation(async () => { throw MOCK_ERROR; });
      await expect(instrumentsController.remove(MOCK_IDENTIFIER)).rejects.toEqual(MOCK_ERROR);
      expect(instrumentsService.remove).toHaveBeenCalledTimes(1);
      expect(instrumentsService.remove).toHaveBeenCalledWith(MOCK_IDENTIFIER);
    });
  });
});
