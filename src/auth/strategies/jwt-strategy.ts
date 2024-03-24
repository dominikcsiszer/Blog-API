import { PassportStrategy } from "@nestjs/passport";
import CONFIG from "config/config";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONFIG.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, email: payload.email};
  }
}