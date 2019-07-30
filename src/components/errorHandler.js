export const errorHandler = (error, action) => {
  const { response, message, data } = error;
  if (!!response) {
    return response.data && response.data.message
      ? action(response.data.message)
      : response.data && response.data.error.message
      ? action(response.data.error.message)
      : action('unidentified error');
  } else if (!!message) {
    return action(message);
  } else if (!!data) {
    return action(data);
  } else {
    return action('unidentified error');
  }
};
