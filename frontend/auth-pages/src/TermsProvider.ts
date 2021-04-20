import { createContext } from 'react';

export interface TermsContext {
  termsAccepted: boolean;
  handleTermsAcceptance: (value: boolean) => void;
}

const TermsProvider = createContext<TermsContext>({
  termsAccepted: false,
  handleTermsAcceptance: () => {},
});

export default TermsProvider;
