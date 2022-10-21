import {LoadingState} from './loadingState';
import {LoginState} from './LoginState';

export interface AppState {
  loading: LoadingState;
  login: LoginState;
}
