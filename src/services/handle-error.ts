import { NETWORK_ERROR } from './error-definitions';

export default (error?: Error) => {
  if (error) throw error;
  throw NETWORK_ERROR;
};
