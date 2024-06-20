/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-07 13:31:40
 */
import Cookies from 'js-cookie';

const TOKEN_KEY = 'contract';

const isExpired = () => {
  return !Cookies.get(TOKEN_KEY);
};

const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token);
};

const clearToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export { isExpired, getToken, setToken, clearToken };
