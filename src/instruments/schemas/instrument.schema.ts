import * as mongoose from 'mongoose';

export const InstrumentSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      immutable: true,
      unique: true,
      required: true,
    },
    name: { type: String, required: true },
    classification: { type: String, required: true },
    origin: { type: String, required: false },
    creationDate: { type: Date, required: false },
    description: { type: String, required: false },
    stillProduced: { type: Boolean, required: true },
    comments: { type: [String], default: () => undefined, required: false },
  },
  {
    collection: 'instruments',
    timestamps: true,
  },
);

type InferredSchemaType = mongoose.InferSchemaType<typeof InstrumentSchema>;

export type InstrumentDocument = {
  _id: string,
  createdAt: Date,
  updatedAt: Date,
} & InferredSchemaType;
