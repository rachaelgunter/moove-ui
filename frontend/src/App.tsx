import { gql, useQuery } from '@apollo/client';
import React from 'react';
import './App.scss';

interface Hello {
  hello: string;
}

const HELLO = gql`
  query hello {
    hello(name: "Unified UI")
  }
`;

const App: React.FC = () => {
  const { data } = useQuery<Hello>(HELLO);
  return <div className="App">{data?.hello}</div>;
};
export default App;
