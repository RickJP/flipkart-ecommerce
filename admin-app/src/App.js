import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Pos from './containers/Pos';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isUserLoggedIn } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';
import Bilingual from './containers/Tryout/Bilingual';

import { getInitialData } from './actions';
import { getBilingualDocs } from './actions/tryout/tryout.actions';

import { useState } from 'react';
import { bilingualConstants } from './actions/constants';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [gotInitialData, setGotInitialData] = useState(false);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    } else {
      if (!gotInitialData) {
        dispatch(getInitialData());
        dispatch(getBilingualDocs());
        setGotInitialData(true);
      }
    }
  }, [auth.authenticate, dispatch, gotInitialData]);

  return (
    <div className='App'>
      <Switch>
        <PrivateRoute path='/' exact component={Home}></PrivateRoute>
        <PrivateRoute path='/page' exact component={NewPage}></PrivateRoute>
        <PrivateRoute path='/products' component={Products}></PrivateRoute>
        <PrivateRoute path='/orders' component={Orders}></PrivateRoute>
        <PrivateRoute path='/category' component={Category}></PrivateRoute>
        <PrivateRoute path='/bilingual' component={Bilingual}></PrivateRoute>
        <Route path='/signin' component={Signin}></Route>
        <Route path='/signup' component={Signup}></Route>
        <Route path='/pos' component={Pos}></Route>
      </Switch>
    </div>
  );
}

export default App;
