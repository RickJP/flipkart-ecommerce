import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import authReducer from './auth.reducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
});

export default rootReducer;
