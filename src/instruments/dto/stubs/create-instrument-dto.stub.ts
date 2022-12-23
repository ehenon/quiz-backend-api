import { CreateInstrumentDTO } from '../create-instrument.dto';

// This file provides dummy data for testing purposes

const FAKES = {
  NUMBER: 0,
  STRING: 'STRING',
  ISO_8601_DATE_STRING: new Date(0).toISOString(),
  BOOLEAN: true,
};

export const createInstrumentDTOStub = (): CreateInstrumentDTO => ({
  name: FAKES.STRING,
  classification: FAKES.STRING,
  origin: FAKES.STRING,
  creationDate: FAKES.ISO_8601_DATE_STRING,
  description: FAKES.STRING,
  stillProduced: FAKES.BOOLEAN,
  comments: [FAKES.STRING, FAKES.STRING],
});
