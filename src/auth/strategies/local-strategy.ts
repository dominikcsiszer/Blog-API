import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDocument } from "src/user/user.schema";
import CONFIG from "config/config";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<Partial<UserDocument>> {
    console.log('Validating user:', email);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
        console.log('User validation failed:', email);
        throw new UnauthorizedException();
    }
    console.log('User validated successfully:', email);
    return user;
}
}
