import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from '../schemas/User.schema';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UsersDocument>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    if (user) {
      const isCorrect = await bcrypt.compare(pass, user.password);

      if (isCorrect) {
        const { password, ...result } = user.toObject();
        return result;
      }
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password, password_confirm } = registerDto;

    if (password !== password_confirm) {
      throw new BadRequestException('Les mots de passe ne correspondent pas');
    }

    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new ConflictException('Cette adresse email est déjà utilisée');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }
}
