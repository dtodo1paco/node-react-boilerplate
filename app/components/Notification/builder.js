import { fromJS } from 'immutable';

export const buildNotification = data => {
  const isError = data instanceof Error;
  // eslint-disable-next-line
  console.log("Building notification for [Error: "+isError+"] data: " + JSON.stringify(data));
  if (isError) {
    return fromJS({
      id: '500',
      type: 'error',
      text: data.message,
      data: data.stack,
    });
  }
  return fromJS({
    id: data.id,
    // eslint-disable-next-line
    type: data.type ? data.type : data.id > 399 ? 'error' : 'success',
    text: data.text,
    data: data.data,
  });
};
