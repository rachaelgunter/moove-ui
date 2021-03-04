import { createContext } from 'react';
import { AuthOptions, WebAuth, Authentication } from 'auth0-js';

export interface WebAuthContext {
  options: AuthOptions;
  webAuth: WebAuth;
  auth: Authentication;
}

const WebAuthProvider = createContext<WebAuthContext>({} as WebAuthContext);

export default WebAuthProvider;
