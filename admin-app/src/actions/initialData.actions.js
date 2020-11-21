import axios from '../helpers/axios';
import {
  bilingualConstants,
  categoryConstants,
  // initialDataConstants,
  productConstants,
} from './constants';

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post(`initialdata`);

    if (res.status === 200) {
      console.log('INITIAL DATA');
      const { categories, products } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
    } else {
      console.log(res);
    }
  };
};
