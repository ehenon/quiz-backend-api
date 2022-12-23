import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstrumentsController } from './instruments.controller';
import { InstrumentsService } from './instruments.service';
import { InstrumentSchema } from './schemas/instrument.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Instrument', schema: InstrumentSchema },
    ]),
  ],
  controllers: [InstrumentsController],
  providers: [InstrumentsService, Logger],
  exports: [InstrumentsService],
})
export class InstrumentsModule {}
