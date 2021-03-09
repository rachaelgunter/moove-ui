import { createContext } from 'react';
import { AuthOptions, WebAuth } from 'auth0-js';

export interface WebAuthContext {
  options: AuthOptions;
  webAuth: WebAuth;
}

const WebAuthProvider = createContext<WebAuthContext>({} as WebAuthContext);

export default WebAuthProvider;
