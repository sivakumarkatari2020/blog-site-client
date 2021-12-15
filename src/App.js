import React from 'react';
import {Switch , Route ,Redirect} from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Feed from './components/Feed';
import Blog from './components/Blog';
import Profile from './components/Profile';
//import useToken from './useToken';

function App() {
  
  //const { token, setToken } = useToken();

  
  //if(!token) {
  //  return (
  //    <Switch>
  //      <Route exact path="/">
  //        <Login setToken={setToken}/>
  //      </Route>
  //    </Switch>
  //  )
  //}
  
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect exact from="/" to="/login" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/home/feed">
          <Feed />
        </Route>
        <Route exact path="/home/blog">
          <Blog />
        </Route>
        <Route exact path="/home/profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  )
}

export default App
