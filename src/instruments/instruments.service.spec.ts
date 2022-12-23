import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { v1 as uuidv1 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import { createInstrumentDTOStub } from './dto/stubs/create-instrument-dto.stub';
import { updateInstrumentDTOStub } from './dto/stubs/update-instrument-dto.stub';

const MOCK_UUID = 'MOCK_UUID';
jest.mock('uuid');

describe('InstrumentsService', () => {
  const MOCK_CREATE_INSTRUMENT_DTO = createInstrumentDTOStub();
  const MOCK_UPDATE_INSTRUMENT_DTO = updateInstrumentDTOStub();
  const MOCK_INSTRUMENT_DOCUMENT = {
    identifier: MOCK_UUID,
    ...MOCK_CREATE_INSTRUMENT_DTO,
  };
  const MOCK_ERROR = new Error('MOCK_ERROR');

  uuidv1.mockImplementation(() => MOCK_UUID);

  class MockModelClass {
    constructor(args) { Object.assign(this, { ...args }); }
    save() { return this; }
    static find() { return { exec: jest.fn().mockResolvedValue([MOCK_INSTRUMENT_DOCUMENT]) }; }
    static findOne() { return { exec: jest.fn().mockResolvedValue(MOCK_INSTRUMENT_DOCUMENT) }; }
    static findOneAndUpdate() {
      return { exec: jest.fn().mockResolvedValue(MOCK_INSTRUMENT_DOCUMENT) };
    }
    static findOneAndRemove() {
      return { exec: jest.fn().mockResolvedValue(MOCK_INSTRUMENT_DOCUMENT) };
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

  let goodInstrumentsService: InstrumentsService;
  let wrongInstrumentsService: InstrumentsService;

  beforeAll(async () => {
    const goodModule: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentsService,
        { provide: getModelToken('Instrument'), useValue: MockModelClass },
      ],
    }).compile();

    goodInstrumentsService = goodModule.get<InstrumentsService>(
      InstrumentsService,
    );

    const wrongModule: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentsService,
        { provide: getModelToken('Instrument'), useValue: MockModelClassWrong },
      ],
    }).compile();

    wrongInstrumentsService = wrongModule.get<InstrumentsService>(
      InstrumentsService,
    );
  });

  describe('create()', () => {
    test('OK: The new Instrument is created', async () => {
      await expect(
        goodInstrumentsService.create(
          MOCK_CREATE_INSTRUMENT_DTO,
        ),
      ).resolves.toEqual(MOCK_INSTRUMENT_DOCUMENT);
    });

    test('KO: The new Instrument is not created', async () => {
      await expect(
        wrongInstrumentsService.create(
          MOCK_CREATE_INSTRUMENT_DTO,
        ),
      ).rejects.toEqual(MOCK_ERROR);
    });
  });

  describe('findAll()', () => {
    test('OK: The Instruments are found and returned', async () => {
      await expect(
        goodInstrumentsService.findAll(),
      ).resolves.toEqual([MOCK_INSTRUMENT_DOCUMENT]);
    });

    test('KO: Error executing the query', async () => {
      await expect(
        wrongInstrumentsService.findAll(),
      ).rejects.toEqual(MOCK_ERROR);
    });
  });

  describe('findOne()', () => {
    test('OK: The Instrument is found and returned', async () => {
      await expect(
        goodInstrumentsService.findOne(MOCK_UUID),
      ).resolves.toEqual(MOCK_INSTRUMENT_DOCUMENT);
    });

    test('KO: The Instrument is not found', async () => {
      class NotFoundModelClass {
        constructor(args) { Object.assign(this, { ...args }); }
        static findOne() { return { exec: () => Promise.resolve() }; }
      }

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          InstrumentsService,
          { provide: getModelToken('Instrument'), useValue: NotFoundModelClass },
        ],
      }).compile();

      const instrumentsService: InstrumentsService = module.get<InstrumentsService>(
        InstrumentsService,
      );

      await expect(
        instrumentsService.findOne(MOCK_UUID),
      ).rejects.toEqual(new NotFoundException());
    });

    test('KO: Error executing the query', async () => {
      await expect(
        wrongInstrumentsService.findOne(MOCK_UUID),
      ).rejects.toEqual(MOCK_ERROR);
    });
  });

  describe('update()', () => {
    test('OK: The Instrument is updated and returned', async () => {
      await expect(
        goodInstrumentsService.update(MOCK_UUID, MOCK_UPDATE_INSTRUMENT_DTO),
      ).resolves.toEqual(MOCK_INSTRUMENT_DOCUMENT);
    });

    test('KO: Error executing the query', async () => {
      await expect(
        wrongInstrumentsService.update(MOCK_UUID, MOCK_UPDATE_INSTRUMENT_DTO),
      ).rejects.toEqual(MOCK_ERROR);
    });
  });

  describe('remove()', () => {
    test('OK: The Instrument is removed and returned', async () => {
      await expect(
        goodInstrumentsService.remove(MOCK_UUID),
      ).resolves.toEqual(MOCK_INSTRUMENT_DOCUMENT);
    });

    test('KO: Error executing the query', async () => {
      await expect(
        wrongInstrumentsService.remove(MOCK_UUID),
      ).rejects.toEqual(MOCK_ERROR);
    });
  });
});
