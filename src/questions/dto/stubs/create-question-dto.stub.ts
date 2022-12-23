import { CreateQuestionDTO } from '../create-question.dto';

// This file provides dummy data for testing purposes

const FAKES = {
  NUMBER: 0,
  STRING: 'STRING',
  ISO_8601_DATE_STRING: new Date(0).toISOString(),
  BOOLEAN: true,
};

export const createQuestionDTOStub = (): CreateQuestionDTO => ({
  date: FAKES.ISO_8601_DATE_STRING,
  theme: FAKES.STRING,
  clue: FAKES.STRING,
  label: FAKES.STRING,
  answers: [FAKES.STRING, FAKES.STRING],
});
