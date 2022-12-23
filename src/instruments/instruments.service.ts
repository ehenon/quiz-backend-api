import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v1 as uuidv1 } from 'uuid';
import { CreateInstrumentDTO } from './dto/create-instrument.dto';
import { UpdateInstrumentDTO } from './dto/update-instrument.dto';
import { InstrumentDocument } from './schemas/instrument.schema';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectModel('Instrument') private readonly InstrumentModel: Model<InstrumentDocument>,
  ) { }

  async create(createInstrumentDTO: CreateInstrumentDTO): Promise<InstrumentDocument> {
    const newInstrument = new this.InstrumentModel(createInstrumentDTO);
    newInstrument.identifier = uuidv1();
    return newInstrument.save();
  }

  async findAll(): Promise<InstrumentDocument[]> {
    return this.InstrumentModel.find().exec();
  }

  async findOne(identifier: string): Promise<InstrumentDocument> {
    const instrument = await this.InstrumentModel.findOne({ identifier }).exec();
    if (!instrument) {
      throw new NotFoundException();
    }
    return instrument;
  }

  async update(
    identifier: string,
    updateInstrumentDTO: UpdateInstrumentDTO,
  ): Promise<InstrumentDocument> {
    return this.InstrumentModel.findOneAndUpdate(
      { identifier },
      updateInstrumentDTO,
      { returnOriginal: false },
    ).exec();
  }

  async remove(identifier: string): Promise<InstrumentDocument> {
    return this.InstrumentModel.findOneAndRemove({ identifier }).exec();
  }
}
