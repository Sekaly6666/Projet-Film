import { Module } from '@nestjs/common';
import { ComsService } from './coms.service';
import { ComsController } from './coms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coms, ComsSchema } from './coms.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coms.name, schema: ComsSchema }]),
    HttpModule,
  ],
  controllers: [ComsController],
  providers: [ComsService],
})
export class ComsModule {}
