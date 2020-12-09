import { userConstants } from './constants';
import axios from '../helpers/axios';

export const getAddress = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/user/address');
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (payload) => {
  console.dir('PAYLOAD ################### ' + JSON.stringify(payload.address));
  return async (dispatch) => {
    try {
      const res = await axios.post('/user/address', { payload });
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
      if (res.status === 201) {
        const { address } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
