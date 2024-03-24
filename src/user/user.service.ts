import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(body: UserDTO): Promise<Partial<UserDocument>> {
        const hashedPassword = bcrypt.hashSync(body.password, 10);
        const newUser = new this.userModel({ ...body, password: hashedPassword});
        await newUser.save();
        const { password, ...result } = newUser;
        return result;
    }

    async findOneByEmailAndPassword(email: string, password: string): Promise<Partial<UserDocument> | null> {
        return await this.userModel.findOne({ email, password }).exec();
    }

    async findOneByEmail(email: string): Promise<Partial<UserDocument> | null> {
        return await this.userModel.findOne({ email }).exec();
    }
}
