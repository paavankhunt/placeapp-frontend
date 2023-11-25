import Cookie from 'js-cookie';

export const getToken = () => {
  return Cookie.get('maptoken') ?? '';
};

export const setToken = (token: string) => {
  Cookie.set('maptoken', token);
};

export const removeToken = () => {
  Cookie.remove('maptoken');
};

export const sleep = (time: any) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
