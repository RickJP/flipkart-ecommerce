import { cartConstants } from '../actions/constants';

const initState = {
  cartItems: {},
  updatingCart: false,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
      };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        updatingCart: false,
      };
      break;
    case cartConstants.RESET_CART:
      state = {
        ...initState,
      };
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
