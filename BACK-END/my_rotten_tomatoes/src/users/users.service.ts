import { HttpException, HttpStatus, Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

  
    const newusercreate = await this.userModel.findOne({ email });
    if (newusercreate) {
      throw new ConflictException('Cet email est déjà utilisé');
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });

   
    const savedUser = await newUser.save();
    return savedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  findAll() {
    // return this.userModel.find();
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (user) return user;
    throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  // }
update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  // remove(id: string) {
  //   return this.userModel.findByIdAndDelete(id);
  // }
async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return { message: 'Utilisateur supprimé avec succès' };
  }

 async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }
  }
}
