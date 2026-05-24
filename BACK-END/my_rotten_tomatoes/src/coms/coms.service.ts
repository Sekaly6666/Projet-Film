import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComDto } from './dto/create-com.dto';
import { UpdateComDto } from './dto/update-com.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coms } from './coms.schema';

@Injectable()
export class ComsService {
  constructor(@InjectModel(Coms.name) private comsModel: Model<Coms>) {}

  async create(createComDto: CreateComDto) {
    const newCom = new this.comsModel(createComDto);
    return await newCom.save();
  }

  findAll() {
    return this.comsModel.find().exec();
  }

  findByMovie(movieId: string) {
    return this.comsModel.find({ movieId }).exec();
  }

  update(id: string, updateComDto: UpdateComDto) {
    return this.comsModel
      .findByIdAndUpdate(id, updateComDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    const supComs = await this.comsModel.findByIdAndDelete(id).exec();

    if (!supComs) {
      throw new NotFoundException('Commentaire inexistant');
    }
    return { message: 'commentaire supprimé' };
  }

async getDashboardStats() {
    const totalAvis = await this.comsModel.countDocuments().exec();
    const aggregateResult = await this.comsModel.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      },
    ]).exec();

    const moyenneGenerale = aggregateResult[0]?.averageRating || 0;

    return {
      totalAvis,
      moyenneGenerale: Number(moyenneGenerale.toFixed(1)),
    };
  }

}
