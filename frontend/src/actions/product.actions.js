import axios from '../helpers/axios';
import { productConstants } from './constants';

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
      // dispatch({ error })
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params;
      dispatch({ type: productConstants.GET_PRODUCTS_PAGE_REQUEST });
      const res = await axios.get(`/page/${cid}/${type}`);

      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCTS_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCTS_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
