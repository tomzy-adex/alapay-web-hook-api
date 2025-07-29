import { config } from '../config';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CacheService } from '../cache/cache.service';
import { UserRoles } from './types';

export type AuthData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRoles.HMO_ADMIN;
  hmoId?: string;
  sessId: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly cache: CacheService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: any, payload: any) {
    if (payload.type !== UserRoles.HMO_ADMIN) {
      throw new ForbiddenException();
    }

    const blacklisted = await this.cache.isBlacklisted(request.token);

    if (blacklisted) throw new UnauthorizedException('Session expired.');

    const authData = await this.cache.get<AuthData>(
      `${UserRoles.HMO_ADMIN}::${payload.sub}`,
    );

    if (authData) {
      request.authData = authData;
      return authData;
    }

    throw new UnauthorizedException('Invalid token');
  }
}
