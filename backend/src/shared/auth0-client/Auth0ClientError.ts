class Auth0ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Auth0ClientError';
  }

  toJSON() {
    return `{ name: ${this.name}, message: ${this.message} }`;
  }
}

export default Auth0ClientError;
