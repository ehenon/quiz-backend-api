import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      immutable: true,
      unique: true,
      required: true,
    },
    date: { type: Date, required: true },
    theme: { type: String, required: true },
    clue: { type: String, required: true },
    label: { type: String, required: true },
    answers: { type: [String], required: true },
  },
  {
    collection: 'questions',
    timestamps: true,
  },
);

type InferredSchemaType = mongoose.InferSchemaType<typeof QuestionSchema>;

export type QuestionDocument = {
  _id: string,
  createdAt: Date,
  updatedAt: Date,
} & InferredSchemaType;
