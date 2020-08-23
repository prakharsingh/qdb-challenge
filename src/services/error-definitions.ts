export const NETWORK_ERROR = {
  name: 'INVALID_RESPONSE',
  message: 'Network Error',
  data: {
    state: 'transport',
  },
};

export const INVALID_RESPONSE = {
  name: 'INVALID_RESPONSE',
  message: 'Unable to fetch details from server',
  data: {
    state: 'fetch',
  },
};
