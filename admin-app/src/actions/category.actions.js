import axios from '../helpers/axios';
import { categoryConstants } from './constants';

const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get(`/category/get`);
    console.log('GET ALL CATEGORIES');

    if (res.status === 200) {
      const { categoryList } = res.data;

      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
    try {
      const res = await axios.post(`category/create`, form);

      if (res.status === 201) {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (err) {
      console.error(err.response);
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
    const res = await axios.post(`category/update`, form);

    if (res.status === 201) {
      dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
      dispatch(getAllCategories());
      return true;
    } else {
      const error = res.error;
      dispatch({
        type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
        payload: { error },
      });
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    const res = await axios.post(`category/delete`, {
      payload: {
        ids,
      },
    });

    if (res.status === 201) {
      return true;
    } else {
      return false;
    }
  };
};

export { getAllCategories };
