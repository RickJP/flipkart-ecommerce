import { cartConstants } from './constants';
import store from '../store';

export const addToCart = (product, _qty = 1) => {
  return async (dispatch) => {
    const { cartItems } = store.getState().cart;

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + _qty)
      : 1;
    cartItems[product._id] = {
      ...product,
      qty,
    };

    localStorage.setItem('cart', JSON.stringify(cartItems));

    dispatch({
      type: cartConstants.ADD_TO_CART,
      payload: {
        cartItems,
      },
    });
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const cartStored = localStorage.getItem('cart');
    const cartItems = cartStored ? JSON.parse(cartStored) : null;

    if (cartItems) {
      dispatch({
        type: cartConstants.ADD_TO_CART,
        payload: { cartItems },
      });
    }
  };
};
