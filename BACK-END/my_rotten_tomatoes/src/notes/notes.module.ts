import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, NotesSchema } from './notes.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notes.name, schema: NotesSchema }]),
    HttpModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
