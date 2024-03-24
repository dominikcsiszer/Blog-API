import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) {}

    async validateUser(email: string, password: string): Promise<Partial<UserDocument> | null> {
        const user = await this.userService.findOneByEmailAndPassword(email, password);

        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
          
        return null;
    }

    async login(user: UserDocument) {
        const payload = { 
            email: user.email, 
            sub: {
                _id: user._id,
                fullname: user.fullname
            }
         };
        const accessToken = this.jwtService.sign(payload);

        return {
            ...user,
            accessToken: accessToken,
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }
    

    async register(body: UserDTO): Promise<Partial<UserDocument>> {
        return await this.userService.create(body);
    }

    async refreshToken(user: UserDocument) {
        const payload = { 
            email: user.email, 
            sub: {
                _id: user._id,
                fullname: user.fullname
            }
         };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken: accessToken,
        };
    }
}
