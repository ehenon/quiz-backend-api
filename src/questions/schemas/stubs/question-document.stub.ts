import { QuestionDocument } from '../question.schema';

// This file provides dummy data for testing purposes

const FAKES = {
  NUMBER: 0,
  STRING: 'STRING',
  DATE: new Date(0),
  BOOLEAN: true,
};

export const createQuestionDocumentStub = (): QuestionDocument => ({
  _id: FAKES.STRING,
  createdAt: FAKES.DATE,
  updatedAt: FAKES.DATE,
  identifier: FAKES.STRING,
  date: FAKES.DATE,
  theme: FAKES.STRING,
  clue: FAKES.STRING,
  label: FAKES.STRING,
  answers: [FAKES.STRING, FAKES.STRING],
});
