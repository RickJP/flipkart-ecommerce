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
import { getInitialData } from './actions';
import NewPage from './containers/NewPage';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);

  return (
    <div className='App'>
      <Switch>
        <PrivateRoute path='/' exact component={Home}></PrivateRoute>
        <PrivateRoute path='/page' exact component={NewPage}></PrivateRoute>
        <PrivateRoute path='/products' component={Products}></PrivateRoute>
        <PrivateRoute path='/orders' component={Orders}></PrivateRoute>
        <PrivateRoute path='/category' component={Category}></PrivateRoute>
        <Route path='/signin' component={Signin}></Route>
        <Route path='/signup' component={Signup}></Route>
        <Route path='/pos' component={Pos}></Route>
      </Switch>
    </div>
  );
}

export default App;
