import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import * as bcrypt from "bcryptjs";

import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registation(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserbyEmail(userDto.email);

    if (candidate) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserbyEmail(userDto.email);
    const isPasswordMatched = await bcrypt.compare(
      userDto.password,
      user.password
    );

    if (user && isPasswordMatched) {
      return user;
    } else {
      throw new UnauthorizedException({ message: "Wrong email or password" });
    }
  }
}
