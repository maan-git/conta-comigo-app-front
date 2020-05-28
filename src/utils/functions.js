/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// eslint-disable-next-line import/no-extraneous-dependencies
import fernet from 'fernet';

/**
 * Generates a GUID string.
 * @returns {string} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser.
 * @link http://slavik.meltser.info/?p=142
 */

const p8 = (s) => {
  const p = (`${Math.random().toString(16)} 000000000`).substr(2, 8);
  return s ? `-${p.substr(0, 4)}-${p.substr(4, 4)}` : p;
};

export const guid = () => p8() + p8(true) + p8(true) + p8();

export const encrypt = (str) => {
  const res = [];
  const num = '_'.charCodeAt(0);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    const mres = [((i - (str.length + 1)) + str.charAt(i).charCodeAt(0)), num];
    res.push(mres.join(''));
  }
  const secret = new fernet.Secret(process.env.VUE_APP_SECRET_KEY_PASS);
  const token = new fernet.Token({ secret });

  return token.encode(res.join(''));
};

export default {
  guid,
  encrypt,
};
