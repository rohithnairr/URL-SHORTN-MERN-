import React, {useState} from "react";
import "./App.css";

import Shortner from './pages/shortner';
import Login from './pages/login';

export default () => {

  const [user, setUser] = useState(null);

  return user ? <Shortner user={user} /> : <Login onLogin={setUser} />

}
