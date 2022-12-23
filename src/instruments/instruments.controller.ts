import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateInstrumentDTO } from './dto/create-instrument.dto';
import { UpdateInstrumentDTO } from './dto/update-instrument.dto';
import { InstrumentsService } from './instruments.service';
import { InstrumentDocument } from './schemas/instrument.schema';
import { Instrument as InstrumentSwaggerModel } from './swagger-models/instrument.swagger-model';

@ApiTags('Instruments')
@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Create a new instrument' })
  @ApiResponse({ status: 201, description: 'Instrument successfully created', type: InstrumentSwaggerModel })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createInstrumentDTO: CreateInstrumentDTO): Promise<InstrumentDocument> {
    return this.instrumentsService.create(createInstrumentDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the instruments' })
  @ApiResponse({ status: 200, description: 'Instruments successfully returned', type: InstrumentSwaggerModel })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll(): Promise<InstrumentDocument[]> {
    return this.instrumentsService.findAll();
  }

  @Get(':identifier')
  @ApiOperation({ summary: 'Get an instrument by its identifier' })
  @ApiResponse({ status: 200, description: 'Instrument successfully returned', type: InstrumentSwaggerModel })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('identifier') identifier: string): Promise<InstrumentDocument> {
    return this.instrumentsService.findOne(identifier);
  }

  @Put(':identifier')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Update an instrument by its identifier' })
  @ApiResponse({ status: 200, description: 'Instrument successfully updated', type: InstrumentSwaggerModel })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(@Param('identifier') identifier: string, @Body() updateInstrumentDTO: UpdateInstrumentDTO): Promise<InstrumentDocument> {
    return this.instrumentsService.update(identifier, updateInstrumentDTO);
  }

  @Delete(':identifier')
  @ApiOperation({ summary: 'Remove an instrument by its identifier' })
  @ApiResponse({ status: 200, description: 'Instrument successfully removed', type: InstrumentSwaggerModel })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('identifier') identifier: string): Promise<InstrumentDocument> {
    return this.instrumentsService.remove(identifier);
  }
}
