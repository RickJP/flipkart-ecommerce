import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Pos from './containers/Pos';
import PrivateRoute from './components/HOC/PrivateRoute';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <PrivateRoute path='/' exact component={Home}></PrivateRoute>
          <Route path='/signin' component={Signin}></Route>
          <Route path='/signup' component={Signup}></Route>
          <Route path='/pos' component={Pos}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
