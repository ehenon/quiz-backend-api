import { InstrumentDocument } from '../instrument.schema';

// This file provides dummy data for testing purposes

const FAKES = {
  NUMBER: 0,
  STRING: 'STRING',
  DATE: new Date(0),
  BOOLEAN: true,
};

export const createCompleteInstrumentDocumentStub = (): InstrumentDocument => ({
  _id: FAKES.STRING,
  createdAt: FAKES.DATE,
  updatedAt: FAKES.DATE,
  identifier: FAKES.STRING,
  name: FAKES.STRING,
  classification: FAKES.STRING,
  origin: FAKES.STRING,
  creationDate: FAKES.DATE,
  description: FAKES.STRING,
  stillProduced: FAKES.BOOLEAN,
  comments: [FAKES.STRING, FAKES.STRING],
});

export const createPartialInstrumentDocumentStub = (): InstrumentDocument => ({
  _id: FAKES.STRING,
  createdAt: FAKES.DATE,
  updatedAt: FAKES.DATE,
  identifier: FAKES.STRING,
  name: FAKES.STRING,
  classification: FAKES.STRING,
  stillProduced: FAKES.BOOLEAN,
  comments: [],
});
