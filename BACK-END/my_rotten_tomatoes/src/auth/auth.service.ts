import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from '../users/users.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password, password_confirm } = registerDto;

    if (password !== password_confirm) {
      throw new BadRequestException(
        'Les deux mots de passe ne correspondent pas',
      );
    }

    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
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

    const userObj = savedUser.toObject();
    const { password: _, ...userCreated } = userObj as any;

    return userCreated;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role || 'user',
    };

    const userObj = user.toObject();
    const { password: _, ...userCreated } = userObj as any;

    return {
      user: userCreated,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
