import { Injectable } from '@nestjs/common';
import { Firebase } from '../common/services/firebase.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  async createUser(authData: CreateUserDTO): Promise<IRESTResponse> {
    const firebase = new Firebase();
    const userUid = await firebase.registerUser(authData);
    return {
      data: userUid,
    };
  }
  async login(authData: LoginDTO): Promise<IRESTResponse> {
    const firebase = new Firebase();
    const userData = await firebase.login(authData);
    return {
      data: userData,
    };
  }
}
