import React, { useState } from 'react';
import Main from './compo/Main'
import Password from './pages/Password';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <div>
      {isLoggedIn ? <Main/> : <Password onLogin={handleLogin} />}
    </div>
  )
}

export default App

