import {User} from './User';

class AuthService {
  login(email: string, password: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      console.log('email', email);
      console.log('password', password);
      if (email != 'a') {
        reject({message: 'user not found'});
      } else {
        const user: User = {
          email,
          id: '123',
        };
        resolve(user);
      }
    });
  }
}

export default new AuthService();
