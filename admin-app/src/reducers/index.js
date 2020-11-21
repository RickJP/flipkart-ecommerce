import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';
import categoryReducer from './category.reducer';
import pageReducer from './page.reducer';
import tryoutReducer from './tryout/bilingual.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  orderReducer: orderReducer,
  page: pageReducer,
  tryout: tryoutReducer,
});

export default rootReducer;
