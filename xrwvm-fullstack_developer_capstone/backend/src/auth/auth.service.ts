import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async register(dto: { username: string; password: string }) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hash });
    await this.repo.save(user);
    return { username: user.username };
  }
}
