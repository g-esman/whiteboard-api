import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authService.ValidateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('not allow');
    }
    return user;
  }
}
