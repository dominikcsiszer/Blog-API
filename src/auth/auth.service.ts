import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from '../user/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) {}

    async validateUser(email: string, password: string): Promise<Partial<UserDocument> | null> {
        const user = await this.userService.findOneByEmail(email);

        if (user && (await bcrypt.compareSync(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
          
        return null;
    }

    async signIn(email: string, password: string): Promise<{accessToken: string}>{
        const user = await this.validateUser(email, password);
        if (!user) 
            throw new UnauthorizedException();

            console.log('User:', user);
        
        const payload = { 
            email: user["_doc"].email, 
            sub: {
                id: user["_doc"]._id.toString(),
            }
         };

         console.log('Payload:', payload)

        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }
    

    async signUp(body: UserCreateDTO): Promise<string> {
        const user = await this.userService.create(body);
        const id = new ObjectId(user._id);
        return id.toString();
    }
}
