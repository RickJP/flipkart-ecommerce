import { productConstants } from '../actions/constants';

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
