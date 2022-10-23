import {User} from './User';

class AuthService {
  login(email: string, password: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (
        email.toLocaleLowerCase() != 'user@native.com' &&
        password !== '123456'
      ) {
        reject({message: 'user not found'});
      } else {
        const user: User = {
          email,
          password,
        };
        resolve(user);
      }
    });
  }
  logOut(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve('');
    });
  }
}

export default new AuthService();
