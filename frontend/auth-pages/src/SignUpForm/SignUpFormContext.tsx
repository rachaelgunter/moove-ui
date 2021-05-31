import React, { createContext, Dispatch, FC, useReducer } from 'react';

interface SignUpFormContextState {
  email: string;
  fullName: string;
  password: string;
  repeatedPassword: string;
  businessVertical: string;
  jobFunction: string;
  termsAccepted: boolean;
}

interface SignUpProvider {
  state: SignUpFormContextState;
  dispatch: Dispatch<Partial<SignUpFormContextState>>;
}

interface SignUpStateProviderProps {
  children: React.ReactNode;
}

const initialState = {
  state: {
    email: '',
    fullName: '',
    password: '',
    repeatedPassword: '',
    businessVertical: '',
    jobFunction: '',
    termsAccepted: false,
  },
  dispatch: () => {},
};

export const SignUpFormContext = createContext<SignUpProvider>(initialState);

const SignUpStateProvider: FC<SignUpStateProviderProps> = ({
  children,
}: SignUpStateProviderProps) => {
  const [state, dispatch] = useReducer<
    (
      state: SignUpProvider,
      action: Partial<SignUpFormContextState>,
    ) => SignUpProvider
  >(
    (currentState, action): SignUpProvider => ({
      state: { ...currentState.state, ...action },
      dispatch,
    }),
    initialState,
  );

  return (
    <SignUpFormContext.Provider value={{ state: state.state, dispatch }}>
      {children}
    </SignUpFormContext.Provider>
  );
};

export default SignUpStateProvider;
