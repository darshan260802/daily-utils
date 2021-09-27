import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import Notes from './components/Notes';
import Urlshortener from './components/Urlshortener';
import Todo from './components/Todo';
import Login from './components/Login'
import About from './components/About';


function isLoggedin() {
  let isLogin = localStorage.getItem('user');
  if (isLogin) {
    return true;
  }
  return false
}

function getName()
{
  let n = localStorage.getItem('user')
  if(n)
  {
    let ne = JSON.parse(n);
    return ne.name;
  }
  return "";
}

const App = () => {

  let location = useLocation();
  let history = useHistory();

  let [isLogin, setIsLogin] = useState(isLoggedin());


  useEffect(() => {
    if(location.pathname === '/')
    {
      if(isLogin)
      {
        history.push('/notes')
      }
      else
      {
        history.push('/login')
      }
    }
  })

  return(
    <div className="w-screen h-screen flex flex-col overflow-y-auto overflow-x-hidden">

     <NavigationBar/>

     <Switch>
       <Route exact path="/notes" component={Notes} />
       <Route exact path="/todo" component={Todo} />
       <Route exact path="/urlshortener" component={Urlshortener} />
       <Route exact path="/login" component={Login} />
     </Switch>

    </div>
  );
}

export default App;
