import axios from '../helpers/axios';
// import { productConstants } from './constants';

export const addProduct = (form) => {
  return async (dispatch) => {
    console.log('ADD PRODUCT ACTION');
    const res = await axios.post(`product/create`, form);

    console.log(res);
  };
};
