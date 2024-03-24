import { PassportStrategy } from "@nestjs/passport";
import CONFIG from "config/config";
import { ExtractJwt, Strategy } from "passport-jwt";

export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: CONFIG.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, email: payload.email};
  }
}