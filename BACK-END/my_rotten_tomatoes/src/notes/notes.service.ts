import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notes } from './notes.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes.name) private notesModel: Model<Notes>) {}
  async create(createNoteDto: CreateNoteDto) {
    const newNotes = new this.notesModel(createNoteDto);

    return await newNotes.save();
  }

  findAll() {
    return this.notesModel.find().exec();
  }

  findByMovie(movieId: string) {
    return this.notesModel.find({ movieId }).exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} note`;
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.notesModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    const supNotes = await this.notesModel.findByIdAndDelete(id).exec();
    if (!supNotes) {
      throw new NotFoundException('Note introuvable');
    }
    return { message: 'Votre note a été supprimé' };
  }
}
